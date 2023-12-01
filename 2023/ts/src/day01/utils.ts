import { reverse } from '../utils/index.js';
import { map, map_r, regex, regex_r } from './constants.js';

export function getValue(line: string): number {
  let answers = line.match(regex)!;
  let answers_r = reverse(line).match(regex_r)!;

  let first = answers[0];
  let last = answers_r[0];
  if (first.length !== 1) first = map[first];
  if (last.length !== 1) last = map_r[last];
  let str = first + last;
  return parseInt(str, 10);
}
