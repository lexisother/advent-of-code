const checks = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const getNonIndex = (arr: string[], i: number): number => {
  while (i >= 0 && Number.isFinite(Number(arr[i]))) {
    i--;
  }
  return i;
};

const getNonIndex2 = (arr: string[], i: number): number => {
  while (i < arr.length && Number.isFinite(Number(arr[i]))) {
    i++;
  }
  return i;
};

export function sumRatioGenerator2000(input: string[][]): {
  sum: number;
  ratios: Map<string, number>;
} {
  const ratios = new Map();
  const hash = (i: number, j: number): string => `${String(i)}-${j}`;

  let sum = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (!Number.isFinite(Number(input[i][j]))) continue;
      if (
        checks
          .map(([a, b]) => [a + i, b + j])
          .map(([a, b]) => input[a]?.[b])
          .some((x) => x && x !== '.' && !Number.isFinite(Number(x)))
      ) {
        const A = checks.map(([a, b]) => [a + i, b + j]);
        const B = A.map(([a, b]) => input[a]?.[b]);
        const C = B.map((x) => x && x !== '.' && !Number.isFinite(Number(x)));
        const i_1 = getNonIndex(input[i], j);
        const i_2 = getNonIndex2(input[i], j);
        const num = input[i].slice(i_1 + 1, i_2);
        j = i_2 - 1;
        for (let d = 0; d < A.length; d++) {
          if (C[d]) {
            const a_hash = hash(A[d][0], A[d][1]);
            let val: number[];
            if (!ratios.has(a_hash)) {
              val = [];
              ratios.set(a_hash, val);
            } else {
              val = ratios.get(a_hash);
            }
            val.push(Number(num.join('')));
          }
        }
        sum += Number(num.join(''));
      }
    }
  }

  return { sum, ratios };
}
