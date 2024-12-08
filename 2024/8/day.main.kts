import java.io.File
import kotlin.time.measureTimedValue

val input = File("input.txt").readLines()
val height = input.size
val width = input.maxOfOrNull { it.length } ?: 0
val antennae = buildMap<Char, MutableList<IntPair>> {
    for ((y, line) in input.withIndex()) {
        for ((x, char) in line.withIndex()) {
            if (char != '.') getOrPut(char) { mutableListOf() }.add(y to x)
        }
    }
}

fun MutableCollection<IntPair>.addIfInRange(y: Int, x: Int): Boolean =
    if (y in 0..<height && x in 0..<width) {
        add(y to x)
        true
    } else false

fun solve(allMultiples: Boolean): Int = buildSet {
    for ((char, points) in antennae) {
        for (p0 in points) {
            for (p1 in points) {
                if (p0 == p1) continue
                val dy = p1.first - p0.first
                val dx = p1.second - p0.second
                if (!allMultiples) {
                    addIfInRange(p1.first + dy, p1.second + dx)
                } else {
                    var i = 0
                    while (addIfInRange(p1.first + i * dy, p1.second + i * dx)) i++
                }
            }
        }
    }
}.size

val (p1ans, p1time) = measureTimedValue {
    solve(false)
}
val (p2ans, p2time) = measureTimedValue {
    solve(true)
}

println("Part 1: $p1ans (${p1time.inWholeMilliseconds}ms)")
println("Part 2: $p2ans (${p2time.inWholeMilliseconds}ms)")

// I'd love to put this all in another file, but that breaks references.
// Four years and counting, unresolved issue: https://youtrack.jetbrains.com/issue/KTIJ-16352
data class IntPair(val first: Int, val second: Int)
infix fun Int.to(other: Int): IntPair = IntPair(this, other)