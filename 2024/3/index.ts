import { run } from "@aockit/core";

const example =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
const example2 =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

const part1 = (input: string): number => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let res = 0;
  const matches = input.matchAll(regex);
  for (const match of matches) {
    res += Number(match[1]) * Number(match[2]);
  }

  return res;
};

const part2 = (input: string): number => {
  const regex = /(do\(\))|(don't\(\))|(mul\((\d{1,3}),(\d{1,3})\))/g;

  let res = 0;
  let enabled = true;
  const matches = input.matchAll(regex);
  for (const match of matches) {
    if (match[1] === "do()") {
      enabled = true;
    }
    if (match[2] === "don't()") {
      enabled = false;
    }

    if (match[3]?.startsWith("mul") && enabled) {
      res += Number(match[4]) * Number(match[5]);
    }
  }
  return res;
};

run({
  part1: ({ input }) => part1(input),
  part2: ({ input }) => part2(input),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 161,
      solution: ({ input }) => part1(input),
    },
    {
      name: "Part 2",
      input: example2,
      expected: 48,
      solution: ({ input }) => part2(input),
    },
  ],
});
