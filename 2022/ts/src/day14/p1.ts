export function p1(input: string[][]): number {
  const map = new Map<string, string>();
  input.forEach((line) => {
    line.slice(0, -1).forEach((start, i) => {
      const [startX, startY] = start.split(',', 2).map((item) => parseInt(item, 10));
      const [endX, endY] = line[i + 1]!.split(',', 2).map((item) => parseInt(item, 10));

      if (startX !== endX) {
        for (let i = Math.min(startX, endX); i <= Math.max(startX, endX); i++) {
          map.set(`${i},${startY}`, '#');
        }
      }

      if (startY !== endY) {
        for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
          map.set(`${startX},${i}`, '#');
        }
      }
    });
  });

  const abyssStart = Math.max(
    ...Array.from(map.keys()).map((item) => parseInt(item.split(',').at(1)!, 10)),
  );
  let sandX: number, sandY: number;

  sand: while (true) {
    sandX = 500;
    sandY = 0;
    while (true) {
      if (sandY >= abyssStart) break sand;

      if (!['o', '#'].includes(map.get(`${sandX},${sandY + 1}`)!)) {
        sandY++;
        continue;
      }
      if (!['o', '#'].includes(map.get(`${sandX - 1},${sandY + 1}`)!)) {
        sandX--;
        sandY++;
        continue;
      }
      if (!['o', '#'].includes(map.get(`${sandX + 1},${sandY + 1}`)!)) {
        sandX++;
        sandY++;
        continue;
      }
      map.set(`${sandX},${sandY}`, 'o');
      break;
    }
  }
  return Array.from(map.values()).filter((value) => value === 'o').length;
}
