import run from 'aocrunner';
import { sumRatioGenerator2000 } from './utils.js';

const parseInput = (rawInput: string): string[][] => rawInput.split('\n').map((x) => x.split(''));

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const { sum } = sumRatioGenerator2000(input);

  return sum;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const { ratios } = sumRatioGenerator2000(input);

  let sum = 0;
  for (const [_, b] of ratios) {
    if (b.length == 2) {
      sum += b[0] * b[1];
    }
  }

  return sum;
};

let example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;
run({
  part1: {
    tests: [
      {
        input: example,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
