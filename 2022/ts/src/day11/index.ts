import run from 'aocrunner';
import { calculateLCM, evaluateOperation, evaluateTest, parse } from './lib.js';
import { Input } from './types.js';
import { sample } from './sample.js';

const parseInput = (rawInput: string): Input => parse(rawInput);

function doPart(input: Input, rounds: number, partTwo = false): number {
  const inspections = new Map<string, number>(Array.from(input.keys()).map((key) => [key, 0]));
  const lcm = calculateLCM(...Array.from(input.values()).map((monkey) => monkey.test.module));
  for (const _round of new Array(rounds).fill(null).map((_, i) => i)) {
    for (const [id, monkey] of input.entries()) {
      while (monkey.items.length) {
        inspections.set(id, inspections.get(id)! + 1);
        const item = monkey.items.shift()!;
        const worryLevel = partTwo
          ? evaluateOperation(monkey.operation, item) % lcm
          : evaluateOperation(monkey.operation, item) / 3n;
        const targetMonkey = evaluateTest(monkey.test, worryLevel);
        input.get(targetMonkey)?.items.push(worryLevel);
      }
    }
  }
  return Array.from(inspections.values())
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b, 1);
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doPart(input, 20);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doPart(input, 10_000, true);
};

run({
  part1: {
    tests: [
      {
        input: sample,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: sample,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
