import java.io.File
import kotlin.time.measureTimedValue

val keys = mutableListOf<MutableList<Int>>()
val locks = mutableListOf<MutableList<Int>>()
val empty = mutableListOf<Int>()

File("input.txt").readLines().fold('\u0000' to empty) { acc, line ->
    when {
        line.isEmpty() -> return@fold '\u0000' to empty
        acc.second === empty -> line.first() to mutableListOf<Int>()
            .also((if (line.startsWith('.')) keys else locks)::add)
        else -> acc
    }.also { (first, counts) ->
        for ((i, char) in line.withIndex()) {
            if (char == first) {
                if (i < counts.size) counts[i]++ else counts.add(1)
            }
        }
    }
}

fun part1() = keys.sumOf { key ->
    locks.count { lock ->
        key.zip(lock).all { it.first >= it.second }
    }
}

val (p1ans, p1time) = measureTimedValue {
    part1()
}

println("Part 1: $p1ans ($p1time)")
println("Merry Christmas!")
