import { run } from "@aockit/core";

const parseInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .map((l) => l.split(" ").map((i) => Number(i)));

const isValid = (line: number[]): boolean => {
  let valid = true;
  let decreasing = true;
  let increasing = true;

  for (let i = 0; i < line.length; i++) {
    const diff = Math.abs(line[i] - line[i + 1]);
    if (diff < 1 || diff > 3) valid = false;
    if (line[i] > line[i + 1]) increasing = false;
    if (line[i] < line[i + 1]) decreasing = false;
    if (!valid || (!increasing && !decreasing)) break;
  }

  return valid && (increasing || decreasing);
};

const part1 = (input: number[][]): number => {
  let validReports = 0;

  for (const line of input) {
    if (isValid(line)) validReports++;
  }

  return validReports;
};

const part2 = (input: number[][]): number => {
  let validReports = 0;

  for (const line of input) {
    for (let i = 0; i < line.length; i++) {
      if (isValid(line.toSpliced(i, 1))) {
        validReports++;
        break;
      }
    }
  }

  return validReports;
};

const example = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 2,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 4,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
