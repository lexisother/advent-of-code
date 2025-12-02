(() => {
  const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

  function* range(start, stop, step = 1) {
    if (stop == null) {
      stop = start;
      start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      yield i;
    }
  }
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  let incorrectIds = [];
  for (const rng of input.split(",")) {
    const [, l, r] = rng.match(/(\d+)-(\d+)/);

    for (const i of range(parseInt(l), parseInt(r) + 1)) {
      let arr = i
        .toString()
        .split("")
        .map((v) => parseInt(v));
      let fHalf = arr.splice(0, Math.floor(arr.length / 2));

      if (arraysEqual(fHalf, arr)) {
        incorrectIds.push(parseInt(fHalf.concat(arr).join("")));
      }
    }
  }

  console.log(incorrectIds.reduce((acc, i) => (acc += i)));
})();
