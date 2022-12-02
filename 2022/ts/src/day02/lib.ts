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

export function parse(other: string, you: string, p2: boolean = false): number {
  let score = 0;

  if (!p2) {
    // Rock vs paper
    if (other == 'A' && you == 'Y') score = points.chosen.paper + points.finish.win;

    // Rock vs scissors
    if (other == 'A' && you == 'Z') score = points.chosen.scissors + points.finish.loss;

    // Paper vs rock
    if (other == 'B' && you == 'X') score = points.chosen.rock + points.finish.loss;

    // Paper vs scissors
    if (other == 'B' && you == 'Z') score = points.chosen.scissors + points.finish.win;

    // Scissors vs rock
    if (other == 'C' && you == 'X') score = points.chosen.rock + points.finish.win;

    // Scissors vs paper
    if (other == 'C' && you == 'Y') score = points.chosen.paper + points.finish.loss;

    // Draws
    if (other == 'A' && you == 'X') score = points.chosen.rock + points.finish.draw;
    if (other == 'B' && you == 'Y') score = points.chosen.paper + points.finish.draw;
    if (other == 'C' && you == 'Z') score = points.chosen.scissors + points.finish.draw;
  } else {
    // X == lose
    // Y == draw
    // Z == win
    if (other == 'A' && you == 'X') score = points.chosen.scissors + points.finish.loss;
    if (other == 'A' && you == 'Y') score = points.chosen.rock + points.finish.draw;
    if (other == 'A' && you == 'Z') score = points.chosen.paper + points.finish.win;

    if (other == 'B' && you == 'X') score = points.chosen.rock + points.finish.loss;
    if (other == 'B' && you == 'Y') score = points.chosen.paper + points.finish.draw;
    if (other == 'B' && you == 'Z') score = points.chosen.scissors + points.finish.win;

    if (other == 'C' && you == 'X') score = points.chosen.paper + points.finish.loss;
    if (other == 'C' && you == 'Y') score = points.chosen.scissors + points.finish.draw;
    if (other == 'C' && you == 'Z') score = points.chosen.rock + points.finish.win;
  }

  return score;
}
