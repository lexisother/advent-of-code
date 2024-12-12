import { run } from "@aockit/core";
import { calculatePerimeter, countStraightSections, findRegions } from "./utils";

const parseInput = (input: string): string[][] =>
  input
    .trim()
    .split("\n")
    .map((row) => [...row]);

const part1 = (input: string[][]): number => {
  const regions = findRegions(input);
  return regions.reduce((sum, region) => sum + region.points.size * calculatePerimeter(region), 0);
};

const part2 = (input: string[][]): number => {
  const regions = findRegions(input);

  return regions.reduce(
    (sum, region) => sum + region.points.size * countStraightSections(region),
    0,
  );
};

const example = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 1930,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 1206,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
