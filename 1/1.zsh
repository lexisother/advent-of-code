#!/usr/bin/zsh

args=("${(@f)$(cat "input1.txt")}")
print $args
increase=0

for ((i=1; i < ${#args}; i++)); do
    if [ "${args[$i]}" -gt "${args[$((i - 1))]}" ]; then
        increase=$((increase + 1))
    fi
done

print "Final value: $increase"
