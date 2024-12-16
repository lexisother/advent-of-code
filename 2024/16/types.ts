export interface Point {
  x: number;
  y: number;
}

export enum Direction {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM,
}

export interface Node {
  pos: Point;
  direction: Direction;
  cost: number;
  path: Set<string>;
}
