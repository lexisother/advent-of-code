import java.io.File
import kotlin.time.measureTimedValue

val input = File("input.txt").readText()
val oneHundredAndSevenThousandThreeHundredAndThirtySixStones = buildMap {
    for (word in input.splitToSequence("""\s+""".toRegex())) {
        incBy(word.toLongOrNull() ?: continue, 1)
    }
}

fun solve(n: Int): Long {
    var counts = oneHundredAndSevenThousandThreeHundredAndThirtySixStones
    repeat(n) {
        counts = buildMap {
            for ((num, count) in counts) {
                if (num == 0L) {
                    incBy(1, count)
                } else {
                    val string = num.toString()
                    if (string.length % 2 == 0) {
                        incBy(string.take(string.length / 2).toLong(), count)
                        incBy(string.drop(string.length / 2).toLong(), count)
                    } else {
                        incBy(2024 * num, count)
                    }
                }
            }
        }
    }
    return counts.values.sum()
}

val (p1ans, p1time) = measureTimedValue {
    solve(25)
}
val (p2ans, p2time) = measureTimedValue {
    solve(75)
}

println("Part 1: $p1ans (${p1time.inWholeMilliseconds}ms)")
println("Part 2: $p2ans (${p2time.inWholeMilliseconds}ms)")

fun <K> MutableMap<K, Long>.incBy(key: K, value: Long) =
    put(key, getOrElse(key) { 0 } + value)