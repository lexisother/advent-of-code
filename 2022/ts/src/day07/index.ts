import run from 'aocrunner';
import { calculateDirSize } from './lib.js';
import { sample } from './sample.js';

const parseInput = (rawInput: string): string[] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => line.trim());

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return calculateDirSize(input, [{ name: '/', size: 0 }], [], (dir) => dir.size <= 100000).reduce(
    (acc, curr) => acc + curr.size,
    0,
  );
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const dirSizes = calculateDirSize(input, [{ name: '/', size: 0 }], [], (_) => true);
  const fsSize = 70000000;
  const neededSpace = 30000000;
  const freeSpace =
    fsSize - dirSizes.filter((dir) => dir.name === '/').reduce((acc, curr) => acc + curr.size, 0);

  return dirSizes.sort((a, b) => a.size - b.size).find((dir) => freeSpace + dir.size > neededSpace)!
    .size;
};

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 95437,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 24933642,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
