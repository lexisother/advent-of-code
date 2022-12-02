import run from 'aocrunner';
import { parse } from './lib.js';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let total = 0;
  for (let line of input) {
    let game = line.split(' ');
    let outcome = parse(game[0], game[1]);
    total += outcome;
  }

  return total;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let total = 0;
  for (let line of input) {
    let game = line.split(' ');
    let outcome = parse(game[0], game[1], true);
    total += outcome;
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
