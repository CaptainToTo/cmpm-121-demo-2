import { Cursor } from "./cursor.ts";

export class Canvas {
  app: HTMLElement;
  canvasElem: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  cursor: Cursor;
  buttons: Record<string, HTMLButtonElement>;

  lines: { x: number; y: number }[][];
  curLine: number;

  constructor(width: number, height: number) {
    this.app = document.querySelector("#app")!;

    this.canvasElem = document.createElement("canvas");
    this.canvasElem.width = width;
    this.canvasElem.height = height;
    this.context = this.canvasElem.getContext("2d");

    this.context!.fillStyle = "white";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.context?.fillRect(0, 0, width, height);
    this.context!.fillStyle = "black";

    this.app.append(this.canvasElem);
    this.canvasElem.style.borderRadius = "5px";
    this.canvasElem.style.border = "3px solid";

    this.lines = [];
    this.curLine = -1;

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.cursor = new Cursor(0, 0);
    this.canvasElem.addEventListener("mousedown", (e) => {
      this.cursor.setActive();
      this.curLine++;
      if (this.curLine >= this.lines.length) {
        this.lines.push([]);
      } else {
        this.lines[this.curLine] = [];
        this.lines.splice(
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          this.curLine + 1,
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          this.lines.length - (this.curLine + 1),
        );
      }
      this.cursor.setPos(e.offsetX, e.offsetY);
      this.lines[this.curLine].push({ x: this.cursor.x, y: this.cursor.y });
    });
    this.canvasElem.addEventListener("mousemove", (e) => {
      if (this.cursor.isActive()) {
        this.cursor.setPos(e.offsetX, e.offsetY);
        this.lines[this.curLine].push({ x: this.cursor.x, y: this.cursor.y });
        this.draw();
      }
    });
    this.canvasElem.addEventListener("mouseup", () => {
      this.cursor.setInactive();
      this.draw();
    });

    this.width = width;
    this.height = height;
    this.buttons = {};

    this.app.append(document.createElement("br"));
  }

  getCurLine(): number {
    return this.curLine;
  }

  hasNoActiveLines(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return this.curLine === -1;
  }

  isAtMostRecentChange(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return this.curLine + 1 === this.lines.length;
  }

  getLineCount(): number {
    return this.lines.length;
  }

  setCurLine(i: number) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (i < -1 || i > this.lines.length) return;

    this.curLine = i;
  }

  draw() {
    this.clear();

    for (let i = 0; i <= this.curLine; i++) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      if (this.lines[i].length < 1) continue;
      this.context?.beginPath();
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      this.context?.moveTo(this.lines[i][0].x, this.lines[i][0].y);
      this.lines[i].forEach((point) => {
        this.context?.lineTo(point.x, point.y);
      });
      this.context?.stroke();
    }
  }

  clear() {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.context?.clearRect(0, 0, this.width, this.height);
    this.context!.fillStyle = "white";
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    this.context?.fillRect(0, 0, this.width, this.height);
    this.context!.fillStyle = "black";
  }

  reset() {
    this.clear();
    this.lines = [];
    this.curLine = -1;
  }

  addButton(name: string, pressAction: () => void) {
    this.buttons[name] = document.createElement("button");
    this.buttons[name].innerHTML = name;
    this.buttons[name].addEventListener("click", pressAction);
    this.app.append(this.buttons[name]);
  }
}
