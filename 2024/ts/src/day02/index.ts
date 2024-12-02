import run from "aocrunner";

const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const parseInput = (rawInput: string): number[][] =>
  rawInput
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .map((l) => l.split(" ").map((i) => parseInt(i)));

function isValid(line: number[]) {
  let valid = true;
  let decreasing = true;
  let increasing = true;

  for (let i = 0; i < line.length; i++) {
    const diff = Math.abs(line[i] - line[i + 1]);
    if (diff < 1 || diff > 3) valid = false;
    if (line[i] > line[i + 1]) increasing = false;
    if (line[i] < line[i + 1]) decreasing = false;
    if (!valid || (!increasing && !decreasing)) break;
  }

  return valid && (increasing || decreasing);
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let validReports = 0;

  for (const line of input) {
    if (isValid(line)) validReports++;
  }

  return validReports;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let validReports = 0;

  for (const line of input) {
    for (let i = 0; i < line.length; i++) {
      if (isValid(line.toSpliced(i, 1))) {
        validReports++;
        break;
      }
    }
  }

  return validReports;
};

run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: exampleInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
