import "./style.css";
import { Canvas } from "./canvas.ts";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Draw Pad";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const canvasWidth = 500;
const canvasHeight = 500;
const canvas = new Canvas(canvasWidth, canvasHeight);

const thinWidth = 1;
const thickWidth = 3;
const extraThickWidth = 6;

canvas.addButton("thin", () => {
  canvas.cursor.setWidth(thinWidth);
});

canvas.addButton("thick", () => {
  canvas.cursor.setWidth(thickWidth);
});

canvas.addButton("extra thick", () => {
  canvas.cursor.setWidth(extraThickWidth);
});

canvas.addButton("toggle sticker", () => {
  canvas.cursor.toggleMode();
});

canvas.addBreak();

canvas.addButton("⬛", () => {
  canvas.cursor.setColor("black");
  if (canvas.cursor.isStickerMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("🟥", () => {
  canvas.cursor.setColor("red");
  if (canvas.cursor.isStickerMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("🟪", () => {
  canvas.cursor.setColor("purple");
  if (canvas.cursor.isStickerMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("🟦", () => {
  canvas.cursor.setColor("blue");
  if (canvas.cursor.isStickerMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("🟨", () => {
  canvas.cursor.setColor("yellow");
  if (canvas.cursor.isStickerMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("🟩", () => {
  canvas.cursor.setColor("green");
  if (canvas.cursor.isStickerMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addBreak();

canvas.addButton("😀", () => {
  canvas.cursor.setSticker("😀");
  if (canvas.cursor.isDrawMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("😅", () => {
  canvas.cursor.setSticker("😅");
  if (canvas.cursor.isDrawMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("😭", () => {
  canvas.cursor.setSticker("😭");
  if (canvas.cursor.isDrawMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("😇", () => {
  canvas.cursor.setSticker("😇");
  if (canvas.cursor.isDrawMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("😱", () => {
  canvas.cursor.setSticker("😱");
  if (canvas.cursor.isDrawMode()) {
    canvas.cursor.toggleMode();
  }
});

canvas.addButton("Custom Sticker", () => {
  const newStickerText: string = prompt("Custom Sticker:", "OMG!")!;
  canvas.insertButton(newStickerText, "Custom Sticker", () => {
    canvas.cursor.setSticker(newStickerText);
    if (canvas.cursor.isDrawMode()) {
      canvas.cursor.toggleMode();
    }
  });
});

canvas.addBreak();

canvas.addButton("undo", () => {
  if (canvas.hasNoActiveActions()) return;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  canvas.setCurLine(canvas.getCurAction() - 1);
  canvas.draw();
});

canvas.addButton("redo", () => {
  if (canvas.isAtMostRecentChange()) return;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  canvas.setCurLine(canvas.getCurAction() + 1);
  canvas.draw();
});

canvas.addButton("reset", () => {
  canvas.reset();
});
