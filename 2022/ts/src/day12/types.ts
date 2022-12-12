export interface Point {
  x: number;
  y: number;
}

export interface Node {
  point: Point;
  parent?: Point;
  steps: number;
  score: number;
  from: string;
}

export type Grid = number[][];

export interface Input {
  grid: Grid;
  start: Point;
  end: Point;
}
