#!/usr/bin/zsh

horizontal=0
vertical=0
aim=0

while IFS=' ' read -A args; do
  if [[ ${args[1]} == up* ]]; then
    aim=$((aim - ${args[2]}))
  fi
  if [[ ${args[1]} == down* ]]; then
    aim=$((aim + ${args[2]}))
  fi
  if [[ ${args[1]} == forward* ]]; then
    horizontal=$((horizontal + ${args[2]}))
    vertical=$((vertical + aim * ${args[2]}))
  fi
done < input2.txt

print $((vertical * horizontal))
