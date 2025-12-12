import { run } from "@aockit/core";

interface Input {
  packageAreas: number[];
  parsedAreas: {
    width: number;
    height: number;
    items: number[];
  }[];
}

const parseInput = (rawInput: string): Input => {
  const split = rawInput.trim().split("\n\n");

  const packageShapes = split.slice(0, -1);
  const areas = split.at(-1)!.split("\n");

  const packageAreas = packageShapes.map((packageShape) => {
    return packageShape.match(/#/g)?.length || 0;
  });

  const parsedAreas = areas.map((area) => {
    const match = area.match(/^(\d+)x(\d+): (.+)$/);
    if (!match) throw new Error("Invalid area format");

    const width = parseInt(match[1]!, 10);
    const height = parseInt(match[2]!, 10);
    const items = match[3]!.split(" ").map((item) => parseInt(item, 10));

    return { width, height, items };
  });

  return { packageAreas, parsedAreas };
};

const part1 = (input: Input) => {
  const { packageAreas, parsedAreas } = input;

  const filtered = parsedAreas.filter(({ width, height, items }) => {
    const availableArea = width * height;
    const requiredArea = items.reduce((sum, item, index) => sum + packageAreas[index]! * item, 0);
    return availableArea >= requiredArea;
  });

  return filtered.length;
};

const example = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;

run({
  part1: ({ input }) => part1(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 2,
      solution: ({ input }) => part1(parseInput(input)),
    },
  ],
});
