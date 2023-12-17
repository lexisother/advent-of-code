val input = System.`in`.bufferedReader().readLines()

data class Point(val x: Int, val y: Int) {
    fun plus(other: Point) = Point(x + other.x, y + other.y)
}
data class Beam(val position: Point, val direction: Point)
data class Obstacle(val position: Point, val character: Char)

val obstacles = parseObstacles()

private fun getStartingBeams(): List<Beam> {
    val startingBeams = buildList {
        for (x in input.indices) {
            add(Beam(position = Point(x, -1), direction = Point(0, 1)))
            add(Beam(position = Point(x, input[x].length), direction = Point(0, -1)))
        }
        for (y in input.first().indices) {
            add(Beam(position = Point(-1, y), direction = Point(1, 0)))
            add(Beam(position = Point(input.size, y), direction = Point(-1, 0)))
        }
    }
    return startingBeams
}

fun Beam.getNumberOfEnergizedTiles(): Int {

    val visited = mutableSetOf<Beam>()

    val queue = ArrayDeque<Beam>()
    queue.add(this)

    while (queue.isNotEmpty()) {
        val beam = queue.removeFirst()

        val newPosition = beam.position.plus(beam.direction)

        if (newPosition.x !in input.indices || newPosition.y !in input.first().indices) continue

        val newDirections: List<Point> = obstacles
            .firstOrNull { obstacle -> obstacle.position == newPosition }
            ?.let { (_, character) ->
                buildList {
                    when (character) {
                        '/' -> add(Point(-beam.direction.y, -beam.direction.x))
                        '\\' -> add(Point(beam.direction.y, beam.direction.x))
                        '|' -> {
                            add(Point(-beam.direction.y, 0)) // split 1
                            add(Point(beam.direction.y, 0))  // split 2
                            add(Point(beam.direction.x, 0)) // former direction
                        }

                        '-' -> {
                            add(Point(0, -beam.direction.x)) // split 1
                            add(Point(0, beam.direction.x))  // split 2
                            add(Point(0, beam.direction.y)) // former direction
                        }
                    }
                }
            }
            ?.filterNot { it == Point(0, 0) }
            ?: listOf(beam.direction) // former direction

        newDirections.forEach { newDirection ->
            Beam(position = newPosition, direction = newDirection)
                .takeUnless { it in visited }
                ?.also {
                    queue.add(it)
                    visited.add(it)
                }
        }

    }

    return visited.map { it.position }.toSet().size
}

fun parseObstacles() =
    buildList {
        for (x in input.indices) {
            for (y in input[x].indices) {
                val char = input[x][y]
                if (char != '.') {
                    add(Obstacle(position = Point(x, y), character = char))
                }
            }
        }
    }

var p1 = Beam(position = Point(0, -1), direction = Point(0, 1)).getNumberOfEnergizedTiles()
var p2 = getStartingBeams().maxOf { beam -> beam.getNumberOfEnergizedTiles() }

println(listOf(p1, p2))