#!/usr/bin/zsh

horizontal=0
vertical=0

while IFS=' ' read -A args; do
  if [[ ${args[1]} == up* ]]; then
    horizontal=$((horizontal - ${args[2]}))
  fi
  if [[ ${args[1]} == down* ]]; then
    horizontal=$((horizontal + ${args[2]}))
  fi
  if [[ ${args[1]} == forward* ]]; then
    vertical=$((vertical + ${args[2]}))
  fi
done < input2.txt

print $((vertical * horizontal))
