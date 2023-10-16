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

canvas.addButton("undo", () => {
  if (canvas.hasNoActiveLines()) return;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  canvas.setCurLine(canvas.getCurLine() - 1);
  canvas.draw();
});

canvas.addButton("redo", () => {
  if (canvas.isAtMostRecentChange()) return;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  canvas.setCurLine(canvas.getCurLine() + 1);
  canvas.draw();
});

canvas.addButton("reset", () => {
  canvas.reset();
});

canvas.addBreak();

canvas.addButton("⬛", () => {
  canvas.cursor.setColor("black");
});

canvas.addButton("🟥", () => {
  canvas.cursor.setColor("red");
});

canvas.addButton("🟪", () => {
  canvas.cursor.setColor("purple");
});

canvas.addButton("🟦", () => {
  canvas.cursor.setColor("blue");
});

canvas.addButton("🟨", () => {
  canvas.cursor.setColor("yellow");
});

canvas.addButton("🟩", () => {
  canvas.cursor.setColor("green");
});
