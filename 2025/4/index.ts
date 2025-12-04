import { run } from "@aockit/core";

const parseInput = (rawInput: string): string[][] =>
  rawInput
    .trim()
    .split("\n")
    .map((i) => i.split(""));

const dirs = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const neighbours = (grid: string[][], x: number, y: number) => {
  let count = 0;

  for (const [dx, dy] of dirs) {
    if (grid[y + dy]?.[x + dx] === "@") count++;
  }

  return count;
};

const part1 = (input: string[][]): number => {
  let tally = 0;

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] !== "@") continue;
      if (neighbours(input, x, y) < 4) tally++;
    }
  }

  return tally;
};

const part2 = (input: string[][]): number => {
  let tally = 0;
  let removed;

  // while (removed) {
  do {
    removed = false;
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] !== "@") continue;
        if (neighbours(input, x, y) < 4) {
          input[y][x] = ".";
          removed = true;
          tally++;
        }
      }
    }
  } while (removed);
  // }

  return tally;
};

const example = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 13,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 43,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
