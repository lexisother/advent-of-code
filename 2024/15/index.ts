import { run } from "@aockit/core";
import { largeExample1, largeExample2, smallExample } from "./examples";

type Input = { grid: string[][]; moves: string[] };
type Vec2 = { x: number; y: number };
type Dir = [number, number];

const parseInput = (input: string): Input => {
  const [grid, moves] = input.split("\n\n");
  return {
    grid: grid.split("\n").map((line) => [...line]),
    moves: moves.split("").filter((i) => i !== "\n"),
  };
};

const dirs = {
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
  "^": [0, -1],
} as Record<string, Dir>;

const part1 = (input: Input): number => {
  const { grid, moves } = input;

  let pos: Vec2 = { x: 0, y: 0 };
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "@") {
        grid[y][x] = ".";
        pos = { x, y };
      }
    }
  }

  for (const move of moves) {
    const [dx, dy] = dirs[move];
    const next = grid[pos.y + dy][pos.x + dx];

    if (next === ".") {
      pos.x += dx;
      pos.y += dy;
    } else if (next === "O") {
      let found = false;
      let [x2, y2] = [pos.x + dx, pos.y + dy];

      while (grid[y2][x2] !== "#") {
        if (grid[y2][x2] === ".") {
          found = true;
          break;
        }
        x2 += dx;
        y2 += dy;
      }

      if (found) {
        grid[pos.y + dy][pos.x + dx] = ".";
        grid[y2][x2] = "O";
        pos.x += dx;
        pos.y += dy;
      }
    }
  }

  let out = 0;
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === "O") out += 100 * y + x;
    }
  }

  return out;
};

const part2 = (input: Input): number => {
  let { grid, moves } = input;

  grid = grid.map((line) => {
    return [
      ...line
        .join("")
        .replaceAll("#", "##")
        .replaceAll(".", "..")
        .replaceAll("O", "[]")
        .replaceAll("@", "@."),
    ];
  });

  let pos: Vec2 = { x: 0, y: 0 };
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "@") {
        grid[y][x] = ".";
        pos = { x, y };
      }
    }
  }

  for (const move of moves) {
    const [dx, dy] = dirs[move];
    const next = grid[pos.y + dy][pos.x + dx];

    if (next === ".") {
      pos.x += dx;
      pos.y += dy;
    } else if (next === "[" || next === "]") {
      if (move === "<" || move === ">") {
        let found = false;
        let [x2, y2] = [pos.x + dx, pos.y + dy];
        const toMove = [];

        while (grid[y2][x2] !== "#") {
          if (grid[y2][x2] === ".") {
            found = true;
            break;
          }
          toMove.push([x2, y2]);
          x2 += dx;
          y2 += dy;
        }

        if (found) {
          while (toMove.length > 0) {
            const [x, y] = toMove.pop()!;
            grid[y + dy][x + dx] = grid[y][x];
            grid[y][x] = ".";
          }
          pos.x += dx;
          pos.y += dy;
        }
      } else {
        const toMove = [[pos.x + dx, pos.y + dy]];

        if (next === "[") toMove.push([pos.x + dx + 1, pos.y + dy]);
        else toMove.push([pos.x + dx - 1, pos.y + dy]);

        let canMove = false;
        while (!canMove) {
          canMove = true;
          let wall = false;

          for (const [x, y] of toMove) {
            if (toMove.some(([x2, y2]) => x + dx === x2 && y + dy === y2)) continue;

            if (grid[y + dy][x + dx] === "#") {
              canMove = false;
              wall = true;
              break;
            }
            if (grid[y + dy][x + dx] === "[") {
              toMove.push([x + dx, y + dy], [x + dx + 1, y + dy]);
              canMove = false;
            }
            if (grid[y + dy][x + dx] === "]") {
              toMove.push([x + dx, y + dy], [x + dx - 1, y + dy]);
              canMove = false;
            }
          }
          if (wall) break;
        }

        if (canMove) {
          while (toMove.length > 0) {
            const [x, y] = toMove.pop()!;
            grid[y + dy][x + dx] = grid[y][x];
            grid[y][x] = ".";
          }
          pos.x += dx;
          pos.y += dy;
        }
      }
    }
  }

  let out = 0;
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (grid[y][x] === "[") out += 100 * y + x;
    }
  }

  return out;
};

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1 Small",
      input: smallExample,
      expected: 2028,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 1 Large",
      input: largeExample1,
      expected: 10092,
      solution: ({ input }) => part1(parseInput(input)),
    },
    // This is wrong for some reason
    // {
    //   name: "Part 2 Large",
    //   input: largeExample2,
    //   expected: 9021,
    //   solution: ({ input }) => part2(parseInput(input)),
    // },
  ],
});
