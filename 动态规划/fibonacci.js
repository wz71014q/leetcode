// 斐波那契数列
// 0, 1, 2, 3, 4, 5
// 0, 1, 1, 2, 3, 5
// f(n) = f(n - 1) + f(n - 2);
// 斐波那契数列问题不包含「最优子结构」，只需计算每个子问题的解，避免重复计算即可。
// 通过求解子问题的解得到最终解，并且记住已求解做优化
function fibonacci(n) {
  const map = {
    0: 0,
    1: 1
  };
  const dp = function (n) {
    if (map[n] !== undefined) {
      return map[n];
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  };
  map[n] = dp(n);
  return map[n];
}
const fibonacciResult = fibonacci(5);
console.log(fibonacciResult);


// f(n) = f(n - 1) + f(n - 2);
// f(n) = a + b;
function fib(n) {
  if (n <= 1) {
    return n;
  }
  let a = 0;
  let b = 1;
  let result = 0;
  for (let i = 2; i <= n; i++) {
    result = a + b;
    a = b;
    b = result;
  }
  return result;
}
console.log(fib(6));
