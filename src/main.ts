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

canvas.addButton("clear", () => {
  canvas.clear();
});
