import { run } from "@aockit/core";
import { example } from "./example";

type Input = Map<string, Set<string>>;

const parseInput = (input: string): Input => {
  const connectionsMap = new Map();

  input
    .trim()
    .split("\n")
    .map((line) => line.split("-"))
    .forEach(([from, to]) => {
      if (!connectionsMap.has(from)) {
        connectionsMap.set(from, new Set());
      }
      connectionsMap.get(from)?.add(to);
      if (!connectionsMap.has(to)) {
        connectionsMap.set(to, new Set());
      }
      connectionsMap.get(to)?.add(from);
    });

  return connectionsMap;
};

const part1 = (input: Input): number => {
  const visited = new Set();

  input.forEach((tos, from) => {
    if (!from.startsWith("t")) return;

    tos.forEach((to1) => {
      tos.forEach((to2) => {
        if (to1 === to2) return;
        if (!input.get(to1)?.has(to2)) return;
        visited.add([from, to1, to2].sort().join("-"));
      });
    });
  });

  return visited.size;
};

const part2 = (input: Input): string => {
  const memo = new Map<string, string[]>();

  const maxClique = (clique: string[], possible: string[]) => {
    if (memo.has(clique.join(","))) return memo.get(clique.join(","))!;
    if (possible.length === 0) return clique;
    let max = clique;

    possible.forEach((computer) => {
      const newMax = maxClique(
        [...clique, computer].sort(),
        possible.filter((p) => input.get(computer)?.has(p)),
      );
      if (newMax.length > max.length) max = newMax;
    });

    memo.set(clique.join(","), max);
    return max;
  };

  let max: string[] = [];
  input.forEach((_, computer) => {
    const clique = maxClique([computer], [...input.get(computer)!]);
    if (clique.length > max.length) max = clique;
  });

  return max.join(",");
};

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 7,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: "co,de,ka,ta",
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
