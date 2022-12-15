import { DataPoint } from './lib.js';

export function p1(input: DataPoint[]): number {
  const row = 2000000;

  const resultSet = new Set();

  input.forEach(({ sensor, beacon }) => {
    const dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    const restDist = dist - Math.abs(row - sensor.y);

    if (restDist < 0) return;

    if (!(sensor.x === beacon.x && row === beacon.y)) resultSet.add(sensor.x);

    for (let i = 1; i < restDist + 1; i += 1) {
      if (!(sensor.x - i === beacon.x && row === beacon.y)) resultSet.add(sensor.x - i);

      if (!(sensor.x + i === beacon.x && row === beacon.y)) resultSet.add(sensor.x + i);
    }
  });

  return resultSet.size;
}

export function p2(input: DataPoint[]): number {
  for (let row = 0; row <= 4000000; row++) {
    const ranges: Array<{ start: number; end: number }> = [];
    input.forEach(({ sensor, beacon }) => {
      const dist = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
      const restDist = dist - Math.abs(row - sensor.y);

      if (restDist < 0) return;
      ranges.push({ start: sensor.x - restDist, end: sensor.x + restDist });
    });

    ranges.sort((a, b) => a.start - b.start);
    const merged = [];
    for (let i = 0; i < ranges.length - 1; i++) {
      const curr = ranges[i];
      const next = ranges[i + 1];

      if ((next.start <= curr.end && curr.end <= next.end) || next.end === curr.end + 1) {
        ranges[i + 1] = { start: curr.start, end: next.end };
      } else if (curr.start <= next.start && curr.end >= next.end) {
        ranges[i + 1] = curr;
      } else {
        merged.push(curr);
      }
    }
    merged.push(ranges[ranges.length - 1]);
    if (merged.length > 1) {
      return (merged[0].end + 1) * 4000000 + row;
    }
  }
  return 0xdeadbeef;
}
