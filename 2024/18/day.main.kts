import java.io.File
import kotlin.time.measureTimedValue

data class Node(val x: Int, val y: Int, val next: Node? = null)

val size = 70
val input = File("input.txt").readLines().mapNotNull { line ->
    val x = line.substringBefore(",").toIntOrNull() ?: return@mapNotNull null
    val y = line.substringAfter(",").toIntOrNull() ?: return@mapNotNull null
    x to y
}.toList()

fun findPath(obstacles: Iterable<IntPair>): Set<IntPair>? {
    val visited = obstacles.toMutableSet()
    val queue = ArrayDeque<Node>()
    queue.add(Node(0, 0))

    while(queue.isNotEmpty()) {
        val node = queue.removeFirst()
        val (x, y) = node

        if (x == size && y == size) return generateSequence(node) { it.next }.map { it.x to it.y }.toSet()
        if (!visited.add(x to y)) continue
        if (x > 0) queue.addLast(Node(x - 1, y, node))
        if (y > 0) queue.addLast(Node(x, y - 1, node))
        if (y < size) queue.addLast(Node(x, y + 1, node))
        if (x < size) queue.addLast(Node(x + 1, y, node))
    }

    return null
}

val (p1ans, p1time) = measureTimedValue {
    findPath(input.subList(0, 1024))?.size?.minus(1)
}
val (p2ans, p2time) = measureTimedValue {
    var i = 0
    while (i < input.size) {
        val path = findPath(input.subList(0, i + 1)) ?: return@measureTimedValue input[i].let { (x, y) -> "$x,$y" }
        do i++ while (i < input.size && input[i] !in path)
    }
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