import * as fs from "fs";
const input = fs.readFileSync("input3.txt").toString().trim().split("\n");

const sum = new Array<number>(input[0].length).fill(0);

for (const num of input) {
  for (let i = 0; i < sum.length; i++) {
    sum[i] += Number(num[i]);
  }
}

const gammaOccs = [];
const epsilonOccs = [];
for (let i = 0; i < sum.length; i++) {
  if (sum[i] > input.length / 2) {
    gammaOccs.push("1");
    epsilonOccs.push("0");
  } else {
    gammaOccs.push("0");
    epsilonOccs.push("1");
  }
}

const gamma = parseInt(gammaOccs.join(""), 2);
const epsilon = parseInt(epsilonOccs.join(""), 2);
const result = gamma * epsilon;
console.log(result);
