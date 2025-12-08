import { run } from "@aockit/core";

interface DistanceEntry {
  i: number;
  j: number;
  distance: number;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const parseInput = (rawInput: string): Vec3[] =>
  rawInput
    .trim()
    .split("\n")
    .map((l) => {
      const [x, y, z] = l.split(",").map((i) => parseInt(i));
      return { x, y, z };
    });

const distance = (a: Vec3, b: Vec3) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);

const calculateDistances = (input: Vec3[]): DistanceEntry[] => {
  const distances: DistanceEntry[] = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const dist = distance(input[i], input[j]);
      distances.push({ i, j, distance: dist });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);
  return distances;
};

const part1 = (input: Vec3[]) => {
  const distances = calculateDistances(input);
  const circuits: Set<number>[] = [];

  for (let k = 0; k < 1000; k++) {
    const { i, j } = distances[k];
    let circuitI = -1;
    let circuitJ = -1;

    for (let c = 0; c < circuits.length; c++) {
      if (circuits[c].has(i)) {
        circuitI = c;
        continue;
      }
      if (circuits[c].has(j)) {
        circuitJ = c;
        continue;
      }
    }

    if (circuitI === -1 && circuitJ === -1) {
      const newCircuit = new Set<number>();
      newCircuit.add(i);
      newCircuit.add(j);
      circuits.push(newCircuit);
    } else if (circuitI === circuitJ) {
      continue;
    } else if (circuitI !== -1 && circuitJ === -1) {
      circuits[circuitI].add(j);
    } else if (circuitI === -1 && circuitJ !== -1) {
      circuits[circuitJ].add(i);
    } else {
      const circuitToMerge = circuits[circuitJ];
      for (const item of circuitToMerge) {
        circuits[circuitI].add(item);
      }
      circuits.splice(circuitJ, 1);
    }
  }

  circuits.sort((a, b) => b.size - a.size);
  return circuits[0].size * circuits[1].size * circuits[2].size;
};

const part2 = (input: Vec3[]) => {
  const distances = calculateDistances(input);
  const circuits: Set<number>[] = [];
  let lastI = -1;
  let lastJ = -1;

  for (let k = 0; circuits[0]?.size !== input.length; k++) {
    const { i, j } = distances[k];
    lastI = i;
    lastJ = j;
    let circuitI = -1;
    let circuitJ = -1;

    for (let c = 0; c < circuits.length; c++) {
      if (circuits[c].has(i)) {
        circuitI = c;
        continue;
      }
      if (circuits[c].has(j)) {
        circuitJ = c;
        continue;
      }
    }

    if (circuitI === -1 && circuitJ === -1) {
      const newCircuit = new Set<number>();
      newCircuit.add(i);
      newCircuit.add(j);
      circuits.push(newCircuit);
    } else if (circuitI === circuitJ) {
      continue;
    } else if (circuitI !== -1 && circuitJ === -1) {
      circuits[circuitI].add(j);
    } else if (circuitI === -1 && circuitJ !== -1) {
      circuits[circuitJ].add(i);
    } else {
      const circuitToMerge = circuits[circuitJ];
      for (const item of circuitToMerge) {
        circuits[circuitI].add(item);
      }
      circuits.splice(circuitJ, 1);
    }
  }

  return input[lastI].x * input[lastJ].x;
};

run({
  part1: ({ input }) => part1(parseInput(input)),
  part2: ({ input }) => part2(parseInput(input)),
});
