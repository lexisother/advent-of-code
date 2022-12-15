import run from 'aocrunner';
import { DataPoint, parse } from './lib.js';
import { sample } from './sample.js';
import { p1, p2 } from './solvers.js';

const parseInput = (rawInput: string): DataPoint[] => parse(rawInput);

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
        expected: 4861076,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 10649103160102,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
