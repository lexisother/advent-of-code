(() => {
  const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`
    .split("\n")
    .map((l) => l.trim());

  let safeReports = 0;
  for (const reportList of input) {
    const reports = reportList.split(" ");
    let lastNumber, areWeIncreasing, areWeDecreasing;
    console.log(`Working with report list ${reportList}`);
    let isUnsafe = false;
    for (let report of reports) {
      report = parseInt(report);

      if (!lastNumber) lastNumber = 0;
      else {
        console.log(`  Handling report ${report}, the last number was ${lastNumber}`);

        if (isUnsafe) {
          console.log(`    This report was already marked as unsafe. No need to continue further.`);
        }

        const distance = Math.abs(report - lastNumber);
        if (!isUnsafe && distance > 3) {
          console.log(`    Distance was bigger than three. Unsafe!`);
          isUnsafe = true;
        }
        if (!isUnsafe && distance === 0) {
          console.log(`    Distance was zero, meaning neither an increase or a decrease. Unsafe!`);
          isUnsafe = true;
        }

        // If we're decreasing...
        if (!isUnsafe && report < lastNumber) {
          console.log(`    ${report} < ${lastNumber}, so we are decreasing`);
          // and we've already marked to be increasing, this is unsafe.
          if (areWeIncreasing) {
            console.log(`    We've already marked to be increasing though! Unsafe!`);
            isUnsafe = true;
          }
          // if we're not increasing and haven't marked to be decreasing yet, make it so
          if (!areWeIncreasing && !areWeDecreasing) {
            console.log(
              `    We aren't increasing and haven't specified we're decreasing, so set areWeDecreasing`,
            );
            areWeDecreasing = true;
          }
          if (!isUnsafe) console.log(`    None of the checks were hit.`);
          // if we're actually decreasing, this is a safe report
        }
        // If we're increasing...
        if (!isUnsafe && report > lastNumber) {
          console.log(`    ${report} > ${lastNumber}, so we are increasing`);
          // and we've already decreasing, this is unsafe.
          if (areWeDecreasing) {
            console.log(`    We've already marked to be decreasing though! Unsafe!`);
            isUnsafe = true;
          }
          // if we're not decreasing and we haven't marked to be increasing yet, make it so
          if (!areWeDecreasing && !areWeIncreasing) {
            console.log(
              `    We aren't decreasing and haven't specified we're increasing, so set areWeIncreasing`,
            );
            areWeIncreasing = true;
          }
          if (!isUnsafe) console.log(`    None of the checks were hit.`);
        }
      }

      lastNumber = report;
    }

    if (!isUnsafe) {
      console.log(`  Report list was not marked as unsafe.`);
      safeReports++;
    }
  }

  console.log(`Done. Safe reports: ${safeReports}`);
})();
