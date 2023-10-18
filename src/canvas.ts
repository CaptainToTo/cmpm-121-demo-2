import { Cursor } from "./cursor.ts";
import { Action } from "./action.ts";
import { Line } from "./line.ts";
import { Sticker } from "./sticker.ts";

export class Canvas {
  app: HTMLElement;
  canvasElem: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  cursor: Cursor;
  buttons: Record<string, HTMLButtonElement>;

  actions: Action[];
  curAction: number;
  lines: Line[];

  constructor(width: number, height: number) {
    this.app = document.querySelector("#app")!;

    this.canvasElem = document.createElement("canvas");
    this.canvasElem.width = width;
    this.canvasElem.height = height;
    this.context = this.canvasElem.getContext("2d")!;

    this.context.fillStyle = "white";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.context?.fillRect(0, 0, width, height);

    this.app.append(this.canvasElem);
    this.canvasElem.style.borderRadius = "5px";
    this.canvasElem.style.border = "3px solid";

    this.actions = [];
    this.lines = [];
    this.curAction = -1;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.cursor = new Cursor(0, 0);

    this.canvasElem.addEventListener("mousedown", (e) => {
      this.cursor.setActive();
      this.cursor.setPos(e.offsetX, e.offsetY);
      this.addNewAction();
      this.publishEvent("drawing-changed");
    });

    this.canvasElem.addEventListener("mousemove", (e) => {
      this.cursor.setPos(e.offsetX, e.offsetY);
      if (this.cursor.isActive()) {
        this.addPoint(this.cursor.getPos());
      }
      this.publishEvent("drawing-changed");
    });

    this.canvasElem.addEventListener("mouseup", () => {
      this.cursor.setInactive();
      this.publishEvent("drawing-changed");
    });

    this.canvasElem.addEventListener("drawing-changed", () => {
      this.draw();
    });

    this.canvasElem.style.cursor = "none";

    this.width = width;
    this.height = height;
    this.buttons = {};

    this.addBreak();
  }

  addNewAction() {
    if (this.cursor.isDrawMode()) {
      this.addLine();
    } else {
      this.addSticker();
    }
  }

  addSticker() {
    this.curAction++;

    const newSticker = new Sticker(
      this,
      this.cursor.getSticker(),
      this.cursor.getWidth(),
    );
    newSticker.setPos(this.cursor.getPos());

    if (this.curAction < this.actions.length) {
      this.actions.splice(this.curAction, this.actions.length - this.curAction);
    }

    this.actions.push(newSticker);

    this.cursor.setInactive();
  }

  addLine() {
    this.curAction++;

    const newLine = new Line(
      this,
      this.cursor.getWidth(),
      this.cursor.getColor(),
    );

    if (this.curAction < this.actions.length) {
      this.actions.splice(this.curAction, this.actions.length - this.curAction);
    }

    this.actions.push(newLine);
    this.addPoint(this.cursor.getPos());
  }

  publishEvent(eventName: string) {
    this.canvasElem.dispatchEvent(new Event(eventName));
  }

  addPoint(point: { x: number; y: number }) {
    const curLine: Line = this.actions[this.curAction] as Line;
    curLine.addPoint(point);
  }

  getCurAction(): number {
    return this.curAction;
  }

  hasNoActiveActions(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return this.curAction === -1;
  }

  isAtMostRecentChange(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return this.curAction + 1 === this.actions.length;
  }

  getActionCount(): number {
    return this.actions.length;
  }

  setCurLine(i: number) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (i < -1 || i > this.actions.length) return;

    this.curAction = i;
  }

  draw() {
    this.clear();
    for (let i = 0; i <= this.curAction; i++) {
      this.actions[i].display(this.context);
    }
    this.cursor.display(this.context);
  }

  clear() {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.context?.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = "white";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.context?.fillRect(0, 0, this.width, this.height);
  }

  reset() {
    this.clear();
    this.lines = [];
    this.curAction = -1;
  }

  createButton(name: string, pressAction: () => void) {
    this.buttons[name] = document.createElement("button");
    this.buttons[name].innerHTML = name;
    this.buttons[name].addEventListener("click", pressAction);
  }

  addButton(name: string, pressAction: () => void) {
    this.createButton(name, pressAction);
    this.app.append(this.buttons[name]);
  }

  insertButton(name: string, insertAt: string, pressAction: () => void) {
    this.createButton(name, pressAction);
    this.app.insertBefore(this.buttons[name], this.buttons[insertAt]);
  }

  addBreak() {
    this.app.append(document.createElement("br"));
  }

  drawForDownload() {
    this.clear();
    for (let i = 0; i <= this.curAction; i++) {
      this.actions[i].display(this.context);
    }
  }

  download(scaleX: number, scaleY: number) {
    this.drawForDownload();
    const tempCanvas: HTMLCanvasElement = document.createElement("canvas");
    tempCanvas.width = this.width * scaleX;
    tempCanvas.height = this.height * scaleY;
    const tempContext: CanvasRenderingContext2D = tempCanvas.getContext("2d")!;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    tempContext.drawImage(this.canvasElem, 0, 0);
    tempContext.scale(scaleX, scaleY);
    const anchor = document.createElement("a");
    anchor.href = tempCanvas.toDataURL("image/png");
    anchor.download = "sketchpad.png";
    anchor.click();
  }
}
