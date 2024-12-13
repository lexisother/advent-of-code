import { run } from "@aockit/core";

const parseInput = (input: string): string[] => input.trim().split("\n\n");

const constructGameLists = (input: string[]): Record<string, Record<string, bigint>[]> => {
  const games = input.map((gameStr) => {
    const [Ax, Ay, Bx, By, Px, Py] = gameStr.match(/\d+/g)!.map(BigInt)!;
    return { Ax, Ay, Bx, By, Px, Py };
  });

  const games2 = games.map((game) => ({
    ...game,
    Px: game.Px + 10000000000000n,
    Py: game.Py + 10000000000000n,
  }));

  return { games, games2 };
};

const solveGame = ({ Ax, Ay, Bx, By, Px, Py }: Record<string, bigint>) => {
  if ((Py * Ax - Px * Ay) % (By * Ax - Bx * Ay) !== 0n) return 0n;
  const b = (Py * Ax - Px * Ay) / (By * Ax - Bx * Ay);
  if ((Px - b * Bx) % Ax !== 0n) return 0n;
  const a = (Px - b * Bx) / Ax;
  return a * 3n + b;
};

const part1 = (input: string[]): bigint => {
  const { games } = constructGameLists(input);

  return games
    .map(solveGame)
    .filter((s) => s)
    .reduce((acc, game) => acc + game, 0n);
};

const part2 = (input: string[]): bigint => {
  const { games2 } = constructGameLists(input);

  return games2
    .map(solveGame)
    .filter((s) => s)
    .reduce((acc, game) => acc + game, 0n);
};

const example = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      // @ts-expect-error aockit doesn't like bigints
      expected: 480n,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      // @ts-expect-error aockit doesn't like bigints
      expected: 875318608908n,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
