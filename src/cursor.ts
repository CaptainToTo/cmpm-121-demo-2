export class Cursor {
  active: boolean;
  x: number;
  y: number;
  width: number;
  color: string;

  constructor(x: number, y: number) {
    this.active = false;
    this.x = x;
    this.y = y;
    this.width = 1;
    this.color = "black";
  }

  display(context: CanvasRenderingContext2D) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const fontSize = this.width * 5 + 10;
    context.font = `${fontSize}px monospace`;
    context.fillStyle = this.color;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    context.fillText("*", this.x - fontSize * 0.25, this.y + fontSize * 0.5);
  }

  setActive() {
    this.active = true;
  }

  setInactive() {
    this.active = false;
  }

  isActive(): boolean {
    return this.active;
  }

  setPos(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getPos(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  setWidth(width: number) {
    this.width = width;
  }

  getWidth(): number {
    return this.width;
  }

  setColor(color: string) {
    this.color = color;
  }

  getColor(): string {
    return this.color;
  }
}
