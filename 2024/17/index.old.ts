import { run } from "@aockit/core";

type State = { registers: bigint[]; program: number[] };

const parseInput = (input: string): State => {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.split(/:\s*/)[1]);

  return {
    registers: lines.slice(0, 3).map(BigInt),
    program: lines.at(-1)!.split(",").map(Number),
  };
};

function exec({ registers, program }: State) {
  const output = [];
  let ip = 0;
  while (ip < program.length) {
    const opcode = program[ip++];
    const literal = program[ip++];
    const combo = literal <= 3 ? BigInt(literal) : registers[literal - 4];
    switch (opcode) {
      case 0: // adv
        registers[0] = registers[0] >>= combo;
        break;
      case 1: // bxl
        registers[1] ^= BigInt(literal);
        break;
      case 2: //bxt
        registers[1] = combo & 7n;
        break;
      case 3: // jnz
        if (registers[0] !== 0n) ip = literal;
        break;
      case 4: //bxc
        registers[1] ^= registers[2];
        break;
      case 5: // out
        output.push(Number(combo & 7n));
        break;
      case 6: // bdv
        registers[1] = registers[0] >> combo;
        break;
      case 7: // cdv
        registers[2] = registers[0] >> combo;
        break;
    }
  }
  return output;
}

const part1 = (input: State): string => {
  return exec(input).join(",");
};

const example = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;

run({
  part1: ({ input }) => part1(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: "4,6,3,5,6,3,5,2,1,0",
      solution: ({ input }) => part1(parseInput(input)),
    },
  ],
});
