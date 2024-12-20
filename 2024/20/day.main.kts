import java.io.File
import kotlin.math.abs
import kotlin.time.measureTimedValue

val comparator = compareBy(IntPair::first, IntPair::second)

val path = buildSet {
    val input = File("input.txt").readLines()
    var position = input.withIndex().firstNotNullOf { (y, line) ->
        val x = line.indexOf("S")
        if (x < 0 ) null else y to x
    }
    add(position)

    do {
        position = position.adjacencies().single { next ->
            val (y, x) = next
            y in input.indices && x in input[y].indices && input[y][x] != '#' && add(next)
        }
    } while (input[position.first][position.second] != 'E')
}.withIndex().sortedWith(compareBy(comparator) { it.value })

fun solve(cheats: Int, time: Int): Int {
    var count = 0

    for (i in path.indices) {
        val (t1, pos1) = path[i]
        val limit = pos1.first + cheats to pos1.second

        for (j in i + 1..<path.size) {
            val (t2, pos2) = path[j]
            if (comparator.compare(pos2, limit) > 0) break
            val distance = abs(pos2.first - pos1.first) + abs(pos2.second - pos1.second)
            if (distance <= cheats && distance + time <= abs(t2 - t1)) count++
        }
    }

    return count
}

val (p1ans, p1time) = measureTimedValue {
    solve(2, 100)
}
val (p2ans, p2time) = measureTimedValue {
    solve(20, 100)
}

println("Part 1: $p1ans (${p1time.inWholeMilliseconds}ms)")
println("Part 2: $p2ans (${p2time.inWholeMilliseconds}ms)")

data class IntPair(val first: Int, val second: Int)
infix fun Int.to(other: Int): IntPair = IntPair(this, other)
fun IntPair.adjacencies() =
    arrayOf(first - 1 to second, first to second - 1, first to second + 1, first + 1 to second)
