import { getNeighbours } from './lib.js';
import { Input, Node } from './types.js';

export function doP1({ grid, start, end }: Input): number {
  const queue = new Array<Node>();
  const visited = new Map<string, Node>();
  queue.push({
    point: start,
    steps: 0,
    score: 1,
    from: 'S',
  });
  while (queue.length) {
    const { point, parent, steps, score, from } = queue.shift()!;
    const neighbors = getNeighbours(point, grid);
    visited.set(`${point.x}/${point.y}`, {
      point,
      steps,
      parent,
      score,
      from,
    });
    if (point.x === end.x && point.y === end.y) {
      break;
    }
    for (const { x, y, from } of neighbors) {
      if (
        !visited.has(`${x}/${y}`) &&
        !queue.some((other) => other.point.x === x && other.point.y === y)
      ) {
        queue.push({
          point: { x, y },
          steps: steps + 1,
          parent: point,
          score: score + 1,
          from,
        });
      }
    }
  }
  let last = visited.get(`${end.x}/${end.y}`)!;
  const path = new Array<string>();
  while (last?.parent) {
    last = visited.get(`${last.parent.x}/${last.parent.y}`)!;
    path.unshift(`${last.point.x}/${last.point.y}`);
  }
  return path.length;
}
