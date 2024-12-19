import { run } from "@aockit/core";

interface Input {
  available: string[];
  designs: string[];
}

const parseInput = (input: string): Input => {
  const [available, designs] = input.trim().split("\n\n");

  return {
    available: available.split(", "),
    designs: designs.split("\n"),
  };
};

const eat = (design: string, available: string[]): number => {
  const cache: Record<string, number> = {};

  // guess i'm forced to use a nested function here, despite it working for the example
  // it doesn't like me doing this recursive logic directly in the top level function
  function helper(design: string): number {
    if (design === "") return 1;
    if (cache[design] !== undefined) return cache[design];

    let count = 0;
    for (const a of available) {
      if (design.startsWith(a)) {
        count += helper(design.slice(a.length));
      }
    }

    cache[design] = count;
    return count;
  }

  return helper(design);
};

const part1 = (input: Input): number => {
  let out = 0;

  for (let design of input.designs) {
    if (eat(design, input.available) > 0) out++;
  }

  return out;
};

const part2 = (input: Input): number => {
  let out = 0;

  for (let design of input.designs) {
    out += eat(design, input.available);
  }

  return out;
};

const example = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 6,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 16,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
