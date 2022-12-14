import run from 'aocrunner';
import { p1 } from './p1.js';
import { p2 } from './p2.js';

const parseInput = (rawInput: string): string[][] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => line.trim().split(' -> '));
const sample = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return p1(input);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return p2(input);
};

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 24,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 93,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
