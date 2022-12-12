import { Grid, Point } from './types.js';

type Neighbour = Point & { from: string };

export function getNeighbours({ x, y }: Point, grid: Grid): Neighbour[] {
  const currentCell = grid[y][x];
  const neighbours = new Array<Neighbour>();
  if (y > 0) {
    const cell = grid[y - 1][x];
    if (cell != null && (cell - currentCell === 1 || cell - currentCell <= 0)) {
      neighbours.push({ x, y: y - 1, from: '^' });
    }
  }
  if (x > 0) {
    const cell = grid[y][x - 1];
    if (cell != null && (cell - currentCell === 1 || cell - currentCell <= 0)) {
      neighbours.push({ x: x - 1, y, from: '<' });
    }
  }
  if (y < grid.length - 1) {
    const cell = grid[y + 1][x];
    if (cell != null && (cell - currentCell === 1 || cell - currentCell <= 0)) {
      neighbours.push({ x, y: y + 1, from: 'V' });
    }
  }
  if (x < grid[0].length - 1) {
    const cell = grid[y][x + 1];
    if (cell != null && (cell - currentCell === 1 || cell - currentCell <= 0)) {
      neighbours.push({ x: x + 1, y, from: '>' });
    }
  }
  return neighbours;
}
