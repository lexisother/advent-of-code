import run from 'aocrunner';

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

// TODO: CLEANUP

const part1 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let total = 0;

  for (let game of input) {
    let impossible = false;
    let allCubes: Record<string, number> = {
      red: 12,
      green: 13,
      blue: 14,
    };

    let id = game.match(/Game (\d+):/)![1];

    let sets = game.split(';');
    for (let set of sets) {
      let cubes = set.split(',');
      for (let cube of cubes) {
        cube = cube.trim();
        let data = cube.match(/(\d+) (\w+)/)!;
        let available = allCubes[data[2]];
        if (parseInt(data[1], 10) > available) impossible = true;
      }
    }

    if (!impossible) total += parseInt(id, 10);
  }

  return total;
};

const part2 = (rawInput: string): number => {
  const input = parseInput(rawInput);
  let total = 0;

  for (let game of input) {
    let totals: Record<string, number[]> = {
      red: [],
      green: [],
      blue: [],
    };

    let sets = game.split(';');
    for (let set of sets) {
      let cubes = set.split(',');
      for (let cube of cubes) {
        cube = cube.trim();
        let data = cube.match(/(\d+) (\w+)/)!;
        totals[data[2]].push(parseInt(data[1], 10));
      }
    }

    let maxes: number[] = [];
    for (let t of Object.keys(totals)) {
      let to = totals[t];
      to.sort((a, b) => b - a);
      maxes.push(to[0]);
    }

    total += maxes[0] * maxes[1] * maxes[2];
  }

  return total;
};

let example = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
run({
  part1: {
    tests: [
      {
        input: example,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: example,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
