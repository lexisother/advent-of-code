import run from 'aocrunner';

const parseInput = (rawInput: string): number[][] =>
  rawInput
    .trim()
    .split(/\r?\n/)
    .filter((x) => x)
    .map((line) => line.split(' ').map((n) => Number(n)));

function pyramidFactoryGeneratorProcessor4000(line: number[]): number[][] {
  if (line.every((n) => n === 0)) return [line];
  const nextLine = [];
  for (let i = 1; i < line.length; i++) {
    nextLine.push(line[i] - line[i - 1]);
  }
  return [line, ...pyramidFactoryGeneratorProcessor4000(nextLine)];
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let res = 0;

  input.forEach((line) => {
    const pyramid = pyramidFactoryGeneratorProcessor4000(line);
    for (let i = 0; i < pyramid.length; i++) {
      const index = pyramid.length - i - 1;
      if (i === 0) {
        pyramid[index].push(0);
      } else {
        const left = pyramid[index + 1].at(-1) || 0;
        const right = pyramid[index + 1].at(-2) || 0;
        const base = pyramid[index].at(-1) || 0;
        const extra = base + Math.abs(left - right);
        pyramid[index].push(extra);
        res += extra;
      }
    }
  });

  return res;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let res = 0;

  input.forEach((line) => {
    const pyramid = pyramidFactoryGeneratorProcessor4000(line);
    for (let i = 0; i < pyramid.length; i++) {
      const index = pyramid.length - i - 1;
      if (i === 0) {
        pyramid[index].unshift(0);
      } else {
        const above = pyramid[index + 1].at(0) || 0;
        const base = pyramid[index].at(0) || 0;
        const extra = base - above;
        pyramid[index].unshift(extra);
      }
    }

    res += pyramid[0][0];
  });

  return res;
};

let example = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;
run({
  part1: {
    tests: [
      {
        input: example,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
