#!/usr/bin/zsh

horizontal=0
vertical=0

while IFS=' ' read -A args; do
  if [[ ${args[1]} == up* ]]; then
    print "up found, decrementing by ${args[2]}!"
    horizontal=$((horizontal - ${args[2]}))
    print "new value: $horizontal"
  fi
  if [[ ${args[1]} == down* ]]; then
    print "down found, incrementing by ${args[2]}!"
    horizontal=$((horizontal + ${args[2]}))
    print "new value: $horizontal"
  fi
  if [[ ${args[1]} == forward* ]]; then
    print "forward found, incrementing by ${args[2]}!"
    vertical=$((vertical + ${args[2]}))
    print "new value: $vertical"
  fi
done < input2.txt

print $((vertical * horizontal))
