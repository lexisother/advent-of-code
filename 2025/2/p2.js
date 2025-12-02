(() => {
  const input = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;

  function* range(start, stop, step = 1) {
    if (stop == null) {
      // one param defined
      stop = start;
      start = 0;
    }

    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      yield i;
    }
  }

  let incorrectIds = [];
  for (const rng of input.split(",")) {
    const [, l, r] = rng.match(/(\d+)-(\d+)/);

    for (const i of range(parseInt(l), parseInt(r) + 1)) {
      for (const j of range(1, 10)) {
        const match = i.toString().match(new RegExp("(\\d{" + j + "})\\1+"));
        if (match && match[0] === i.toString() && !incorrectIds.includes(match[0])) {
          incorrectIds.push(match[0]);
        }
      }
    }
  }

  incorrectIds = incorrectIds.map((v) => parseInt(v));
  console.log(incorrectIds.reduce((acc, i) => (acc += i)));
})();
