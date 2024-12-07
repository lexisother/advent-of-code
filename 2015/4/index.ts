import { run } from "@aockit/core";
import { md5 } from "js-md5";

const getAns = (input: string, p: number): number => {
  let i = 1;
  while (!md5(input.trim() + i).startsWith(p == 1 ? "00000" : "000000")) {
    i++;
  }
  return i;
};

const example = `abcdef`;

run({
  part1: ({ input }) => getAns(input, 1),
  part2: ({ input }) => getAns(input, 2),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 609043,
      solution: ({ input }) => getAns(input, 1),
    },
    {
      name: "Part 2",
      input: example,
      expected: 6742839,
      solution: ({ input }) => getAns(input, 2),
    },
  ],
});
