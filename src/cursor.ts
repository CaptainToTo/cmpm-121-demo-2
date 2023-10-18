export class Cursor {
  active: boolean;
  x: number;
  y: number;
  width: number;
  color: string;
  mode: "draw" | "sticker";
  sticker: string;

  constructor(x: number, y: number) {
    this.active = false;
    this.x = x;
    this.y = y;
    this.width = 1;
    this.color = "black";
    this.mode = "draw";
    this.sticker = "*";
  }

  toggleMode() {
    if (this.mode === "draw") {
      this.mode = "sticker";
    } else {
      this.mode = "draw";
    }
  }

  isDrawMode(): boolean {
    return this.mode === "draw";
  }

  isStickerMode(): boolean {
    return this.mode === "sticker";
  }

  setSticker(sticker: string) {
    this.sticker = sticker;
  }

  getSticker(): string {
    return this.sticker;
  }

  display(context: CanvasRenderingContext2D) {
    const minStickerSize = 20;
    const sizeScale = 5;
    const fontSize = this.width * sizeScale + minStickerSize;
    context.font = `${fontSize}px monospace`;
    context.fillStyle = this.color;
    const fontXOffset = 0.25;
    const fontYOffset = 0.5;
    context.fillText(
      this.isStickerMode() ? this.sticker : "*",
      this.x - fontSize * fontXOffset,
      this.y + fontSize * fontYOffset,
    );
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
