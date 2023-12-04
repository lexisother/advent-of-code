import run from "aocrunner";

const parseInput = (rawInput: string): string[] => rawInput.split("\n");

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  return input
    .slice(0, -1)
    .map((x) =>
      x
        .substring(x.indexOf(":") + 2)
        .split(" | ")
        .map((y) => y.match(/\d+/g)!.map((z) => Number(z)))
    )
    .map((x) => x[0].filter((y) => x[1].includes(y)).length)
    .reduce((a, b) => a + Math.floor(Math.pow(2, b - 1)), 0);
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  return input
    .slice(0, -1)
    .map((x) =>
      x
        .substring(x.indexOf(":") + 2)
        .split(" | ")
        .map((y) => y.match(/\d+/g)!.map((z) => Number(z)))
    )
    .map((x) => x[0].filter((y) => x[1].includes(y)).length)
    .reduce(
      (a: number[], b, idx, _) =>
        [...a, ...Array(Math.max(0, idx + b + 1 - a.length)).fill(1)].map(
          (x, xidx) => x + (idx < xidx && xidx <= idx + b ? a[idx] ?? 1 : 0)
        ),
      []
    )
    .reduce((a, b) => a + b);
};

let example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
run({
  part1: {
    tests: [
      {
        input: example,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 30, // somehow this fails the test???
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
