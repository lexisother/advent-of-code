import { run } from "@aockit/core";

const parseInput = (rawInput: string): number[][] =>
  rawInput
    .trim()
    .split("\n")
    .map((l) => l.split("").map((v) => parseInt(v)));

const part1 = (input: number[][]): number => {
  let tally = 0;

  for (const bank of input) {
    let maxFirst = bank[0];
    let earliestFirst = 0;

    for (let i = 0; i < bank.length - 1; i++) {
      if (bank[i] > maxFirst) {
        maxFirst = bank[i];
        earliestFirst = i;
      }
      if (maxFirst === 9) break;
    }

    let maxLast = bank[earliestFirst + 1];
    let earliestLast = earliestFirst + 1;

    for (let i = earliestFirst + 2; i < bank.length; i++) {
      if (bank[i] > maxLast) {
        maxLast = bank[i];
        earliestLast = i;
      }
      if (maxLast === 9) break;
    }

    tally += maxFirst * 10 + maxLast;
  }

  return tally;
};

const part2 = (input: number[][]): number => {
  let tally = 0;

  for (const bank of input) {
    let prevIndex = -1;
    const maxDigits = Array(12).fill(0);

    for (let digit = 1; digit <= 12; digit++) {
      let maxDigit = bank[prevIndex + 1];
      let maxDigitIndex = prevIndex + 1;

      for (let i = prevIndex + 2; i < bank.length - (12 - digit); i++) {
        if (bank[i] > maxDigit) {
          maxDigit = bank[i];
          maxDigitIndex = i;
        }
        if (maxDigit === 9) break;
      }

      prevIndex = maxDigitIndex;
      maxDigits[digit - 1] = maxDigit;
    }

    tally += parseInt(maxDigits.join(""));
  }

  return tally;
};

const example = `987654321111111
811111111111119
234234234234278
818181911112111`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 357,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 3121910778619,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
