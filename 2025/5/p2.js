(() => {
  const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`.trim();

  const parseInput = (input) => {
    let [ranges, ids] = input.split("\n\n");
    ranges = ranges.split("\n").map((i) => i.split("-").map((v) => parseInt(v)));
    ids = ids.split("\n").map((v) => parseInt(v));
    return { ranges, ids };
  };
  const merge = (ranges) => {
    ranges.sort((a, b) => a[0] - b[0]);
    const merged = [];

    for (let i = 0; i < ranges.length; i++) {
      let [start, end] = ranges[i];
      if (merged.at(-1)?.[1] >= end) continue;
      for (let j = i + 1; j < ranges.length; j++) {
        if (ranges[j][0] <= end) end = Math.max(end, ranges[j][1]);
      }
      merged.push([start, end]);
    }

    return merged;
  };

  let { ranges } = parseInput(input);
  ranges = merge(ranges);
  let dist = 0;
  for (const [a, b] of ranges) {
    dist += b - a + 1;
  }
  console.log(dist);
})();
