import { run } from "@aockit/core";

const parseInput = (input: string): string => input;

const part1 = (input: string): void => {};

const part2 = (input: string): void => {};

const example = ``;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 0,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 0,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
