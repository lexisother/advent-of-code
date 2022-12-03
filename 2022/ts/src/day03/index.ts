import run from 'aocrunner';

const testInput = `
  vJrwpWtwJgWrhcsFMMfFFhFp
  jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
  PmmdzqPrVvPwwTWBwg
  wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
  ttgJtRGJQctTZtZT
  CrZsJsPPZsGzwwsLwLmpwMDw
`;
const parseInput = (rawInput: string): string => rawInput;
const charToPriority = (item: string): number =>
  item.charCodeAt(0) - (item.charCodeAt(0) > 96 ? 96 : 64 - 26);

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput).split('\n');
  let total = 0;

  for (let sack of input) {
    let comp1 = sack.slice(0, sack.length / 2);
    let comp2 = sack.slice(sack.length / 2, sack.length);

    let split1 = comp1.split('');
    let found = false;
    for (let item of comp2) {
      if (found) continue;

      if (split1.includes(item)) {
        found = true;
        total += charToPriority(item);
      }
    }
  }

  return total;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let groups = input.match(/(?=[\s\S])(?:.*\n?){1,3}/g)!;
  let total = 0;

  for (let group of groups) {
    let sacks = group.split('\n').filter((n) => n);

    let commonLetter = '';
    for (let item of sacks[2]) {
      let s1 = sacks[0].split('');
      let s2 = sacks[1].split('');
      if (s1.includes(item) && s2.includes(item)) commonLetter = item;
    }

    total += charToPriority(commonLetter);
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: testInput,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: testInput,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
