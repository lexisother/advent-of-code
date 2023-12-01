import run from 'aocrunner';
import { getValue } from './utils.js';

// TODO: CLEANUP

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let tot = 0;

  for (let line of input) {
    line = line.replace(/\D/g, '');
    let len = line.length - 1;
    line = `${line[0]}${line[len]}`;
    tot += parseInt(line, 10);
  }

  return tot;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let tot = 0;
  for (let line of input) {
    tot += getValue(line);
  }

  return tot;
};

run({
  part1: {
    tests: [
      {
        input: `
          1abc2
          pqr3stu8vwx
          a1b2c3d4e5f
          treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          two1nine
          eightwothree
          abcone2threexyz
          xtwone3four
          4nineeightseven2
          zoneight234
          7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
