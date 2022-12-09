import run from 'aocrunner';
import { Direction, Move, reduceMove } from './lib.js';
import { sample, sample1 } from './samples.js';

const parseInput = (rawInput: string): Move[] =>
  rawInput
    .trim()
    .split('\n')
    .map((line) => line.trim().split(' ', 2))
    .map(([direction, steps]) => ({
      direction: direction as Direction,
      steps: parseInt(steps, 10),
    }));

function doPart(input: Move[], tailSize = 1): number {
  const endState = input.reduce((state, move) => reduceMove(state, move), {
    head: { x: 0, y: 0 },
    tail: new Array(tailSize).fill(null).map(() => ({ x: 0, y: 0 })),
    visited: new Set<string>([`0/0`]),
  });
  return endState.visited.size;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doPart(input);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doPart(input, 9);
};

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample1,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
