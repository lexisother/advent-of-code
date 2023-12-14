export function rotate(mirror: string[]): string[] {
  let rot: string[][] = [];
  let w = mirror[0].length;
  for (let y = 0; y < w; y++) {
    rot.push(new Array(mirror.length).fill(0));
  }
  mirror.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) rot[w - x - 1][y] = row[x];
  });
  return rot.map((row) => row.join(''));
}

export function reflects(mirror: string[], x: number, delta = false): number | true {
  let r = true;
  let d = 0;
  mirror.forEach((row, _) => {
    let a = row.substring(0, x);
    let b = row.substring(x);
    let min = Math.min(a.length, b.length);
    let a1 = a.split('').reverse().join('').substring(0, min);
    let b1 = b.substring(0, min);
    if (a1 !== b1) {
      r = false;
      for (let i = 0; i < min; i++) {
        d += a1[i] !== b1[i] ? 1 : 0;
      }
    }
  });
  return delta ? d : r;
}

export function getReflection(mirror: string[]): number {
  for (let x = 1; x < mirror[0].length; x++) {
    if (reflects(mirror, x)) return x;
  }
  return 0;
}

export function getSmudge(mirror: string[]): number {
  for (let x = 1; x < mirror[0].length; x++) {
    if (reflects(mirror, x, true) == 1) return x;
  }
  return 0;
}
