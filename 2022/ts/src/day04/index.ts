import run from 'aocrunner';

const testInput = `
  2-4,6-8
  2-3,4-5
  5-7,7-9
  2-8,3-7
  6-6,4-6
  2-6,4-8
`;
const parseInput = (rawInput: string): string => rawInput;

let checker = (arr: number[], target: number[], p2: boolean = false) =>
  !p2 ? target.every((v) => arr.includes(v)) : target.some((v) => arr.includes(v));
let range = (s: number, f: number) => [...Array(f - s + 1)].map((e: number, i: number) => i + s);

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let pairs = input.split('\n');

  let incs = [];
  for (let pair of pairs) {
    let assig = pair.split(',');
    let id1 = assig[0].split('-').map((i) => parseInt(i));
    let id2 = assig[1].split('-').map((i) => parseInt(i));

    let sects1 = range(id1[0], id1[1]);
    let sects2 = range(id2[0], id2[1]);

    incs.push(checker(sects1, sects2) || checker(sects2, sects1));
  }

  incs = incs.filter((v) => v === true);
  return incs.length;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let pairs = input.split('\n');

  let incs = [];
  for (let pair of pairs) {
    let assig = pair.split(',');
    let id1 = assig[0].split('-').map((i) => parseInt(i));
    let id2 = assig[1].split('-').map((i) => parseInt(i));

    let sects1 = range(id1[0], id1[1]);
    let sects2 = range(id2[0], id2[1]);

    incs.push(checker(sects1, sects2, true) || checker(sects2, sects1, true));
  }

  incs = incs.filter((v) => v === true);
  return incs.length;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
