import java.math.BigInteger

val input = System.`in`.bufferedReader().readLines()

fun dpDot(
    pattern: CharArray, sequence: List<Int>, memo: MutableMap<String, BigInteger>,
    patternPosition: Int, sequencePosition: Int, damagedBuffer: Int
): BigInteger {
    if (damagedBuffer == 0) return dp(pattern, sequence, memo, patternPosition + 1, sequencePosition, 0)
    if (sequencePosition == sequence.size || sequence[sequencePosition] != damagedBuffer) return BigInteger.ZERO
    return dp(pattern, sequence, memo, patternPosition + 1, sequencePosition + 1, 0)
}

fun dpHash(
    pattern: CharArray, sequence: List<Int>, memo: MutableMap<String, BigInteger>,
    patternPosition: Int, sequencePosition: Int, damagedBuffer: Int
): BigInteger {
    return dp(pattern, sequence, memo, patternPosition + 1, sequencePosition, damagedBuffer + 1)
}

fun dp(
    pattern: CharArray, sequence: List<Int>, memo: MutableMap<String, BigInteger>,
    patternPosition: Int, sequencePosition: Int, damagedBuffer: Int
): BigInteger {
    val key = "$patternPosition#$sequencePosition#$damagedBuffer"
    return memo.getOrPut(key) {
        if (patternPosition == pattern.size) {
            if (sequencePosition == sequence.size) {
                if (damagedBuffer == 0) BigInteger.ONE else BigInteger.ZERO
            } else {
                if (sequencePosition == sequence.size - 1 && sequence.last() == damagedBuffer) BigInteger.ONE else BigInteger.ZERO
            }
        } else {
            if (pattern[patternPosition] == '.') {
                dpDot(pattern, sequence, memo, patternPosition, sequencePosition, damagedBuffer)
            } else if (pattern[patternPosition] == '#') {
                dpHash(pattern, sequence, memo, patternPosition, sequencePosition, damagedBuffer)
            } else {
                dpDot(pattern, sequence, memo, patternPosition, sequencePosition, damagedBuffer) +
                        dpHash(pattern, sequence, memo, patternPosition, sequencePosition, damagedBuffer)
            }
        }
    }
}

fun p1(): BigInteger {
    return input.sumOf { s ->
        val ss = s.split(" ")
        val pattern = ss[0].toCharArray()
        val sequence = ss[1].split(",").filter(String::isNotBlank).map(String::toInt)
        dp(pattern, sequence, mutableMapOf(), 0, 0, 0)
    }
}

fun p2(): BigInteger {
    return input.sumOf { s ->
        val ss = s.split(" ")
        val pattern = listOf(ss[0], ss[0], ss[0], ss[0], ss[0]).joinToString("?").toCharArray()
        val sequence = (0 until 5).flatMap {
            ss[1].split(",").filter(String::isNotBlank).map(String::toInt)
        }
        dp(pattern, sequence, mutableMapOf(), 0, 0, 0)
    }
}

println(listOf(p1(), p2()))
