import kotlin.math.max
import kotlin.math.min

val grid = System.`in`.bufferedReader().readLines()
val bigRows = grid.indices.filter { !grid[it].contains('#') }.toSet()
val gridT = transpose(grid)
val bigCols = gridT.indices.filter { !gridT[it].contains('#') }.toSet()

fun transpose(grid: List<String>) = grid[0].indices.map { j -> grid.indices.map { i -> grid[i][j] }.toString() }

fun distances(grid: List<String>, length: Long): Long {
    val galaxies = mutableListOf<Pair<Int, Int>>()
    var result = 0L

    for (i in grid.indices) {
        for (j in grid[i].indices) {
            if (grid[i][j] == '#') {
                for ((otherI, otherJ) in galaxies) {
                    val rowDistance = (min(i, otherI) until max(i, otherI)).sumOf {
                        if (bigRows.contains(it)) length else 1
                    }
                    val colDistance  = (min(j, otherJ) until max(j, otherJ)).sumOf {
                        if (bigCols.contains(it)) length else 1
                    }
                    result += rowDistance + colDistance
                }
                galaxies.add(Pair(i, j))
            }
        }
    }

    return result
}

println(listOf(distances(grid, 2), distances(grid, 1000000)))
