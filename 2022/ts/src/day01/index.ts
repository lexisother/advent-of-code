import run from 'aocrunner';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let counts = [];
  let counter = 0;
  for (var i = 0; i < input.length; i++) {
    let line = input[i];
    if (line == '') {
      counts.push(counter);
      counter = 0;
    } else {
      counter += parseInt(line);
    }
  }

  counts = counts.sort((a, b) => b - a);

  console.log(counts);
  console.log(counts[0]);

  return counts[0];
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let counts = [];
  let counter = 0;
  for (var i = 0; i < input.length; i++) {
    let line = input[i];
    if (line == '') {
      counts.push(counter);
      counter = 0;
    } else {
      counter += parseInt(line);
    }
  }

  counts = counts.sort((a, b) => b - a);

  return counts[0] + counts[1] + counts[2];
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
