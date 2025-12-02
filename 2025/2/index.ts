import { run } from "@aockit/core";
import { arraysEqual, range } from "./utils";

const parseInput = (rawInput: string): string[] => rawInput.split(",");
const forRange = (input: string[], cb: (i: number) => void) => {
  for (const rng of input) {
    const [, l, r] = rng.match(/(\d+)-(\d+)/)!;

    for (const i of range(parseInt(l), parseInt(r) + 1)) {
      cb(i);
    }
  }
};

const part1 = (input: string[]): number => {
  let incorrectIds: number[] = [];

  forRange(input, (i) => {
    let arr = i
      .toString()
      .split("")
      .map((v: string) => parseInt(v));
    let fHalf = arr.splice(0, Math.floor(arr.length / 2));

    if (arraysEqual(fHalf, arr)) {
      incorrectIds.push(parseInt(fHalf.concat(arr).join("")));
    }
  });

  return incorrectIds.reduce((acc, i) => (acc += i));
};

const part2 = (input: string[]): number => {
  let incorrectIds: string[] = [];

  forRange(input, (i) => {
    for (const j of range(1, 10)) {
      const match = i.toString().match(new RegExp("(\\d{" + j + "})\\1+"));
      if (match && match[0] === i.toString() && !incorrectIds.includes(match[0])) {
        incorrectIds.push(match[0]);
      }
    }
  });

  let numberIds = incorrectIds.map((v) => parseInt(v));
  return numberIds.reduce((acc, i) => (acc += i));
};

const example = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 1227775554,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 4174379265,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
