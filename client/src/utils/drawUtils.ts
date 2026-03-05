import type { DrawData, Tool } from "../types/types";

export const BG_COLOR = "#ffffff";

export function drawLine(
  ctx: CanvasRenderingContext2D,
  { x0, y0, x1, y1, color, size, mode }: DrawData
) {
  ctx.save();
  ctx.globalCompositeOperation = mode === "eraser" ? "destination-out" : "source-over";
  ctx.strokeStyle = mode === "eraser" ? "rgba(0,0,0,1)" : color;
  ctx.lineWidth = size;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}