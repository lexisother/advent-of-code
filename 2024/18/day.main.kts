import java.io.File
import java.util.LinkedList
import java.util.Queue
import kotlin.time.measureTimedValue

val WIDTH = 71
val HEIGHT = 71
val BYTES = 1024

val input = File("input.txt").readLines()

val grid = Array(HEIGHT) { CharArray(WIDTH) { '.' } }
for (i in 0 until BYTES) {
    val (x, y) = input[i].split(",").map(String::toInt)
    grid[y][x] = '#'
}

val (p1ans, p1time) = measureTimedValue {
    bfs(grid)
}

val (p2ans, p2time) = measureTimedValue {
    var out = ""

    for (i in BYTES until input.size) {
        val (x, y) = input[i].split(",").map(String::toInt)
        grid[y][x] = '#'

        if (bfs(grid) == Int.MAX_VALUE) {
            out = input[i]
            break
        }
    }

    out
}

println("Part 1: $p1ans (${p1time.inWholeMilliseconds}ms)")
println("Part 2: $p2ans (${p2time.inWholeMilliseconds}ms)")

fun bfs(grid: Array<CharArray>): Int {
    val start = Pair(0, 0)
    val end = Pair(WIDTH - 1, HEIGHT - 1)

    val directions = listOf(
        Pair(0, -1),
        Pair(1, 0),
        Pair(0, 1),
        Pair(-1, 0)
    )

    val visited = mutableSetOf<Pair<Int, Int>>()
    val queue: Queue<Triple<Int, Int, Int>> = LinkedList()
    queue.add(Triple(start.first, start.second, 0))

    while (queue.isNotEmpty()) {
        val (x, y, steps) = queue.remove()

        if (x == end.first && y == end.second) {
            return steps
        }

        for ((dx, dy) in directions) {
            val nx = x + dx
            val ny = y + dy

            if (nx < 0 || ny < 0 || nx >= WIDTH || ny >= HEIGHT) continue

            if (grid[ny][nx] == '#') continue

            val nextPos = Pair(nx, ny)
            if (nextPos in visited) continue

            visited.add(nextPos)
            queue.add(Triple(nx, ny, steps + 1))
        }
    }

    return Int.MAX_VALUE
}
