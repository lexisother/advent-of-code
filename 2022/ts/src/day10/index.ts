import run from 'aocrunner';
import { executeInstructions } from './lib.js';
import { sample, sample1 } from './sample.js';

const parseInput = (rawInput: string): string[] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => line.trim());

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return executeInstructions(input).signals;
};

// TODO: Figure out why this is replacing the last period with a hash.
const part2 = (rawInput: string): string => {
  const input = parseInput(rawInput);
  return executeInstructions(input)
    .screen.map((line) => line.join(''))
    .join('\n');
};

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 13140,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: sample1,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
