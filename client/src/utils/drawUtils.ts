import type { DrawData } from "../types/types";

export const BG_COLOR = "#ffffff";

export function drawLine(
  ctx: CanvasRenderingContext2D,
  { x0, y0, x1, y1, color, size, mode }: DrawData
) {
  ctx.save();
  
  if (mode === "eraser" || color === BG_COLOR) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
    ctx.lineWidth = size;
  } else if (mode === "highlighter") {
    ctx.globalCompositeOperation = "multiply"; // Or source-over with alpha
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 1.5; // Highlighter is naturally wider
  } else if (mode === "brush") {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.shadowBlur = size / 2;
    ctx.shadowColor = color;
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
  }
  
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}