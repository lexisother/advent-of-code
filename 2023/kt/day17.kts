import java.util.PriorityQueue

val input = System.`in`.bufferedReader().readLines().mapNotNull { it.filter(('1'..'9')::contains).ifEmpty { null } }

enum class Direction {
    U, L, D, R;
    operator fun plus(other: Int): Direction = entries[(ordinal + other).mod(entries.size)]
    operator fun minus(other: Int): Direction = entries[(ordinal - other).mod(entries.size)]
}

data class State(
    val y: Int,
    val x: Int,
    val direction: Direction,
    val distance: Int,
) {
    fun move(direction: Direction): State {
        val y = when (direction) {
            Direction.U -> y - 1
            Direction.D -> y + 1
            else -> y
        }
        val x = when (direction) {
            Direction.L -> x - 1
            Direction.R -> x + 1
            else -> x
        }
        return State(
            y = y,
            x = x,
            direction = direction,
            distance = if (direction == this.direction) distance + 1 else 1,
        )
    }
}

fun bfs(
    ok: (distance: Int) -> Boolean,
    next: (direction: Direction, distance: Int) -> Iterable<Direction>,
): Int? {
    val start = State(0, 0, Direction.R, 0)
    val costs = mutableMapOf(start to 0)
    val queue = PriorityQueue<IndexedValue<State>>(compareBy { (cost, state) -> cost - state.y - state.x })
    queue.add(IndexedValue(0, start))
    while (!queue.isEmpty()) {
        val (cost, state) = queue.remove()
        if (state.y == input.lastIndex && state.x == input.last().lastIndex && ok(state.distance)) return cost
        if (costs.getValue(state) < cost) continue
        for (direction in next(state.direction, state.distance)) {
            val newState = state.move(direction)
            if (newState.y !in input.indices || newState.x !in input[state.y].indices) continue
            val newCost = cost + input[newState.y][newState.x].digitToInt()
            if (costs.getOrElse(newState) { Int.MAX_VALUE } <= newCost) continue
            costs[newState] = newCost
            queue.add(IndexedValue(newCost, newState))
        }
    }
    return null
}

var p1: Int? = bfs(
    ok = { true },
    next = { direction, distance ->
        if (distance < 3) listOf(direction - 1, direction + 1, direction) else listOf(direction - 1, direction + 1)
    }
)

var p2: Int? = bfs(
    ok = { it >= 4 },
    next = { direction, distance ->
        when {
            distance < 4 -> listOf(direction)
            distance < 10 -> listOf(direction - 1, direction + 1, direction)
            else -> listOf(direction - 1, direction + 1)
        }
    },
)

println(listOf(p1, p2))