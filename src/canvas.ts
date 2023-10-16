export class Canvas {
  app: HTMLElement;
  canvasElem: HTMLCanvasElement;
  width: number;
  height: number;

  buttons: Record<string, HTMLButtonElement>;

  constructor(width: number, height: number) {
    this.app = document.querySelector("#app")!;
    this.canvasElem = document.createElement("canvas");
    this.canvasElem.width = width;
    this.canvasElem.height = height;
    this.app.append(this.canvasElem);
    this.canvasElem.style.borderRadius = "5px";
    this.canvasElem.style.border = "3px solid";

    this.width = width;
    this.height = height;
    this.buttons = {};
  }

  // addButton(name: string, pressAction: () => any) {

  // }
}
