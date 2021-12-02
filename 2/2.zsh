#!/usr/bin/zsh

horizontal=0
vertical=0
aim=0

while IFS=' ' read -A args; do
  if [[ ${args[1]} == up* ]]; then
    print "up found, decrementing aim by ${args[2]}!"
    aim=$((aim - ${args[2]}))
    print "new value of aim: $aim"
  fi
  if [[ ${args[1]} == down* ]]; then
    print "down found, incrementing aim by ${args[2]}!"
    aim=$((aim + ${args[2]}))
    print "new value of aim: $aim"
  fi
  if [[ ${args[1]} == forward* ]]; then
    print "forward found, incrementing horizontal by ${args[2]}!"
    horizontal=$((horizontal + ${args[2]}))
    vertical=$((vertical + aim * ${args[2]}))
    print "new values: horizontal: $horizontal | vertical $vertical"
  fi
done < input2.txt

print $((vertical * horizontal))
