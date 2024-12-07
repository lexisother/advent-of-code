export const calculate = (
  numbers: number[],
  operator: string,
  current: number,
  target: number,
  supportOr: boolean,
): boolean => {
  if (target === current && numbers.length === 0) return true;
  if (current > target) return false;
  if (numbers.length === 0) return false;

  switch (operator) {
    case "*": {
      current *= numbers[0];
      break;
    }
    case "+": {
      current += numbers[0];
      break;
    }
    case "|": {
      current = Number(`${current}${numbers[0]}`);
      break;
    }
    default:
      return false;
  }

  return (
    calculate(numbers.slice(1), "*", current, target, supportOr) ||
    calculate(numbers.slice(1), "+", current, target, supportOr) ||
    (supportOr && calculate(numbers.slice(1), "|", current, target, supportOr))
  );
};

export const isPossible = ([result, nums]) => calculate(nums, "+", 0, result, false);
export const isPossibleWithOr = ([result, nums]) => calculate(nums, "+", 0, result, true);
