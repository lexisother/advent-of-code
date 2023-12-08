import run from 'aocrunner';
import { example1, example2, example3 } from './examples.js';
import { createGraph, getSteps, lcm } from './utils.js';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  // Instructions
  const I = input[0].split('');

  // Graph
  const G = createGraph(input);

  return getSteps(G, I, G.AAA);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  // Instructions
  const I = input[0].split('');

  // Graph
  const G = createGraph(input);

  // Steps
  const S: number[] = [];
  Object.keys(G).forEach((node) => {
    if (node.split('')[2] === 'A') {
      S.push(getSteps(G, I, G[node]));
    }
  });

  let res = S[0];
  for (let i = 1; i < S.length; i++) {
    res = lcm(res, S[i]);
  }

  return res;
};

run({
  part1: {
    tests: [
      {
        input: example1,
        expected: 2,
      },
      {
        input: example2,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example3,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
