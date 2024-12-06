import { run } from "@aockit/core";

type ParenArray = ("(" | ")")[];

const parseInput = (input: string) => input.split("") as ParenArray;

// unwashed ass
const part1 = (input: ParenArray): number => {
  let floor = 0;
  for (let paren of input) {
    if (paren === "(") floor++;
    if (paren === ")") floor--;
  }
  return floor;
};

// unwashed ass
const part2 = (input: ParenArray): number => {
  let i = 0;
  let floor = 0;
  for (let paren of input) {
    i++;
    if (paren === "(") floor++;
    if (paren === ")") floor--;
    if (floor === -1) break;
  }
  return i;
};

const example = `()(((()))(()()()((((()(((())(()(()((((((()(()(((())))((()`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 19,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 57,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
