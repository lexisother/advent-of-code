import run from 'aocrunner';
import { doP1 } from './p1.js';
import { doP2 } from './p2.js';
import { Input } from './types.js';

const parseInput = (rawInput: string): Input => {
  const grid = rawInput
    .trim()
    .split('\n')
    .map((line) => Array.from(line.trim()));
  const sX = grid.reduce(
    (acc, row) =>
      Math.max(
        acc,
        row.findIndex((val) => val === 'S'),
      ),
    -1,
  );
  const sY = grid.findIndex((row) => row.includes('S'));
  const eX = grid.reduce(
    (acc, row) =>
      Math.max(
        acc,
        row.findIndex((val) => val === 'E'),
      ),
    -1,
  );
  const eY = grid.findIndex((row) => row.includes('E'));
  const map = grid.map((row) =>
    row.map((val) => (val === 'S' ? -1 : val === 'E' ? 26 : val.charCodeAt(0) - 97)),
  );
  return { grid: map, start: { x: sX, y: sY }, end: { x: eX, y: eY } };
};
const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doP1(input);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doP2(input);
};

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
