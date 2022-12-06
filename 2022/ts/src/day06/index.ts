import run from 'aocrunner';

const parseInput = (rawInput: string): string => rawInput;

function doPart(input: string, num: number): number {
  let i = 0;
  for (i = 0; i < input.length; i++) {
    if (new Set(input.slice(i, i + num)).size === num) {
      break;
    }
  }
  return i + num;
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doPart(input, 4);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return doPart(input, 14);
};

run({
  part1: {
    tests: [
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
