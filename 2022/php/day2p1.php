<?php
function debug(mixed $content) {
    echo "<pre>";
    var_dump($content);
    echo "</pre>";
}
$input = file_get_contents("aoc-input.txt");
$lines = explode("\n", $input);

$total = 0;
foreach ($lines as $line) {
    $game = explode(" ", trim($line));
    $outcome = parseGame($game[0], $game[1]);
    $total += $outcome;
}

debug($total);

/**
 * Parse a game and retrieve the score.
 *
 * @param string $other
 * @param string $you
 * @return number
 */
function parseGame(string $other, string $you): int {
    $points = new stdClass();
    $points->chosen = new stdClass();
    $points->chosen->rock = 1;
    $points->chosen->paper = 2;
    $points->chosen->scissors = 3;
    $points->finish = new stdClass();
    $points->finish->loss = 0;
    $points->finish->draw = 3;
    $points->finish->win = 6;

    $score = 0;

    if ($other == 'A' && $you == 'Y')
        $score = $points->chosen->paper + $points->finish->win;
    if ($other == 'A' && $you == 'Z')
        $score = $points->chosen->scissors + $points->finish->loss;

    if ($other == 'B' && $you == 'X')
        $score = $points->chosen->rock + $points->finish->loss;
    if ($other == 'B' && $you == 'Z')
        $score = $points->chosen->scissors + $points->finish->win;

    if ($other == 'C' && $you == 'X')
        $score = $points->chosen->rock + $points->finish->win;
    if ($other == 'C' && $you == 'Y')
        $score = $points->chosen->paper + $points->finish->loss;

    if ($other == 'A' && $you == 'X')
        $score = $points->chosen->rock + $points->finish->draw;
    if ($other == 'B' && $you == 'Y')
        $score = $points->chosen->paper + $points->finish->draw;
    if ($other == 'C' && $you == 'Z')
        $score = $points->chosen->scissors + $points->finish->draw;

    return $score;
}
