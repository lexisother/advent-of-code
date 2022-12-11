import { Input, Operation, Test } from './types.js';

export function evaluateOperation(operation: Operation, item: bigint): bigint {
  const left = operation.left === 'old' ? item : operation.left;
  const right = operation.right === 'old' ? item : operation.right;
  if (operation.op === '+') return left + right;
  return left * right;
}

export function evaluateTest(test: Test, worryLevel: bigint): string {
  if (worryLevel % test.module === 0n) return test.true;
  return test.false;
}

export function calculateLCM(...arr: bigint[]): bigint {
  const gcd = (x: bigint, y: bigint): bigint => (!y ? x : gcd(y, x % y));
  const lcm = (x: bigint, y: bigint): bigint => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => lcm(a, b));
}

export function parse(input: string): Input {
  return new Map(
    input
      .trim()
      .split('\n\n')
      .map((lines) => {
        const [infoLine, itemsLine, operationLine, testLine, testTrueLine, testFalseLine] = lines
          .trim()
          .split('\n', 6);
        const id = infoLine.match(/Monkey (?<id>\d+):/)?.groups?.id!;
        const items = itemsLine
          .split(': ', 2)
          .at(-1)
          ?.split(' ')
          .map((item) => BigInt(parseInt(item, 10)))!;
        const operation = operationLine.match(
          /new = (?<left>old|\d+) (?<op>[+*]) (?<right>old|\d+)/,
        )?.groups!;
        const test = BigInt(testLine.match(/divisible by (?<number>\d+)/)?.groups?.number!);
        const trueBranch = testTrueLine.match(/throw to monkey (?<id>\d+)/)?.groups?.id!;
        const falseBranch = testFalseLine.match(/throw to monkey (?<id>\d+)/)?.groups?.id!;
        return [
          id,
          {
            id,
            items,
            operation: {
              op: operation.op,
              left: /old/.test(operation.left) ? 'old' : BigInt(operation.left),
              right: /old/.test(operation.right) ? 'old' : BigInt(operation.right),
            } as Operation,
            test: { module: test, true: trueBranch, false: falseBranch },
          },
        ];
      }),
  );
}
