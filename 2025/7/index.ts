import { run } from "@aockit/core";

const parseInput = (rawInput: string) =>
  rawInput
    .trim()
    .split("\n")
    .map((l) => l.split(""));

const part1 = (input: string[][]) => {
  const enterPoint = input[0].indexOf("S");
  let tally = 0;

  input[1][enterPoint] = "|";
  for (let i = 2; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i - 1][j] === "|") {
        if (input[i][j] === ".") {
          input[i][j] = "|";
        } else if (input[i][j] === "^") {
          input[i][j + 1] = "|";
          input[i][j - 1] = "|";
          tally++;
        }
      }
    }
  }

  return tally;
};

const part2 = (input: (string | number)[][]) => {
  const enterPoint = input[0].indexOf("S");

  input[1][enterPoint] = 1;
  for (let i = 2; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const prev = input[i - 1][j],
        curr = input[i][j],
        left = input[i][j - 1],
        right = input[i][j + 2];

      if (typeof prev === "number") {
        if (curr === ".") {
          input[i][j] = prev;
        } else if (typeof curr === "number") {
          input[i][j] = curr + prev;
        } else if (curr === "^") {
          if (typeof right === "number") {
            input[i][j + 1] = right + prev;
          } else {
            input[i][j + 1] = prev;
          }

          if (typeof left === "number") {
            input[i][j - 1] = left + prev;
          } else {
            input[i][j - 1] = prev;
          }
        }
      }
    }
  }

  return input[input.length - 1].reduce((acc: number, i) => {
    if (typeof i === "number") return acc + i;
    return acc;
  }, 0);
};

const example = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 21,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 40,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
