/**
 * Counts up items in a list split by empty items.
 *
 * @param {string[]} arr
 * @returns {number[]} Array of per-split totals.
 */
export default function count(arr: string[]): number[] {
  let counts = [];
  let counter = 0;
  for (var i = 0; i < arr.length; i++) {
    let line = arr[i];
    if (line == '') {
      counts.push(counter);
      counter = 0;
    } else {
      counter += parseInt(line);
    }
  }

  return counts;
}
