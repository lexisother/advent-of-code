import run from 'aocrunner';
import { lookDown, lookLeft, lookRight, lookUp } from './lib.js';

const testInput = `30373
25512
65332
33549
35390`;
const parseInput = (rawInput: string): number[][] => {
  return rawInput
    .trim()
    .split('\n')
    .map((line) => Array.from(line.trim()).map((char) => parseInt(char, 10)));
};

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  return input.flat().filter((height, position) => {
    const x = Math.floor(position % input[0].length);
    const y = Math.floor(position / input[0].length);
    return (
      input
        .at(y)!
        .slice(0, x)
        .every((other) => other < height) ||
      input
        .at(y)!
        .slice(x + 1)
        .every((other) => other < height) ||
      input.slice(0, y).every((row) => row.at(x)! < height) ||
      input.slice(y + 1).every((row) => row.at(x)! < height)
    );
  }).length;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const values = input.flat().map((height, position) => {
    const x = Math.floor(position % input[0].length);
    const y = Math.floor(position / input[0].length);
    if (x === 0 || x === input[0].length - 1 || y === 0 || y === input.length - 1) {
      return -Infinity;
    }
    const up = lookUp(x, y, input, height);
    const left = lookLeft(x, y, input, height);
    const right = lookRight(x, y, input, height);
    const down = lookDown(x, y, input, height);
    const visibility = left * right * up * down;
    return visibility;
  });
  return Math.max(...values);
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
