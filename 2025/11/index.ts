import { run } from "@aockit/core";

const parseInput = (rawInput: string): Map<string, string[]> => {
  const parsed = rawInput
    .trim()
    .split("\n")
    .map((line) => {
      const [from, toS] = line.trim().split(":");
      const to = toS.trim().split(" ");
      return { from, to };
    });

  const map = new Map();
  for (const { from, to } of parsed) {
    map.set(from, to);
  }

  return map;
};

const waysToMemo = new Map<string, number>();

const waysTo = (from: string, to: string, map: Map<string, string[]>): number => {
  const key = `${from}|${to}`;
  if (waysToMemo.has(key)) return waysToMemo.get(key)!;

  if (from === to) return 1;
  if (from === "out") return 0;

  const total = map.get(from)!.reduce((acc, next) => acc + waysTo(next, to, map), 0);
  waysToMemo.set(key, total);

  return total;
};

const part1 = (map: Map<string, string[]>) => waysTo("you", "out", map);

const part2 = (map: Map<string, string[]>) =>
  waysTo("svr", "fft", map) * waysTo("fft", "dac", map) * waysTo("dac", "out", map) +
  waysTo("svr", "dac", map) * waysTo("dac", "fft", map) * waysTo("fft", "out", map);

const example = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;
const example2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 5,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example2,
      expected: 2,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
