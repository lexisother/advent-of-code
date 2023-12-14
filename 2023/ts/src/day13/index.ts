import run from 'aocrunner';
import { getReflection, getSmudge, rotate } from './utils.js';

const parseInput = (rawInput: string): string[][] =>
  rawInput
    .trim()
    .split('\n\n')
    .map((m) => m.split('\n'));

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let res = 0;
  input.forEach((mirror) => {
    res += getReflection(mirror) || getReflection(rotate(mirror)) * 100;
  });
  return res;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let res = 0;
  input.forEach((mirror) => {
    res += getSmudge(mirror) || getSmudge(rotate(mirror)) * 100;
  });
  return res;
};

let example = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;
run({
  part1: {
    tests: [
      {
        input: example,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
