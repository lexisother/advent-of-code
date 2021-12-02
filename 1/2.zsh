#!/usr/bin/zsh

# CRUCIAL TODO: Move this to a C module!!!
function tripleSum {
    i="$1"
    print $(( ${@[$(( i - 1  ))]} + ${@[$(( i  ))]} + ${@[$(( i + 1  ))]}  ))
}

args=("${(@f)$(cat "input.txt")}")
print "Input: $args"

triples=()
for ((i=2; i < ${#args}; i++)); do
    triples+=("$(tripleSum $i $args)")
done
print "Triples: $triples"

increase=0
for ((i=1; i < ${#triples}; i++)); do
    if [ "${triples[$i]}" -gt "${triples[$((i - 1))]}" ]; then
        print "${triples[$i]} is greater than ${triples[$(( i - 1 ))]}, incrementing"
        increase=$(( increase + 1 ))
        print "new value is $increase"
    fi
done
