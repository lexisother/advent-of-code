import { run } from "@aockit/core";

type RuleMap = Record<string, Set<string>>;
type Input = [RuleMap, string[][]];

// Sour taste in my mouth over this one, I kinda lost track of how I wanted to
// format this data halfway through. First time in a while since I've used a Set
// and honestly it's not even required, this could be done a million times
// better :DDDDD
const parseInput = (input: string): Input => {
  let [rules, updates] = input.split("\n\n");
  const rulePairs = rules.split("\n").map((l) => l.split("|"));
  const updateLines = updates.split("\n").map((l) => l.split(","));

  // construct the big set of sorting rules
  const map: Record<string, Set<string>> = {};
  for (const [a, b] of rulePairs) {
    if (a in map) map[a].add(b);
    else map[a] = new Set([b]);
  }

  // what is this, golang?
  return [map, updateLines];
};

// check if a list of updates is valid against the map of sorting rules
const isValid = (map: RuleMap, update: string[]): number | false => {
  for (let i = 0; i < update.length - 1; i++) {
    const set = map[update[i]] ?? new Set();
    if (!set.has(update[i + 1])) return i;
  }
  return false;
};

// middle numbers of correct update lists
const part1 = (input: Input): number => {
  const [map, updates] = input;
  let total = 0;

  for (const update of updates) {
    if (isValid(map, update) === false) {
      total += parseInt(update[Math.floor(update.length / 2)]);
    }
  }

  return total;
};

// middle numbers of incorrect lists after ordering said lists, and JUST those lists.
// advent of reading comprehension, people.
const part2 = (input: Input): number => {
  const [map, updates] = input;
  let total = 0;

  for (const update of updates) {
    // what the fuck am i even doing HOW DO I CLEAN THIS UP
    // my brain is not braining today
    let valid = isValid(map, update);
    if (valid === false) continue;
    while (valid !== false) {
      const temp = update[valid];
      update[valid] = update[valid + 1];
      update[valid + 1] = temp;
      valid = isValid(map, update);
    }
    total += parseInt(update[Math.floor(update.length / 2)]);
  }

  return total;
};

const example = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),

  tests: [
    {
      name: "Part 1",
      input: example,
      expected: 143,
      solution: ({ input }) => part1(parseInput(input)),
    },
    {
      name: "Part 2",
      input: example,
      expected: 123,
      solution: ({ input }) => part2(parseInput(input)),
    },
  ],
});
