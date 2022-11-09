#!/usr/bin/zsh

input=("${(@f)$(cat "input3.txt")}")

for ((row=0; row < 9; row++)); do
  print "Selecting row $row"
  declare -A counts_$row=()
  declare max_$row=0
  declare ans_$row=0
  for ((line=1; line < ${#input}; line++)); do
    selected="${input[$line]}"
    print "Selecting line $line: $selected"
    char="${selected:$row:1}"
    print "Selected char: $char"
    if (( ++counts_$row[char] > max_$row )); then
      declare max_$row="$counts_$row"
      declare ans_$row="$char"
    fi
  done

  eval "print Answer for row $row: \$ans_$row"
done
