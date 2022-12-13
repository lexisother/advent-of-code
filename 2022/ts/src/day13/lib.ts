import { Packet, SubPacket } from './types.js';

export function comparePackets(left: Packet, right: Packet) {
  return compareBothArrays(left, right);
}

export function compareSubPackets(left: SubPacket, right: SubPacket): -1 | 0 | 1 {
  if (typeof left === 'number' && typeof right === 'number') return compareBothNumbers(left, right);
  if (Array.isArray(left) && Array.isArray(right)) return compareBothArrays(left, right);
  if (Array.isArray(right)) return compareBothArrays([left], right);
  if (Array.isArray(left)) return compareBothArrays(left, [right]);

  throw new Error();
}

export function compareBothNumbers(left: number, right: number) {
  return left < right ? -1 : left === right ? 0 : 1;
}

export function compareBothArrays(left: Array<SubPacket>, right: Array<SubPacket>): -1 | 0 | 1 {
  while (left.length && right.length) {
    const leftPacket = left.shift()!;
    const rightPacket = right.shift()!;
    const res = compareSubPackets(leftPacket, rightPacket);
    if (res !== 0) {
      return res;
    }
  }
  if (left.length === 0 && right.length !== 0) return -1;
  if (right.length === 0 && left.length !== 0) return 1;
  return 0;
}

export function deepClone(obj: any) {
  if (obj === null) return null;
  let clone = { ...obj };
  Object.keys(clone).forEach(
    (key) => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]),
  );
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
}
