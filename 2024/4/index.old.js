const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`.trim().split("\n");

let p1 = 0,
  p2 = 0,
  w = 0,
  h = 0,
  x,
  y;

for (; h < input[0].length; h++);
w = input.length;

for (y = 0; y < h; y++) {
  for (x = 0; x < w; x++) {
    if (input[y][x] == 'X') {
        p1 += x+3 <= w-1 && input[y][x+1] == 'M' && input[y][x+2] == 'A' && input[y][x+3] == 'S';
        p1 += x-3 >= 0 && input[y][x-1] == 'M' && input[y][x-2] == 'A' && input[y][x-3] == 'S';
        p1 += y+3 <= h-1 && input[y+1][x] == 'M' && input[y+2][x] == 'A' && input[y+3][x] == 'S';
        p1 += y-3 >= 0 && input[y-1][x] == 'M' && input[y-2][x] == 'A' && input[y-3][x] == 'S';
        p1 += x+3 <= w-1 && y+3 <= h-1 &&
                  input[y+1][x+1] == 'M' && input[y+2][x+2] == 'A' && input[y+3][x+3] == 'S';
        p1 += x-3 >= 0 && y-3 >= 0 &&
                  input[y-1][x-1] == 'M' && input[y-2][x-2] == 'A' && input[y-3][x-3] == 'S';
        p1 += x+3 <= w-1 && y-3 >= 0 &&
                  input[y-1][x+1] == 'M' && input[y-2][x+2] == 'A' && input[y-3][x+3] == 'S';
        p1 += x-3 >= 0 && y+3 <= h-1 &&
                  input[y+1][x-1] == 'M' && input[y+2][x-2] == 'A' && input[y+3][x-3] == 'S';
    }
    else if (input[y][x] == 'A' && x > 0 && x < w-1 && y > 0 && y < h-1) {
        p2 += ((input[y-1][x-1] == 'M' && input[y+1][x+1] == 'S') ||
                 (input[y-1][x-1] == 'S' && input[y+1][x+1] == 'M')) &&
                ((input[y-1][x+1] == 'M' && input[y+1][x-1] == 'S') ||
                 (input[y-1][x+1] == 'S' && input[y+1][x-1] == 'M'));
    }
  }
}

console.log(p1, p2)