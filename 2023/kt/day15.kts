val input = System.`in`.bufferedReader().readLines()

fun hash(s: String): Int {
    var h = 0
    for (c in s) h = (h + c.code) * 17 % 256
    return h
}

fun p1(): Int = input.sumOf {
    it.split(",").sumOf(::hash)
}

data class Lens(val label: String, val focus: Int)
data class Box(val labelIndex: MutableMap<String, Int>, val lenses: MutableList<Lens>)

fun p2(): Int {
    val steps = input.flatMap { it.split(',') }
    val boxes = Array(256) { Box(mutableMapOf(), mutableListOf()) }
    for (step in steps) {
        if (step.contains('=')) {
            val ss = step.split('=')
            val label = ss[0]
            val focus = ss[1].toInt()
            val boxIndex = hash(label)
            val box = boxes[boxIndex]
            val lensIndex = box.labelIndex[label]
            if (lensIndex != null) {
                box.lenses[lensIndex] = Lens(label, focus)
            } else {
                box.labelIndex[label] = box.lenses.size
                box.lenses.add(Lens(label, focus))
            }
        } else {
            val label = step.split('-')[0]
            val boxIndex = hash(label)
            val box = boxes[boxIndex]
            val lensIndex = box.labelIndex[label]
            if (lensIndex != null) {
                box.lenses[lensIndex] = Lens("", 0)
                box.labelIndex.remove(label)
            }
        }
    }

    return boxes.indices.sumOf { i ->
        var boxAnswer = 0
        var lensIndex = 1
        val lenses = boxes[i].lenses
        for (lens in lenses) {
            if (lens.label.isNotBlank()) {
                boxAnswer += lensIndex * lens.focus
                lensIndex++
            }
        }
        (i + 1) * boxAnswer
    }
}

println(listOf(p1(), p2()))