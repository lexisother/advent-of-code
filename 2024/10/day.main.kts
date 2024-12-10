import java.io.File
import kotlin.time.measureTimedValue

//val input = File("input.txt").readText()
val input = File("input.txt").readLines()
val levels = List(10) { mutableSetOf<IntPair>() }
for ((y, line) in input.withIndex()) {
    for ((x, char) in line.withIndex()) {
        if (char.isDigit()) levels[char.digitToInt()].add(y to x)
    }
}

fun <T> bfs(start: (IntPair) -> T, plus: (T, T) -> T): Map<IntPair, T> =
    levels.subList(1, 10).fold(levels[0].associateWith(start)) { acc, points ->
        buildMap {
            for ((key, value) in acc) {
                for (point in key.adj) {
                    if (point in points) {
                        put(point, if (contains(point)) plus(value, getValue(point)) else value)
                    }
                }
            }
        }
    }

val (p1ans, p1time) = measureTimedValue {
    bfs(::setOf, Set<IntPair>::plus).values.sumOf { it.size }
}
val (p2ans, p2time) = measureTimedValue {
    bfs({ 1 }, Int::plus).values.sum()
}

println("Part 1: $p1ans (${p1time.inWholeMilliseconds}ms)")
println("Part 2: $p2ans (${p2time.inWholeMilliseconds}ms)")

// I'd love to put this all in another file, but that breaks references.
// Four years and counting, unresolved issue: https://youtrack.jetbrains.com/issue/KTIJ-16352
data class IntPair(val first: Int, val second: Int)
infix fun Int.to(other: Int): IntPair = IntPair(this, other)
val IntPair.adj: List<IntPair>
    get() = listOf(
        first - 1 to second,
        first to second - 1,
        first to second + 1,
        first + 1 to second
    )