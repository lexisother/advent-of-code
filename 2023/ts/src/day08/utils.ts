export interface GraphNode {
  L: string;
  R: string;
}
export type Graph = Record<string, GraphNode>;

export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

export const createGraph = (input: string[]): Graph => {
  const G: Graph = {};
  for (let i = 2; i < input.length; i++) {
    const dest = input[i].match(/(\((.+)\))/)![2].split(', ');
    G[input[i].split(' = ')[0]] = { L: dest[0], R: dest[1] };
  }
  return G;
};

export const getSteps = (G: Graph, I: string[], current: GraphNode): number => {
  let i = 0;
  while (true) {
    const dir = I[i % I.length] as 'L' | 'R';
    const next = current[dir];
    if (next.split('')[2] === 'Z') return i + 1;
    current = G[next];
    i++;
  }
};
