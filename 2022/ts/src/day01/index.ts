import run from 'aocrunner';
import count from './count.js';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let counts = count(input).sort((a, b) => b - a);

  return counts[0];
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let counts = count(input).sort((a, b) => b - a);

  return counts[0] + counts[1] + counts[2];
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
