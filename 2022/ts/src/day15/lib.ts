export interface Coord {
  x: number;
  y: number;
}

export interface DataPoint {
  sensor: Coord;
  beacon: Coord;
}

export function parse(input: string): DataPoint[] {
  return input.split('\n').map((line): DataPoint => {
    const firstSlice = line
      .slice(line.indexOf('x='), line.indexOf(':'))
      .split(',')
      .map((it) => Number.parseInt(it.trim().slice(2), 10));

    const secondSlice = line
      .slice(line.indexOf('is at') + 'is at'.length)
      .split(',')
      .map((it) => Number.parseInt(it.trim().slice(2), 10));

    return {
      sensor: {
        x: firstSlice[0],
        y: firstSlice[1],
      },
      beacon: {
        x: secondSlice[0],
        y: secondSlice[1],
      },
    };
  });
}
