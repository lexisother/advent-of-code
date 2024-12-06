import { run } from "@aockit/core";

const parseInput = (input: string): string[] => input.trim().split("\n");

// unwashed ass
const part1 = (input: string[]) => {
  let total = 0;
  for (let dimensions of input) {
    let [l, w, h] = dimensions.split("x").map(Number);

    const lw = l * w,
      wh = w * h,
      hl = h * l;

    total += 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
  }
  return total;
};

// unwashed ass
const part2 = (input: string[]) => {
  let total = 0;
  for (let dimensions of input) {
    let [l, w, h] = dimensions.split("x").map(Number);
    total += Math.min(l * 2 + w * 2, w * 2 + h * 2, h * 2 + l * 2) + l * w * h;
  }
  return total;
};

const example = `3x11x24
13x5x19
1x9x27
24x8x21
6x8x17`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 4733,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 7288,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
