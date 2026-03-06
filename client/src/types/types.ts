export interface CanvasProps {
  roomId: string;
}

export type Tool = "pen" | "eraser" | "brush" | "highlighter";

export interface DrawData {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  color: string;
  size: number;
  mode: Tool;
}
