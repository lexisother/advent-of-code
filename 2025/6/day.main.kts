import java.io.File
import kotlin.time.measureTimedValue

val input = File("input.txt")
    .readText()
    .trimIndent()
    .lines()

fun part1(): Long {
    val ops = input.last().filter { it != ' ' }.toList()
    val nums = List(ops.size) { mutableListOf<Long>() }

    for (line in input.dropLast(1)) {
        line.longs().forEachIndexed { i, l -> nums[i] += l }
    }

    return ops.withIndex().sumOf {
        when (it.value) {
            '+' -> nums[it.index].sum()
            '*' -> nums[it.index].times()
            else -> error("unsupported op")
        }
    }
}

fun part2(): Long {
    val indices = 0..(input.size - 2)
    val nums = mutableListOf<Long>()
    var sum = 0L
    val ops = input.last()
    var x = ops.lastIndex
    while (x >= 0) {
        nums += indices.map { input[it][x] }.joinToString("").trim().toLong()
        val op = ops[x--]
        sum += when (op) {
            '+' -> nums.sum()
            '*' -> nums.times()
            else -> continue
        }
        nums.clear()
        // skip over empty column
        x--
    }
    return sum
}

val (p1ans, p1time) = measureTimedValue {
    part1()
}

val (p2ans, p2time) = measureTimedValue {
    part2()
}

println("Part 1: $p1ans ($p1time)")
println("Part 2: $p2ans ($p2time)")

fun String.longs() = Regex("""-?\d+""").findAll(this).map { it.value.toLong() }.toList()
fun List<Long>.times() = reduce(Long::times)
