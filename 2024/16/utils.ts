import { DIRECTION_POINT, FORWARD_COST, TURN_COST, WALL_NODE } from "./constants";
import { Direction, Node, Point } from "./types";

// who needs classes

function pointToString(p: Point): string {
  return `${p.x},${p.y}`;
}

function isAWall(pos: Point, grid: string[][]) {
  return !grid[pos.y]?.[pos.x] || grid[pos.y]?.[pos.x] === WALL_NODE;
}

export function nodeToString({ pos, direction }: Node): string {
  return `${pointToString(pos)}|${Direction[direction]}`;
}

function translatePoint(orig: Point, translation: Point): Point {
  return {
    x: orig.x + translation.x,
    y: orig.y + translation.y,
  };
}

export function movePoint(orig: Point, dest: Point): void {
  orig.x = dest.x;
  orig.y = dest.y;
}

function invertPoint(p: Point): Point {
  return {
    x: -p.x,
    y: -p.y,
  };
}

export function isPointSameAs(orig: Point, other: Point) {
  return orig.x === other.x && orig.y === other.y;
}

export function getPossibleNodesToMove(
  { pos, direction, cost, path }: Node,
  input: string[][],
  p2: boolean = false,
): Node[] {
  const possibleNodes: Node[] = [];
  const possibleDirections = Object.keys(Direction).filter((dir) => isNaN(+dir));
  for (const possibleDirection of possibleDirections) {
    const translation = DIRECTION_POINT[Direction[possibleDirection as keyof typeof Direction]];
    const nodePos = translatePoint(pos, translation);
    if (
      isAWall(nodePos, input) ||
      isPointSameAs(translation, invertPoint(DIRECTION_POINT[direction]))
    )
      continue;
    possibleNodes.push({
      pos: nodePos,
      direction: Direction[possibleDirection as keyof typeof Direction],
      cost:
        (Direction[possibleDirection as keyof typeof Direction] === direction
          ? FORWARD_COST
          : TURN_COST + FORWARD_COST) + cost,
      ...(p2
        ? {
            path: new Set<string>([...path, pointToString(pos)]),
          }
        : {
            path: new Set<string>(),
          }),
    });
  }
  return possibleNodes;
}
