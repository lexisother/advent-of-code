export const points = {
  chosen: {
    rock: 1,
    paper: 2,
    scissors: 3,
  },
  finish: {
    loss: 0,
    draw: 3,
    win: 6,
  },
};

export function parse(
  other: string,
  you: string,
  p2: boolean = false,
): { win: boolean; loss: boolean; draw: boolean; score: number } {
  console.log(other, you);
  let score = 0;
  let win = false;
  let draw = false;
  let loss = false;

  if (!p2) {
    // Rock vs paper
    if (other == 'A' && you == 'Y') {
      console.log(`game score: ${points.chosen.paper + points.finish.win}`);
      score = points.chosen.paper + points.finish.win;
      win = true;
    }

    // Rock vs scissors
    if (other == 'A' && you == 'Z') {
      score = points.chosen.scissors + points.finish.loss;
      console.log(`game score: ${points.chosen.scissors + points.finish.loss}`);
      loss = true;
    }

    // Paper vs rock
    if (other == 'B' && you == 'X') {
      score = points.chosen.rock + points.finish.loss;
      console.log(`game score: ${points.chosen.rock + points.finish.loss}`);
      loss = true;
    }

    // Paper vs scissors
    if (other == 'B' && you == 'Z') {
      score = points.chosen.scissors + points.finish.win;
      console.log(`game score: ${points.chosen.scissors + points.finish.win}`);
      win = true;
    }

    // Scissors vs rock
    if (other == 'C' && you == 'X') {
      score = points.chosen.rock + points.finish.win;
      console.log(`game score: ${points.chosen.rock + points.finish.win}`);
      win = true;
    }

    // Scissors vs paper
    if (other == 'C' && you == 'Y') {
      score = points.chosen.paper + points.finish.loss;
      console.log(`game score: ${points.chosen.paper + points.finish.loss}`);
      loss = true;
    }

    // Draws
    if (other == 'A' && you == 'X') {
      score = points.chosen.rock + points.finish.draw;
      console.log(`game score: ${points.chosen.rock + points.finish.draw}`);
      draw = true;
    }
    if (other == 'B' && you == 'Y') {
      score = points.chosen.paper + points.finish.draw;
      console.log(`game score: ${points.chosen.paper + points.finish.draw}`);
      draw = true;
    }
    if (other == 'C' && you == 'Z') {
      score = points.chosen.scissors + points.finish.draw;
      console.log(`game score: ${points.chosen.scissors + points.finish.draw}`);
      draw = true;
    }

    // HAHAHA, BIG MISTAKE
    // if (other == you) {
    //   switch (you) {
    //     case 'X':
    //       score = points.chosen.rock + points.finish.draw;
    //       console.log(`game score: ${points.chosen.rock + points.finish.draw}`);
    //       break;
    //     case 'Y':
    //       score = points.chosen.paper + points.finish.draw;
    //       console.log(`game score: ${points.chosen.paper + points.finish.draw}`);
    //       break;
    //     case 'Z':
    //       score = points.chosen.scissors + points.finish.draw;
    //       console.log(`game score: ${points.chosen.scissors + points.finish.draw}`);
    //       break;
    //   }
    //   draw = true;
    // }
  }

  return { win, loss, draw, score };
}
