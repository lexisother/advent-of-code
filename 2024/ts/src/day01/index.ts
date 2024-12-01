import run from "aocrunner";

const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

const parseInput = (rawInput: string): string[] => rawInput.split("\n");

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const distances: number[] = [];
  const leftIds: number[] = [];
  const rightIds: number[] = [];

  for (const idPair of input) {
    const [left, right] = idPair.split("   ").map((id) => parseInt(id.trim()));
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

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  const leftIds: number[] = [];
  const rightIds: number[] = [];
  const appearances = (arr1: number[], arr2: number[]) =>
    arr1.reduce((acc: number[], val: number) => {
      acc[val] = arr2.filter((v) => val === v).length;
      return acc;
    }, []);

  for (const idPair of input) {
    const [left, right] = idPair.split("   ").map((id) => parseInt(id.trim()));
    leftIds.push(left);
    rightIds.push(right);
  }
  leftIds.sort();
  rightIds.sort();

  const occMap = appearances(leftIds, rightIds);
  let res = 0;
  for (let [num, occs] of Object.entries(occMap)) {
    res += parseInt(num) * occs;
  }

  return res;
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
