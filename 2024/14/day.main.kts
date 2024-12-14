import java.io.File
import kotlin.time.measureTimedValue

val WIDTH = 101
val HEIGHT = 103
val pattern = """p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)""".toRegex()

data class Robot(val x: Int, val y: Int, val vx: Int, val vy: Int)

val robots = File("input.txt").readLines().mapNotNull {
    val (x, y, vx, vy) = pattern.matchEntire(it)?.destructured ?: return@mapNotNull null
    Robot(x.toInt(), y.toInt(), vx.toInt(), vy.toInt())
}.toList()

fun part1(width: Int = WIDTH, height: Int = HEIGHT): Int {
    val quadrants = IntArray(4)

    for (robot in robots) {
        val x = (robot.x + robot.vx * 100).mod(width)
        val y = (robot.y + robot.vy * 100).mod(height)

        quadrants[
            (if (x < width / 2) 0 else if (x > width / 2) 1 else continue) or
                    if (y < height / 2) 0 else if (y > height / 2) 2 else continue
        ]++
    }

    return quadrants.fold(1, Int::times)
}

fun part2() = (0..<WIDTH * HEIGHT).map { t ->
    val positions = robots.mapTo(mutableSetOf()) { robot ->
        (robot.x + robot.vx * t).mod(WIDTH) to (robot.y + robot.vy * t).mod(HEIGHT)
    }.sortedWith(compareBy(IntPair::second, IntPair::first))
    var consecutive = 1
    var maxConsecutive = 0

    for ((i, pos) in positions.withIndex()) {
        if (pos.first + 1 to pos.second == positions.getOrNull(i + 1)) {
            consecutive++
        } else {
            maxConsecutive = maxOf(consecutive, maxConsecutive)
            consecutive = 1
        }
    }

    t to maxConsecutive
}.maxBy(IntPair::second).first

val (p1ans, p1time) = measureTimedValue {
    part1()
}
val (p2ans, p2time) = measureTimedValue {
    part2()
}

println("Part 1: $p1ans (${p1time})")
println("Part 2: $p2ans (${p2time})")

data class IntPair(val first: Int, val second: Int)
infix fun Int.to(other: Int): IntPair = IntPair(this, other)