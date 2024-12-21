import { run } from "@aockit/core";

const parseInput = (input: string): string[] => input.trim().split("\n");

const keypad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [null, "0", "A"],
];
const keyboard = [
  [null, "^", "A"],
  ["<", "v", ">"],
];

const dfs = (
  map: (string | null)[][],
  startX: number,
  endX: number,
  startY: number,
  endY: number,
  path = "",
) => {
  if (startX === endX && startY === endY) return [path];
  if (startX < 0 || startX >= map[0].length) return [];
  if (startY < 0 || startY >= map.length) return [];
  if (map[startY][startX] === null) return [];

  const possiblePaths: string[] = [];
  if (startX > endX) {
    possiblePaths.push(...dfs(map, startX - 1, endX, startY, endY, path + "<"));
  } else if (startX < endX) {
    possiblePaths.push(...dfs(map, startX + 1, endX, startY, endY, path + ">"));
  }
  if (startY > endY) {
    possiblePaths.push(...dfs(map, startX, endX, startY - 1, endY, path + "^"));
  } else if (startY < endY) {
    possiblePaths.push(...dfs(map, startX, endX, startY + 1, endY, path + "v"));
  }

  const minimalPath = Math.min(...possiblePaths.map((path) => path.length));
  return possiblePaths.filter((path) => path.length === minimalPath);
};

const getAllPaths = (data: (string | null)[][]): Record<string, Record<string, string[]>> =>
  data.reduce(
    (acc, row, startY) => ({
      ...acc,
      ...row.reduce((acc, start, startX) => {
        if (start === null) return acc;
        return {
          ...acc,
          [start]: data.reduce(
            (acc, row2, endY) => ({
              ...acc,
              ...row2.reduce((acc, end, endX) => {
                if (end === null) return acc;
                if (startX === endX && startY === endY) return { ...acc, [end]: [""] };
                return {
                  ...acc,
                  [end]: dfs(data, startX, endX, startY, endY),
                };
              }, {}),
            }),
            {},
          ),
        };
      }, {}),
    }),
    {},
  );
const keyboardPaths = getAllPaths(keyboard);
const keypadPaths = getAllPaths(keypad);

const memo = new Map();
const shortestPathAfterN = (path: string, n: number) => {
  if (n === 0) return path.length;

  const subpaths = path.split(/A+/).map((subpath) => subpath + "A");
  subpaths.pop();
  const aCount = path.match(/A/g)!.length - subpaths.length;

  let result = 0;
  for (const subpath of subpaths) {
    if (memo.has(n + subpath)) {
      result += memo.get(n + subpath);
      continue;
    }

    let possiblePaths = [""];
    let position = "A";
    for (const char of subpath) {
      possiblePaths = possiblePaths.flatMap((path): string[] =>
        keyboardPaths[position][char].map((next) => path + next + "A"),
      );
      position = char;
    }

    result += possiblePaths.reduce((acc, path) => {
      const pathLength = shortestPathAfterN(path, n - 1);
      if (pathLength < acc) {
        memo.set(n + subpath, pathLength);
        return pathLength;
      }
      return acc;
    }, Infinity);
  }

  result += aCount;
  return result;
};

const solve = (input: string[], n: number) => {
  return input
    .map((code) => {
      let paths = [""];
      let position = "A";
      for (const char of code) {
        paths = paths.flatMap((path): string[] =>
          keypadPaths[position][char].map((next) => path + next + "A"),
        );
        position = char;
      }

      return (
        paths.reduce((acc, path) => {
          const pathLength = shortestPathAfterN(path, n);
          if (pathLength < acc) return pathLength;
          return acc;
        }, Infinity) * Number.parseFloat(code)
      );
    })
    .reduce((a, b) => a + b, 0);
};

const part1 = (input: string[]): number => solve(input, 2);

const part2 = (input: string[]): number => solve(input, 25);

const example = `029A
980A
179A
456A
379A`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 126384,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 0,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
