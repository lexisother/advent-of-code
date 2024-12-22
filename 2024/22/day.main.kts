import java.io.File
import kotlin.time.measureTimedValue

val seeds = File("input.txt").readLines().mapNotNull { it.toIntOrNull() }

fun step(secret: Int): Int {
    val one = secret shl 6 xor secret and 16777215
    val two = one shr 5 xor one and 16777215
    return two shl 11 xor two and 16777215
}

fun part1() = seeds.sumOf { generateSequence(it, ::step).elementAt(2000).toLong() }

fun part2() = seeds.asSequence()
    .withIndex()
    .flatMap { (i, seed) ->
        generateSequence(seed, ::step).take(2001).map { it % 10 }.windowed(5).map { IndexedValue(i, it) }
    }
    .groupingBy { it.value.zipWithNext(Int::minus) }
    .aggregate { _, acc: MutableMap<Int, Int>?, (i, list), _ ->
        (acc ?: mutableMapOf()).apply { getOrPut(i, list::last) }
    }
    .maxOf { it.value.values.sum() }

val (p1ans, p1time) = measureTimedValue {
    part1()
}
val (p2ans, p2time) = measureTimedValue {
    part2()
}

println("Part 1: $p1ans (${p1time})")
println("Part 2: $p2ans (${p2time.inWholeMilliseconds})")