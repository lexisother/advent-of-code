import run from 'aocrunner';
import { sample } from './sample.js';
import { comparePackets, deepClone } from './lib.js';
import { Packet } from './types.js';

const parseInput = (rawInput: string): Packet[][] =>
  rawInput
    .trim()
    .split('\n\n')
    .map((group) =>
      group
        .trim()
        .split('\n')
        .map((line) => JSON.parse(line) as Packet),
    );

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return input
    .map(([left, right]) => comparePackets(left, right))
    .reduce((acc, result, i) => (result < 0 ? acc + (i + 1) : acc), 0 as number);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  const sortedPackets = input
    .flat()
    .concat([[[2]]], [[[6]]])
    .sort((a, b) => comparePackets(deepClone(a), deepClone(b)));
  const firstDividerPacket = sortedPackets.findIndex(
    (packet) => JSON.stringify(packet) === JSON.stringify([[2]]),
  );
  const secondDividerPacket = sortedPackets.findIndex(
    (packet) => JSON.stringify(packet) === JSON.stringify([[6]]),
  );
  return (firstDividerPacket + 1) * (secondDividerPacket + 1);
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
        input: sample,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
