import { run } from "@aockit/core";

interface Vec2 {
  x: number;
  y: number;
}

const parseInput = (rawInput: string): Vec2[] =>
  rawInput
    .trim()
    .split("\n")
    .map((l) => {
      const [x, y] = l.split(",").map((i) => parseInt(i));
      return { x, y };
    });

const squareArea = (a: Vec2, b: Vec2) => (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);

const doesCrossSquare = (a: Vec2, b: Vec2, sqA: Vec2, sqB: Vec2) => {
  const minX = Math.min(sqA.x, sqB.x) + 1;
  const maxX = Math.max(sqA.x, sqB.x) - 1;
  const minY = Math.min(sqA.y, sqB.y) + 1;
  const maxY = Math.max(sqA.y, sqB.y) - 1;

  if (a.x === b.x) {
    if (a.x < minX || a.x > maxX) return false;
    if (a.y < minY && b.y < minY) return false;
    if (a.y > maxY && b.y > maxY) return false;
    return true;
  }
  if (a.y === b.y) {
    if (a.y < minY || a.y > maxY) return false;
    if (a.x < minX && b.x < minX) return false;
    if (a.x > maxX && b.x > maxX) return false;
    return true;
  }

  return false;
};

const part1 = (input: Vec2[]) => {
  let maxArea = 0;

  for (const pointA of input) {
    for (const pointB of input) {
      maxArea = Math.max(maxArea, squareArea(pointA, pointB));
    }
  }

  return maxArea;
};

const part2 = (input: Vec2[]) => {
  let maxArea = 0;

  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const area = squareArea(input[i], input[j]);
      if (area > maxArea) {
        let crosses = false;
        for (let k = 0; k < input.length; k++) {
          const l = (k + 1) % input.length;
          if (doesCrossSquare(input[k], input[l], input[i], input[j])) {
            crosses = true;
            break;
          }
        }

        if (!crosses) {
          maxArea = area;
        }
      }
    }
  }

  return maxArea;
};

const example = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 50,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 24,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
