import java.util.Stack
import kotlin.math.max

val input = System.`in`.bufferedReader().readLines()

val n = input.size
val m = input[0].length
val si = 0
val sj = input[si].indexOf(".")
val ti = input.size - 1
val tj = input[ti].indexOf(".")

data class Position(val i: Int, val j: Int) {
    operator fun plus(other: Position): Position = Position(i + other.i, j + other.j)
}

data class StackPosition(val v: Int, val weight: Int, val visited: List<Int>)

val nextSteps = mapOf(
    '.' to listOf(
        Position(-1, 0),
        Position(1, 0),
        Position(0, 1),
        Position(0, -1)
    ),
    '>' to listOf(Position(0, 1)),
    '<' to listOf(Position(0, -1)),
    '^' to listOf(Position(-1, 0)),
    'v' to listOf(Position(1, 0))
)

val slides = mapOf(
    '>' to Position(0, 1),
    '<' to Position(0, -1),
    '^' to Position(-1, 0),
    'v' to Position(1, 0)
)

fun longestPath(reverse: Boolean): Int {
    val stack = ArrayDeque<Position>()
    stack.add(Position(si, sj))
    val outgoingPositions = mutableMapOf<Int, MutableSet<Position>>()
    val weights = mutableMapOf<Int, Int>()
    val tileToVertex = mutableMapOf<Position, Int>()
    var current = 0

    while (stack.isNotEmpty()) {
        val pos = stack.removeFirst()
        if (tileToVertex.contains(pos)) continue

        val substack = Stack<Position>()
        substack.add(pos)
        val visited = mutableSetOf<Position>()
        while (substack.isNotEmpty()) {
            val p = substack.removeFirst()
            if (visited.contains(p)) continue
            visited.add(p)

            for (d in nextSteps[input[p.i][p.j]]!!) {
                val next = p + d
                if (next.i in 0 until n && next.j in 0 until m) {
                    when (input[next.i][next.j]) {
                        '.' -> substack.push(next)
                        '>', 'v', '<', '^' -> {
                            val slided = next + slides[input[next.i][next.j]]!!
                            if (!visited.contains(slided)) {
                                outgoingPositions.putIfAbsent(current, mutableSetOf())
                                outgoingPositions[current]!!.add(slided)
                                stack.add(slided)
                            }
                        }
                    }
                }
            }
        }
        weights[current] = visited.size
        for (v in visited) tileToVertex[v] = current
        current++
    }

    val out = outgoingPositions.mapValues { it.value.map { tileToVertex[it]!! } }
    val incoming = mutableMapOf<Int, MutableList<Int>>()
    for (u in 0 until current) {
        for (v in out[u] ?: emptySet()) {
            incoming.putIfAbsent(v, mutableListOf())
            incoming[v]!!.add(u)
        }
    }

    val startVertex = 0
    val targetVertex = tileToVertex[Position(ti, tj)]!!

    val vertexStack = ArrayDeque<StackPosition>()
    vertexStack.add(StackPosition(startVertex, weights[startVertex]!!, listOf(startVertex)))
    var maxWeight = 0
    while (vertexStack.isNotEmpty()) {
        with(vertexStack.removeFirst()) {
            if (v == targetVertex) {
                maxWeight = max(weight, maxWeight)
            } else {
                for (u in out[v] ?: emptyList()) {
                    if (!visited.contains(u)) {
                        vertexStack.add(StackPosition(u, weight + 1 + weights[u]!!, visited + u))
                    }
                }
                if (reverse) {
                    for (u in incoming[v] ?: emptyList()) {
                        if (!visited.contains(u)) {
                            vertexStack.add(StackPosition(u, weight + 1 + weights[u]!!, visited + u))
                        }
                    }
                }
            }
        }
    }

    return maxWeight - 1
}

val p1 = longestPath(false)
val p2 = longestPath(true)

println(listOf(p1, p2))