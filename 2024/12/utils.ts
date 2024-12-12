export interface Point {
  x: number;
  y: number;
}

// export interface Grid<T = string> {
//   data: T[][];
//   width: number;
//   height: number;
// }

interface Region {
  char: string;
  points: Set<string>;
}

function pointToString(p: Point): string {
  return `${p.x},${p.y}`;
}

function stringToPoint(s: string): Point {
  const [x, y] = s.split(",").map(Number);
  return { x, y };
}

export function findRegions(input: string[][]): Region[] {
  const visited = new Set<string>();
  const regions: Region[] = [];

  function flood(start: Point, char: string): Set<string> {
    const points = new Set<string>();
    const queue: Point[] = [start];

    while (queue.length > 0) {
      const p = queue.shift()!;
      const key = pointToString(p);

      if (visited.has(key)) continue;
      if (p.y < 0 || p.y >= input.length || p.x < 0 || p.x >= input[0].length) continue;
      if (input[p.y][p.x] !== char) continue;

      visited.add(key);
      points.add(key);

      queue.push(
        { x: p.x + 1, y: p.y },
        { x: p.x - 1, y: p.y },
        { x: p.x, y: p.y + 1 },
        { x: p.x, y: p.y - 1 },
      );
    }

    return points;
  }

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      const point = { x, y };
      const key = pointToString(point);

      if (!visited.has(key)) {
        const char = input[y][x];
        const points = flood(point, char);
        if (points.size > 0) {
          regions.push({ char, points });
        }
      }
    }
  }

  return regions;
}

export function calculatePerimeter(region: Region): number {
  let perimeter = 0;
  const points = Array.from(region.points).map(stringToPoint);

  for (const p of points) {
    if (!region.points.has(pointToString({ x: p.x + 1, y: p.y }))) perimeter++;
    if (!region.points.has(pointToString({ x: p.x - 1, y: p.y }))) perimeter++;
    if (!region.points.has(pointToString({ x: p.x, y: p.y + 1 }))) perimeter++;
    if (!region.points.has(pointToString({ x: p.x, y: p.y - 1 }))) perimeter++;
  }

  return perimeter;
}

export function countStraightSections(region: Region): number {
  const points = Array.from(region.points).map(stringToPoint);
  const directions = [
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
  ];

  let sideCount = 0;

  for (const dir of directions) {
    const side = new Set<string>();

    for (const p of points) {
      const neighbor = { x: p.x + dir.x, y: p.y + dir.y };
      if (!region.points.has(pointToString(neighbor))) {
        side.add(pointToString(neighbor));
      }
    }

    const toRemove = new Set<string>();
    const perpDir = { x: dir.y, y: dir.x };

    for (const pointStr of side) {
      const p = stringToPoint(pointStr);
      let temp = { x: p.x + perpDir.x, y: p.y + perpDir.y };

      while (side.has(pointToString(temp))) {
        toRemove.add(pointToString(temp));
        temp = { x: temp.x + perpDir.x, y: temp.y + perpDir.y };
      }
    }

    sideCount += side.size - toRemove.size;
  }

  return sideCount;
}
