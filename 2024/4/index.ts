import { run } from "@aockit/core";

const parseInput = (input: string): string[][] => input.split("\n").map((row) => row.split(""));

const search = ["X", "M", "A", "S"];

const part1 = (input: string[][]): number => {
  let total = 0;
  const searchEvery = [search, search.toReversed()];

  // apparently forEach is quick now and it's handy access to the element and i, so whatever
  input.forEach((row, idy) => {
    row.forEach((_el, idx) => {
      if (searchEvery.some((s) => s.every((letter, i) => row[idx + i] === letter))) {
        total++;
      }

      if (searchEvery.some((s) => s.every((letter, i) => input[idy + i]?.[idx] === letter))) {
        total++;
      }

      if (searchEvery.some((s) => s.every((letter, i) => input[idy + i]?.[idx + i] === letter))) {
        total++;
      }

      if (searchEvery.some((s) => s.every((letter, i) => input[idy + i]?.[idx - i] === letter))) {
        total++;
      }
    });
  });

  return total;
};

const part2 = (input: string[][]): number => {
  let total = 0;
  const searchEveryX = [search.slice(1), search.slice(1).toReversed()];

  input.forEach((row, idy) => {
    row.forEach((_el, idx) => {
      if (
        searchEveryX.some((s) => s.every((letter, i) => input[idy + i]?.[idx + i] === letter)) &&
        searchEveryX.some((s) => s.every((letter, i) => input[idy + i]?.[idx + 2 - i] === letter))
      ) {
        total += 1;
      }
    });
  });

  return total;
};

const example = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 18,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 9,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
