interface PrioritySet {
  [key: string]: number;
}

export function getPriorities(): { lowp: PrioritySet; highp: PrioritySet } {
  let lowp: PrioritySet = {};
  let highp: PrioritySet = {};
  let low = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let high = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = 1; i < low.length + 1; i++) {
    lowp[low[i - 1]] = i;
  }
  let i = 27;
  for (let j = 0; j < high.length; j++) {
    highp[high[j]] = i;
    i++;
  }

  return { lowp, highp };
}
