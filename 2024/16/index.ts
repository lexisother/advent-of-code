import { run } from "@aockit/core";
import { END_NODE, example, example2, START_NODE } from "./constants";
import { Direction, Node, Point } from "./types";
import { getPossibleNodesToMove, isPointSameAs, movePoint, nodeToString } from "./utils";

const parseInput = (input: string): string[][] => input.split("\n").map((line) => line.split(""));

const setup = (input: string[][]) => {
  const startNode: Node = {
    pos: { x: 0, y: 0 },
    direction: Direction.RIGHT,
    cost: 0,
    path: new Set<string>(),
  };
  const endNode: Point = { x: 0, y: 0 };

  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === START_NODE) movePoint(startNode.pos, { x, y });
      if (input[y][x] === END_NODE) movePoint(endNode, { x, y });
    }
  }

  return { startNode, endNode };
};

const part1 = (input: string[][]): number => {
  const { startNode, endNode } = setup(input);

  const seen: Set<string> = new Set<string>();
  const queue: Node[] = [];

  queue.push(startNode);

  let out = 0;
  while (queue.length) {
    const node = queue.shift()!;
    seen.add(nodeToString(node));

    if (isPointSameAs(node.pos, endNode)) {
      out = node.cost;
      break;
    }

    const possibleMoves = getPossibleNodesToMove(node, input).filter(
      (node) => !seen.has(nodeToString(node)),
    );
    possibleMoves.sort((a, b) => a.cost - b.cost);

    if (possibleMoves.length) queue.push(...possibleMoves);
    queue.sort((a, b) => a.cost - b.cost);
  }

  return out;
};

const part2 = (input: string[][]): number => {
  const { startNode, endNode } = setup(input);

  const seen: Set<string> = new Set<string>();
  const queue: Node[] = [];
  const possiblePaths: Node[] = [];
  let minimumCost = Infinity;

  queue.push(startNode);

  while (queue.length) {
    const node = queue.shift()!;
    seen.add(nodeToString(node));

    if (node.cost > minimumCost) continue;

    if (isPointSameAs(node.pos, endNode)) {
      minimumCost = node.cost;
      possiblePaths.push(node);
      continue;
    }

    const possibleMoves = getPossibleNodesToMove(node, input, true).filter(
      (node) => !seen.has(nodeToString(node)),
    );
    possibleMoves.sort((a, b) => a.cost - b.cost);

    if (possibleMoves.length) queue.push(...possibleMoves);
    queue.sort((a, b) => a.cost - b.cost);
  }

  return new Set(possiblePaths.map((node) => [...node.path, node.pos.toString()]).flat()).size;
};

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1 Small",
      input: example,
      expected: 7036,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 1 Large",
      input: example2,
      expected: 11048,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2 Small",
      input: example,
      expected: 45,
      solution: ({ input }) => part2(parseInput(input)),
    },
    {
      name: "Part 2 Large",
      input: example2,
      expected: 64,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
