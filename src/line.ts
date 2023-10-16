export class Line {
  points: { x: number; y: number }[];
  width: number;
  color: string;

  constructor(width: number, color: string) {
    this.points = [];
    this.width = width;
    this.color = color;
  }

  addPoint(point: { x: number; y: number }) {
    this.points.push(point);
  }

  display(context: CanvasRenderingContext2D) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (this.points.length < 1) return;
    context.fillStyle = this.color;
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
