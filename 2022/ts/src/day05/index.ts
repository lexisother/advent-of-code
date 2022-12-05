import run from 'aocrunner';

const parseInput = (rawInput: string): string => rawInput;
const packages = [
  [],
  ['Z', 'J', 'G'],
  ['Q', 'L', 'R', 'P', 'W', 'F', 'V', 'C'],
  ['F', 'P', 'M', 'C', 'L', 'G', 'R'],
  ['L', 'F', 'B', 'W', 'P', 'H', 'M'],
  ['G', 'C', 'F', 'S', 'V', 'Q'],
  ['W', 'H', 'J', 'Z', 'M', 'Q', 'T', 'L'],
  ['H', 'F', 'S', 'B', 'V'],
  ['F', 'J', 'Z', 'S'],
  ['M', 'C', 'D', 'P', 'F', 'H', 'B', 'T'],
];

const part1 = (rawInput: string): void => {
  const input = parseInput(rawInput);
  const instructions = input.split('\n\n').pop()!.split('\n');

  for (let line of instructions) {
    const words = line.split(' ');
    let amount = parseInt(words[1], 10);
    let from = parseInt(words[3], 10);
    let to = parseInt(words[5], 10);

    for (let i = 0; i < amount; i++) {
      let pkg = packages[from].pop()!;
      packages[to].push(pkg);
    }
  }
  for (let b of packages) {
    console.log(`${b.at(-1)}`);
  }
};

const part2 = (rawInput: string): void => {
  const input = parseInput(rawInput);
  const instructions = input.split('\n\n').pop()!.split('\n');

  for (let line of instructions) {
    const words = line.split(' ');
    let amount = parseInt(words[1], 10);
    let from = parseInt(words[3], 10);
    let to = parseInt(words[5], 10);

    let pkgs = [];
    for (let i = 0; i < amount; i++) {
      let pkg = packages[from].pop()!;
      pkgs.push(pkg);
    }
    pkgs = pkgs.reverse();
    for (let pkg of pkgs) {
      packages[to].push(pkg);
    }
  }
  for (let b of packages) {
    console.log(`${b.at(-1)}`);
  }
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
