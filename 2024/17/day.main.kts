import java.io.File
import kotlin.time.measureTimedValue

val input = File("input.txt").readText()
val pattern = """Register A: (\d+)|Register B: (\d+)|Register C: (\d+)|Program: ([\d,]*)""".toRegex()

var a = 0L
var b = 0L
var c = 0L
var program = IntList()
for (match in pattern.findAll(input)) {
    match.groups[1]?.run { a = value.toLong() }
    match.groups[2]?.run { b = value.toLong() }
    match.groups[3]?.run { c = value.toLong() }
    match.groups[4]?.run { value.split(',').mapTo(program) { it.toLong() } }
}

fun part1(a: Long = this.a, b: Long = this.b, c: Long = this.c) = IntList().apply {
    var a = a
    var b = b
    var c = c

    var ip = 0
    while (ip in program.indices) {
        val instruction = program[ip]
        val operand = program[ip + 1]
        val combo = when (operand) {
            in 0..3 -> operand
            4L -> a
            5L -> b
            6L -> c
            else -> TODO()
        }
        when (instruction) {
            0L -> a = a shr combo.toInt()
            1L -> b = b xor operand
            2L -> b = combo and 7
            3L -> if (a != 0L) {
                ip = operand.toInt()
                continue
            }
            4L -> b = b xor c
            5L -> add(combo and 7L)
            6L -> b = a shr combo.toInt()
            7L -> c = a shr combo.toInt()
            else -> TODO()
        }
        ip += 2
    }
}

fun part2(): Long {
    var candidates = listOf(0L)
    while (candidates.isNotEmpty()) {
        candidates = buildList {
            for (base in candidates) {
                println("Working with base: $base")
                println("  Range of loop: " + (8 * base..8 * base + 7))
                for (a in 8 * base..8 * base + 7) {
                    println("    Current a: $a")
                    val output = part1(a)

                    println("    P1 output: $output")

                    if (program == output) return a

                    println("      The size of the program slice we're gonna take: [${(program.size - output.size)}, ${program.size}]")
                    println("      The program slice: ${program.subList(program.size - output.size, program.size)}")
                    if (output.size < program.size &&
                        output == program.subList(program.size - output.size, program.size)
                    ) {
                        println("      The output is smaller than the program,")
                        println("      but it is however equal to the program slice.")
                        println("        Adding $a to list of candidates.\n")
                        add(a)
                    } else {
                        println("      The output is smaller than the program,")
                        println("      and it is not equal to the program slice.")
                        println("        Continue.\n")
                    }
                }
                break
            }
        }
    }
    TODO()
}

val (p1ans, p1time) = measureTimedValue {
    part1()
}
val (p2ans, p2time) = measureTimedValue {
    part2()
}

println("Part 1: $p1ans (${p1time})")
println("Part 2: $p2ans (${p2time.inWholeMilliseconds}ms)")

class IntList : AbstractMutableList<Long>() {
    private var values = longArrayOf()

    override var size: Int = 0
        private set

    private fun checkIndex(index: Int, size: Int = this.size) {
        if (index !in 0..<size) throw IndexOutOfBoundsException("Index $index out of bounds for length $size")
    }

    override fun get(index: Int): Long {
        checkIndex(index)
        return values[index]
    }

    override fun removeAt(index: Int): Long {
        checkIndex(index)
        return values[index].also { values.copyInto(values, index, index + 1, --size) }
    }

    override fun set(index: Int, element: Long): Long {
        checkIndex(index)
        return values[index].also { values[index] = element }
    }

    override fun add(index: Int, element: Long) {
        checkIndex(index, size = size + 1)
        if (values.size == size) values = values.copyOf(if (size == 0) 1 else 2 * size)
        values.copyInto(values, index + 1, index, size++)
        values[index] = element
    }

    override fun toString(): String = indices.joinToString(",") { this[it].toString() }
}