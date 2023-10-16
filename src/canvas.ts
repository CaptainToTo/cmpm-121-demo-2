import { Cursor } from "./cursor.ts";

export class Canvas {
  app: HTMLElement;
  canvasElem: HTMLCanvasElement;
  context: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  cursor: Cursor;
  buttons: Record<string, HTMLButtonElement>;

  constructor(width: number, height: number) {
    this.app = document.querySelector("#app")!;

    this.canvasElem = document.createElement("canvas");
    this.canvasElem.width = width;
    this.canvasElem.height = height;
    this.context = this.canvasElem.getContext("2d");

    const start = 0;

    this.context!.fillStyle = "white";
    this.context?.fillRect(start, start, width, height);
    this.context!.fillStyle = "black";

    this.app.append(this.canvasElem);
    this.canvasElem.style.borderRadius = "5px";
    this.canvasElem.style.border = "3px solid";

    this.cursor = new Cursor(start, start);
    this.canvasElem.addEventListener("mousedown", (e) => {
      this.cursor.setActive();
      this.cursor.setPos(e.offsetX, e.offsetY);
    });
    this.canvasElem.addEventListener("mousemove", (e) => {
      if (this.cursor.isActive()) {
        this.context?.beginPath();
        this.context?.moveTo(this.cursor.x, this.cursor.y);
        this.context?.lineTo(e.offsetX, e.offsetY);
        this.context?.stroke();
        this.cursor.setPos(e.offsetX, e.offsetY);
      }
    });
    this.canvasElem.addEventListener("mouseup", () => {
      this.cursor.setInactive();
    });

    this.width = width;
    this.height = height;
    this.buttons = {};

    this.app.append(document.createElement("br"));
  }

  clear() {
    const start = 0;
    this.context?.clearRect(start, start, this.width, this.height);
    this.context!.fillStyle = "white";
    this.context?.fillRect(start, start, this.width, this.height);
    this.context!.fillStyle = "black";
  }

  addButton(name: string, pressAction: () => void) {
    this.buttons[name] = document.createElement("button");
    this.buttons[name].innerHTML = name;
    this.buttons[name].addEventListener("click", pressAction);
    this.app.append(this.buttons[name]);
  }
}
