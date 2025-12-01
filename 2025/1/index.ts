import run from "@aockit/core";

const parseInput = (rawInput: string): [string, number][] =>
  rawInput.split("\n").map((i) => [i[0], parseInt(i.slice(1))]);

const part1 = (input: [string, number][]): number => {
  let dial = 50;
  let tally = 0;

  for (const [dir, dist] of input) {
    if (dir === "L") dial -= dist;
    else dial += dist;
    if (dial % 100 === 0) tally++;
  }

  return tally;
};

const part2 = (input: [string, number][]): number => {
  let dial = 50;
  let tally = 0;

  for (const [dir, dist] of input) {
    let dial2, a, b;
    if (dir === "L") {
      dial2 = dial - dist;
      a = Math.ceil(dial2 / 100);
      b = Math.floor((dial - 1) / 100);
    } else {
      dial2 = dial + dist;
      a = Math.ceil((dial + 1) / 100);
      b = Math.floor(dial2 / 100);
    }

    if (a <= b) tally += 1 + b - a;
    dial = dial2;
  }

  return tally;
};

const example = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`.trim();

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 3,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 6,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
