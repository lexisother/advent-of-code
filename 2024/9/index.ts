import { run } from "@aockit/core";

interface Block {
  id: number;
  file: number;
  free: number;
  written: boolean;
}

const parseInput = (input: string): Block[] => {
  return new Array(Math.ceil(input.length / 2)).fill({}).map((_, index) => {
    const file = parseInt(input[index * 2] ?? 0);
    const free = parseInt(input[index * 2 + 1] ?? 0);
    return { id: index, file, free, written: false };
  });
};

const part1 = (input: Block[]): number => {
  let out = 0;
  let index = 0;
  while (input.length > 0) {
    const { id, file, free } = input.shift()!;
    for (let i = 0; i < file; i++) {
      out += id * index++;
    }
    for (let i = 0; i < free; i++) {
      if (input.length === 0) break;
      const last = input.at(-1)!;
      out += last.id * index++;
      last.file--;
      if (last.file === 0) input.pop();
    }
  }
  return out;
};

const part2 = (input: Block[]): number => {
  let out = 0;
  let index = 0;
  while (input.length > 0) {
    let { id, file, free, written } = input.shift()!;
    if (!written) {
      for (let i = 0; i < file; i++) {
        out += id * index++;
      }
    } else index += file;

    let last = input.findLast(({ file, written }) => file <= free && !written);
    while (last != null) {
      for (let i = 0; i < last.file; i++) {
        out += last.id * index++;
      }
      free -= last.file;
      last.written = true;
      if (input.at(-1)!.written) input.pop();
      last = input.findLast(({ file, written }) => file <= free && !written);
    }
    index += free;
  }
  return out;
};

const example = `2333133121414131402`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 1928,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 2858,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
