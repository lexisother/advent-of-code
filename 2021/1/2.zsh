#!/usr/bin/zsh

# CRUCIAL TODO: Move this to a C module!!!
function tripleSum {
    i="$1"
    print $(( ${@[$(( i - 1 ))]} + ${@[$(( i ))]} + ${@[$(( i + 1 ))]} ))
}

args=("${(@f)$(cat "input1.txt")}")

triples=()
for ((i=2; i < ${#args}; i++)); do
    triples+=("$(tripleSum $i $args)")
done

increase=0
for ((i=1; i < ${#triples}; i++)); do
    if [ "${triples[$i]}" -gt "${triples[$((i - 1))]}" ]; then
        increase=$(( increase + 1 ))
    fi
done

print $increase
