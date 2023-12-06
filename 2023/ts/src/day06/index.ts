import run from 'aocrunner';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

function calculate(rows: string[]): { p1: number; p2: number } {
  let time = rows[0].match(/\d+/g)!.map((x) => Number(x));
  let dist = rows[1].match(/\d+/g)!.map((x) => Number(x));
  time.push(Number(rows[0].replace(/\D/g, '')));
  dist.push(Number(rows[1].replace(/\D/g, '')));

  let p1 = 1,
    p2 = 1;
  let flag = time.length - 1;
  // Excuse me.
  time.forEach((t, i) => {
    let d = dist[i];
    let n = 0;
    for (let j = 0; j <= t; j++) {
      n += j * (t - j) > d ? 1 : 0;
    }
    p1 *= i < flag ? n : 1;
    p2 *= i == flag ? n : 1;
  });
  return { p1, p2 };
}

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return calculate(input).p1;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  return calculate(input).p2;
};

const example = `
  Time:      7  15   30
  Distance:  9  40  200
`;
run({
  part1: {
    tests: [
      {
        input: example,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
