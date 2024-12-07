import { run } from "@aockit/core";
import { isPossible, isPossibleWithOr } from "./utils";

const parseInput = (input: string): [number, number[]][] =>
  input
    .split("\n")
    .filter((row) => row.length > 0)
    .map((row) => row.split(": "))
    .map(([key, values]) => [Number(key), values.split(" ").map(Number)]);

const part1 = (input: [number, number[]][]): number => {
  return input
    .filter(isPossible)
    .map((equation) => equation[0])
    .reduce((sum, curr) => (sum += curr), 0);
};

const part2 = (input: [number, number[]][]): number => {
  return input
    .filter(isPossibleWithOr)
    .map((equation) => equation[0])
    .reduce((sum, curr) => (sum += curr), 0);
};

const example = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 3749,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 11387,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
