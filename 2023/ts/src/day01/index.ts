import run from 'aocrunner';
import { reverse } from '../utils/index.js';

// TODO: CLEANUP

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let tot = 0;
  for (let line of input) {
    line = line.replace(/\D/g, '');
    let len = line.length - 1;
    line = `${line[0]}${line[len]}`;
    tot += parseInt(line, 10);
  }
  return tot;
};

let map: Record<string, string> = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};
let map_r: Record<string, string> = {
  eno: '1',
  owt: '2',
  eerht: '3',
  ruof: '4',
  evif: '5',
  xis: '6',
  neves: '7',
  thgie: '8',
  enin: '9',
};
let regex = /(one|two|three|four|five|six|seven|eight|nine|[1-9])/g;
let regex_r = /(eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|[1-9])/g;
function getValue(line: string): number {
  let answers = line.match(regex)!;
  let answers_r = reverse(line).match(regex_r)!;

  let first = answers[0];
  let last = answers_r[0];
  if (first.length !== 1) first = map[first];
  if (last.length !== 1) last = map_r[last];
  let str = first + last;
  return parseInt(str, 10);
}
const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);

  let tot = 0;
  for (let line of input) {
    tot += getValue(line);
  }
  return tot;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
