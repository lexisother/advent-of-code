import run from "aocrunner";

const example = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;
const example2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

const parseInput = (rawInput: string): string => rawInput;

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;

  let res = 0;
  const matches = input.matchAll(regex);
  for (const match of matches) {
    res += parseInt(match[1]) * parseInt(match[2]);
  }

  return res;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

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
      res += parseInt(match[4]) * parseInt(match[5]);
    }
  }
  return res;
};

run({
  part1: {
    tests: [
      {
        input: example,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example2,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
