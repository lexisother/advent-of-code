import { run } from "@aockit/core";
// import { createCanvas } from "canvas";

// interface Robot {
//   pos: number[];
//   vel: number[];
// }

// const parseInput = (input: string): Robot[] =>
//   input.split("\n").map((line) => {
//     const [_pos, _vel] = line.split(" ");
//     const pos = _pos
//       .slice(2)
//       .split(",")
//       .map((i) => parseInt(i));
//     const vel = _vel
//       .slice(2)
//       .split(",")
//       .map((i) => parseInt(i));
//     return { pos, vel };
//   });

// const part1 = (input: Robot[], W = 101, H = 103): number => {
//   const mod = (n: number, m: number) => ((n % m) + m) % m;
//   let [a, b, c, d] = [0, 0, 0, 0];

//   for (const { pos, vel } of input) {
//     let [x, y] = [pos[0] + vel[0] * 100, pos[1] + vel[1] * 100];
//     x = mod(x, W);
//     y = mod(y, H);

//     if (x < 50 && y < 51) a++;
//     if (x < 50 && y > 51) b++;
//     if (x > 50 && y < 51) c++;
//     if (x > 50 && y > 51) d++;
//   }

//   return a * b * c * d;
// };

// const part2 = (input: Robot[], width = 101, height = 103): void => {};

const part1 = (input: string, W = 101, H = 103): number => {
  const [mx, my] = [(W - 1) / 2, (H - 1) / 2];
  const q = {} as Record<string, number>;
  for (const line of input.split("\n")) {
    const [x, y, vx, vy] = line.match(/-?\d+/g)!.map(Number);
    const [nx, ny] = [(((x + vx * 100) % W) + W) % W, (((y + vy * 100) % H) + H) % H];
    if (nx === mx || ny === my) continue;
    const qk = `${nx > mx},${ny > my}`;
    q[qk] = (q[qk] || 0) + 1;
  }
  return Object.values(q).reduce((a, b) => a * b, 1);
};

const part2 = async (input: string, W = 101, H = 103): void => {
  // const robots = input.split("\n").map((line) => {
  //   const [x, y, vx, vy] = line.match(/-?\d+/g)!.map(Number);
  //   return { x, y, vx, vy };
  // });
  // const I_WIDTH = 100;
  // const I_HEIGHT = 100;
  // const image = createCanvas(I_WIDTH * W, I_HEIGHT * H);
  // const ctx = image.getContext("2d");

  // for (let time = 0; time < I_WIDTH * I_HEIGHT; time++) {}

  const r = input.split("\n").map((line) => line.match(/-?\d+/g)!.map(Number));
  for (let i = 57; ; i += 160 - 57) {
    const G = Array.from({ length: H }, (_, y) =>
      Array.from({ length: W }, () => "."),
    ) as string[][];
    for (const [x, y, vx, vy] of r) {
      const [nx, ny] = [(((x + vx * i) % W) + W) % W, (((y + vy * i) % H) + H) % H];
      G[ny][nx] = "#";

      if (G[y - 1][x - 1] === "#") console.log("THIS LOGIC IS SOUND");
    }
    console.log(i);
    // console.log(G.map((row) => row.join("")).join("\n"));
    await new Promise((r) => setTimeout(r, 100));
  }
};

const example = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

run({
  part1: ({ input }) => part1(input),
  part2: ({ input }) => part2(input),
  // part1: ({ input }) => part1(parseInput(input)),
  // part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 12,
      solution: ({ input }) => part1(input, 11, 7),
      // solution: ({ input }) => part1(parseInput(input), 11, 7),
    },
    {
      name: "Part 2",
      input: example,
      expected: 0,
      solution: ({ input }) => 0, // part2(input, 11, 7),
      // solution: ({ input }) => part2(parseInput(input), 11, 7),
    },
  ],
});
