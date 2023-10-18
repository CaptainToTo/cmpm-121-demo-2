import { Canvas } from "./canvas.ts";

export abstract class Action {
  canvas: Canvas;
  constructor(canvas: Canvas) {
    this.canvas = canvas;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  display(_context: CanvasRenderingContext2D) {
    console.error("Action display method not implemented");
  }
}
