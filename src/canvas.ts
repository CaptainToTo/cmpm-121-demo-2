import { Cursor } from "./cursor.ts";
import { Action } from "./action.ts";
import { Line } from "./line.ts";

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
      this.addLine();
      this.cursor.setPos(e.offsetX, e.offsetY);
      this.addPoint(this.cursor.getPos());
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

  addLine() {
    this.curAction++;
    if (this.curAction >= this.actions.length) {
      const newLine = new Line(
        this,
        this.cursor.getWidth(),
        this.cursor.getColor(),
      );
      this.lines.push(newLine);
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      this.actions.push(newLine);
    } else {
      this.lines[this.curAction] = new Line(
        this,
        this.cursor.getWidth(),
        this.cursor.getColor(),
      );
      this.lines.splice(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        this.curAction + 1,
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        this.lines.length - (this.curAction + 1),
      );
    }
  }

  publishEvent(eventName: string) {
    this.canvasElem.dispatchEvent(new Event(eventName));
  }

  addPoint(point: { x: number; y: number }) {
    this.lines[this.curAction].addPoint(point);
  }

  getCurLine(): number {
    return this.curAction;
  }

  hasNoActiveLines(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return this.curAction === -1;
  }

  isAtMostRecentChange(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return this.curAction + 1 === this.lines.length;
  }

  getLineCount(): number {
    return this.lines.length;
  }

  setCurLine(i: number) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (i < -1 || i > this.lines.length) return;

    this.curAction = i;
  }

  draw() {
    this.clear();
    this.cursor.display(this.context);
    for (let i = 0; i <= this.curAction; i++) {
      this.lines[i].display(this.context);
    }
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

  addButton(name: string, pressAction: () => void) {
    this.buttons[name] = document.createElement("button");
    this.buttons[name].innerHTML = name;
    this.buttons[name].addEventListener("click", pressAction);
    this.app.append(this.buttons[name]);
  }

  addBreak() {
    this.app.append(document.createElement("br"));
  }
}
