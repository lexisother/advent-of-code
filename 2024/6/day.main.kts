@file:DependsOn("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.9.0")

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.asFlow
import kotlinx.coroutines.flow.count
import kotlinx.coroutines.flow.drop
import kotlinx.coroutines.flow.filter
import kotlinx.coroutines.flow.flatMapMerge
import kotlinx.coroutines.flow.flowOf
import java.io.File

val input = File("input.txt").readLines()
val initialPosition = input.withIndex().firstNotNullOf { (y, line) ->
    val x = line.indexOf("^")
    if (x >= 0) y to x else null
}
val initialWalk: Set<IntPair> by lazy(LazyThreadSafetyMode.PUBLICATION) {
    input.walk(initialPosition).mapTo(mutableSetOf()) { it.first }
}

println("Part 1: " + initialWalk.size)

// async because we're using a flow to compute our amount
runBlocking {
    launch {
        @OptIn(ExperimentalCoroutinesApi::class)
        val amountOfLoopPositions = initialWalk.asFlow().drop(1).flatMapMerge { (y, x) ->
            val lines = input.toMutableList()
            lines[y] = StringBuilder(lines[y]).apply { set(x, '#') }.toString()
            flowOf(Unit).filter { !lines.walk(initialPosition).all(mutableSetOf<Any?>()::add) }
        }
        println("Part 2: " + amountOfLoopPositions.count())
    }
}

// I'd love to put this all in another file, but that breaks references.
// Four years and counting, unresolved issue: https://youtrack.jetbrains.com/issue/KTIJ-16352
data class IntPair(val first: Int, val second: Int)
infix fun Int.to(other: Int): IntPair = IntPair(this, other)

fun List<String>.walk(position: IntPair) = sequence {
    var (y, x) = position
    var dy = -1
    var dx = 0

    while (true) {
        yield(Pair(y to x, dy to dx))
        val nextY = y + dy
        val nextX = x + dx
        when (getOrNull(nextY)?.getOrNull(nextX)) {
            null -> break
            '#' -> dy = dx.also { dx = -dy }
            else -> {
                y = nextY
                x = nextX
            }
        }
    }
}
