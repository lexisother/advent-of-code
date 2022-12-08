export function lookUp(x: number, y: number, input: number[][], height: number): number {
  if (y === 0) {
    return 1;
  }
  let closesTaller = input
    .slice(0, y)
    .reverse()
    .findIndex((row) => row.at(x)! >= height);
  if (closesTaller === -1) {
    closesTaller = y - 1;
  }
  return closesTaller + 1;
}

export function lookLeft(x: number, y: number, input: number[][], height: number): number {
  if (x === 0) {
    return 1;
  }
  let closestTaller = input
    .at(y)!
    .slice(0, x)
    .reverse()
    .findIndex((other) => other >= height);
  if (closestTaller === -1) {
    closestTaller = x - 1;
  }
  return closestTaller + 1;
}

export function lookRight(x: number, y: number, input: number[][], height: number): number {
  if (x === input[0].length - 1) {
    return 1;
  }
  let closestTaller = input
    .at(y)!
    .slice(x + 1)
    .findIndex((other) => other >= height);
  if (closestTaller === -1) {
    closestTaller = input[0].length - x - 2;
  }
  return closestTaller + 1;
}

export function lookDown(x: number, y: number, input: number[][], height: number): number {
  if (y === input.length - 1) {
    return 1;
  }
  let closesTaller = input.slice(y + 1).findIndex((row) => row.at(x)! >= height);
  if (closesTaller === -1) {
    closesTaller = input.length - y - 2;
  }
  return closesTaller + 1;
}
