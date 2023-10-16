export class Cursor {
  active: boolean;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.active = false;
    this.x = x;
    this.y = y;
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
}
