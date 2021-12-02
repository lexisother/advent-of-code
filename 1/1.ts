import * as fs from 'fs';

const input = fs.readFileSync('input1.txt').toString().split('\n');

let increase = 1;

for (let i = 1; i < input.length; i++) {
  console.log(`${i} / ${input.length}`);
  if (input[i] > input[i - 1]) {
    console.log(`${input[i]} is greater than ${input[i - 1]}, incrementing`);
    increase += 1;
    console.log(`new value is ${increase}`);
  } else {
    console.log(`${input[i]} is less than ${input[i - 1]}, skipping`);
  }
}

console.log(increase);
