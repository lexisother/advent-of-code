import * as fs from "fs";
const input = fs.readFileSync("input3.txt").toString().trim().split("\n");

// Create some copies of `input` for processing in the loops
let o2Input = [...input];
let co2Input = [...input];

// o2 loop
for (let i = 0; o2Input.length > 1; i++) {
  // Track the number of ones
  let ones = 0;
  for (let o2 of o2Input) {
    if (o2[i] === "1") {
      ones++;
    }
  }

  // Check if the number of ones is greater than or equal to the input length / 2.
  const sigBit = ones >= o2Input.length / 2 ? "1" : "0";

  for (let k = o2Input.length - 1; k >= 0; k--) {
    if (o2Input[k][i] !== sigBit) {
      o2Input.splice(k, 1);
    }
  }
}

// co2 loop
for (let i = 0; co2Input.length > 1; i++) {
  let ones = 0;
  for (let co2 of co2Input) {
    if (co2[i] === "1") {
      ones++;
    }
  }

  // Check if the number of ones is greater than or equal to the input length / 2.
  const sigBit = ones < co2Input.length / 2 ? "1" : "0";

  for (let k = co2Input.length - 1; k >= 0; k--) {
    if (co2Input[k][i] !== sigBit) {
      co2Input.splice(k, 1);
    }
  }
}

const co2 = parseInt(co2Input[0], 2);
const o2 = parseInt(o2Input[0], 2);
const result = co2 * o2;
console.log(result)
