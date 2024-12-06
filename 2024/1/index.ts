import run from "@aockit/core";

const parseInput = (rawInput: string): string[] => rawInput.split("\n");

const part1 = (input: string[]): number => {
  const distances: number[] = [];
  const leftIds: number[] = [];
  const rightIds: number[] = [];

  for (const idPair of input) {
    const [left, right] = idPair.split("   ").map((id) => Number(id.trim()));
    leftIds.push(left);
    rightIds.push(right);
  }
  leftIds.sort();
  rightIds.sort();

  for (let i = 0; i < leftIds.length; i++) {
    const left = leftIds[i];
    const right = rightIds[i];

    distances.push(Math.abs(left - right));
  }

  return distances.reduce((acc, a) => acc + a, 0);
};

const part2 = (input: string[]): number => {
  const leftIds: number[] = [];
  const rightIds: number[] = [];
  const appearances = (arr1: number[], arr2: number[]) =>
    arr1.reduce((acc: number[], val: number) => {
      acc[val] = arr2.filter((v) => val === v).length;
      return acc;
    }, []);

  for (const idPair of input) {
    const [left, right] = idPair.split("   ").map((id) => Number(id.trim()));
    leftIds.push(left);
    rightIds.push(right);
  }
  leftIds.sort();
  rightIds.sort();

  const occMap = appearances(leftIds, rightIds);
  let res = 0;
  for (const [num, occs] of Object.entries(occMap)) {
    res += Number(num) * occs;
  }

  return res;
};

const example = `3   4
4   3
2   5
1   3
3   9
3   3`.trim();

run({
  part1: ({ readInput }) => part1(readInput("lines")),
  part2: ({ readInput }) => part2(readInput("lines")),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 11,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 13,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
