import { run } from "@aockit/core";

interface Input {
  ranges: number[][];
  ids: number[];
}

const parseInput = (rawInput: string): { ranges: number[][]; ids: number[] } => {
  let [ranges, ids] = rawInput.trim().split("\n\n");
  return {
    ranges: ranges.split("\n").map((i) => i.split("-").map((v) => parseInt(v))),
    ids: ids.split("\n").map((v) => parseInt(v)),
  };
};

const merge = (ranges: number[][]) => {
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (let i = 0; i < ranges.length; i++) {
    let [start, end] = ranges[i];
    // @ts-expect-error i know
    if (merged.at(-1)?.[1] >= end) continue;

    for (let j = i + 1; j < ranges.length; j++) {
      if (ranges[j][0] <= end) end = Math.max(end, ranges[j][1]);
    }

    merged.push([start, end]);
  }

  return merged;
};

const part1 = (input: Input): number => {
  let { ranges, ids } = input;
  ranges = merge(ranges);

  let tally = 0;

  for (const id of ids) {
    for (const [a, b] of ranges) {
      if (id >= a && id <= b) {
        tally++;
        break;
      }
    }
  }

  return tally;
};

const part2 = (input: Input): number => {
  let { ranges } = input;
  ranges = merge(ranges);

  let dist = 0;
  for (const [a, b] of ranges) {
    dist += b - a + 1;
  }

  return dist;
};

const example = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`.trim();

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
      expected: 14,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
