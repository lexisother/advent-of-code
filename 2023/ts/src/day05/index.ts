import run from 'aocrunner';
import { example } from './example.js';

const parseInput = (rawInput: string): { seeds: number[]; groups: number[][][] } => {
  rawInput = rawInput.trim();
  let numbers = (w: string): number[] => w.match(/\d+/g)!.map((x) => Number(x));
  let seeds = numbers(rawInput.split('\n')[0]);
  let groups = rawInput
    .split('\n\n')
    .slice(1)
    .map((g) =>
      g
        .split('\n')
        .slice(1)
        .map((x) => numbers(x)),
    );
  return { seeds, groups };
};

const part1 = (rawInput: string): number => {
  const { seeds, groups } = parseInput(rawInput);

  let res = 0;
  seeds.forEach((x) => {
    groups.forEach((g) => {
      let r = g.find((r) => x > r[1] && x <= r[1] + r[2]);
      if (!r) return;
      x += r[0] - r[1];
    });
    res = Math.min(res, x) || x;
  });

  return res;
};

const part2 = (rawInput: string): number => {
  const { seeds, groups } = parseInput(rawInput);

  let res = 0;
  groups.reverse();
  while (++res) {
    let x = res;
    groups.forEach((g) => {
      let r = g.find((r) => r[0] <= x && r[0] + r[2] > x);
      if (!r) return;
      x += r[1] - r[0];
    });
    if (seeds.find((s, i) => !(i % 2) && x >= s && x < s + seeds[i + 1])) {
      break;
    }
  }

  return res;
};

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
