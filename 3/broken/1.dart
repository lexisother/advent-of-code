void main(List<String> args) {
  final input = args[0].split("\n").toList();
  print(input);
  // final inputLength = input.length - 1;

  var sum = new List<int>.filled(input.length, 0);

  for (final number in input) {
    // var sumLength = sum.length;
    print("First loop, using number $number");
    for (var i = 0; i < sum.length; i++) {
      sum[i] = int.parse(number[i]);
      print("sum[$i] value: ${sum[i]}");
    }
  }

  // final sumLength = sum.length - 1;
  final gammaRate = [];
  final epsilonRate = [];
  for (var i = 0; i < sum.length; i++) {
    print('Using sum ${sum[i]}');
    if (sum[i] > input.length / 2) {
      print("${sum[i]} greater than ${input.length / 2}");
      gammaRate.add("1");
      epsilonRate.add("0");
    } else {
      print("${sum[i]} not greater than ${input.length / 2}");
      gammaRate.add("0");
      epsilonRate.add("1");
    }
  }

  print(gammaRate.join(""));
  print(epsilonRate.join(""));
  // final gamma = int.parse(gammaRate.join(""), radix: 2);
  // final epsilon = int.parse(epsilonRate.join(""), radix: 2);

  // final result = gamma * epsilon;

  // print(result);
}
