import { Action } from "./action.ts";
import { Canvas } from "./canvas.ts";

export class Sticker extends Action {
  value: string;
  size: number;
  x: number;
  y: number;

  constructor(canvas: Canvas, value: string, size: number) {
    super(canvas);
    this.value = value;
    this.size = size;
    this.x = 0;
    this.y = 0;
  }

  setPos(pos: { x: number; y: number }) {
    this.x = pos.x;
    this.y = pos.y;
  }

  override display(context: CanvasRenderingContext2D) {
    const minStickerSize = 20;
    const sizeScale = 5;
    const fontSize = this.size * sizeScale + minStickerSize;
    context.font = `${fontSize}px monospace`;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    context.fillText(
      this.value,
      this.x - fontSize * 0.25,
      this.y + fontSize * 0.5,
    );
  }
}
