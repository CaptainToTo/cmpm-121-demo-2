import { Action } from "./action.ts";
import { Canvas } from "./canvas.ts";

export class Line extends Action {
  points: { x: number; y: number }[];
  width: number;
  color: string;

  constructor(canvas: Canvas, width: number, color: string) {
    super(canvas);
    this.points = [];
    this.width = width;
    this.color = color;
  }

  addPoint(point: { x: number; y: number }) {
    this.points.push(point);
  }

  override display(context: CanvasRenderingContext2D) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (this.points.length < 1) return;
    context.strokeStyle = this.color;
    context.lineWidth = this.width;
    context.beginPath();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    context.moveTo(this.points[0].x, this.points[0].y);
    this.points.forEach((point) => {
      context.lineTo(point.x, point.y);
    });
    context.stroke();
  }
}
