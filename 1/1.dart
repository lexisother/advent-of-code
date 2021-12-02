final tripleMap = (List<int> l, int i) => l[i - 2] + l[i - 1] + l[i];

void main(List<String> args) {
  final input = args[0].split("\n").map(int.parse).toList();

  List<int> triples = [];
  for (var i = 2; i < input.length; i++) {
    triples.add(tripleMap(input, i));
  }

  int increments = 0;
  for (var i = 1; i < triples.length; i++) {
    if (input[i] > input[i - 1]) {
      increments += 1;
    }
  }

  print(increments);
}
