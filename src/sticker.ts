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
    context.fillStyle = "black";
    const fontXOffset = 0.25;
    const fontYOffset = 0.5;
    context.fillText(
      this.value,
      this.x - fontSize * fontXOffset,
      this.y + fontSize * fontYOffset,
    );
  }
}
