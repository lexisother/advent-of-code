import java.io.File
import java.io.FileWriter
import java.math.BigInteger
import kotlin.time.measureTimedValue

val input = File("input.txt").readLines()
val breakpoint = input.indices.first { input[it] == "" }

val initRegex = """(?<code>.+): (?<value>.+)""".toRegex()
val opRegex = """(?<c1>.+) (?<op>.+) (?<c2>.+) -> (?<c3>.+)""".toRegex()

data class Operation(
    val c1: String,
    val c2: String,
    val op: String,
    var used: Boolean = false
)

val opMap = mutableMapOf<String, Operation>()
val valueMap = mutableMapOf<String, Boolean>()
val zValues = mutableSetOf<String>()

fun calculate(code: String): Boolean = valueMap.getOrPut(code) {
    val operation = opMap[code]!!
    operation.used = true
    val c1 = calculate(operation.c1)
    val c2 = calculate(operation.c2)

    when (operation.op.lowercase()) {
        "or" -> c1 || c2
        "xor" -> c1 xor c2
        "and" -> c1 && c2
        else -> false
    }
}

fun part1(): BigInteger {
    (0..<breakpoint).forEach {
        val groups = initRegex.matchEntire(input[it])!!.groups
        if (groups["code"]!!.value.startsWith("z")) zValues.add(groups["code"]!!.value)
        valueMap[groups["code"]!!.value] = groups["value"]!!.value == "1"
    }
    (breakpoint + 1..<input.size).forEach {
        val groups = opRegex.matchEntire(input[it])!!.groups
        opMap[groups["c3"]!!.value] = Operation(groups["c1"]!!.value, groups["c2"]!!.value, groups["op"]!!.value)
        if (groups["c3"]!!.value.startsWith("z")) zValues.add(groups["c3"]!!.value)
    }

    return zValues.sortedDescending().fold(BigInteger.ZERO) { r, code ->
        r * BigInteger("2") + calculate(code).compareTo(false).toBigInteger()
    }
}

fun generateDotGraph() {
    val fw = FileWriter("graph.txt")
    fw.write("""digraph D {
    layout=neato
    mode=hier
    overlap=false
    node[shape = square];""")
    fw.write("\n")
    for (entry in opMap.entries) {
        fw.write("\t${entry.value.c1} -> ${entry.key} [ label=\"${entry.value.op}\" ];\n")
        fw.write("\t${entry.value.c2} -> ${entry.key} [ label=\"${entry.value.op}\" ];\n")
    }
    fw.write("}\n")
    fw.close()
}

fun part2() {
    generateDotGraph()
}

val (p1ans, p1time) = measureTimedValue {
    part1()
}

val (p2ans, p2time) = measureTimedValue {
    part2()
}

println("Part 1: $p1ans ($p1time)")
println("Part 2: $p2time")
