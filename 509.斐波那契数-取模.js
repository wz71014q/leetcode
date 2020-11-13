// 剑指 Offer 10- I. 斐波那契数列
// 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项。斐波那契数列的定义如下：

// F(0) = 0,   F(1) = 1
// F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
// 斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

// 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

//  

// 示例 1：

// 输入：n = 2
// 输出：1
// 示例 2：

// 输入：n = 5
// 输出：5
//  

// 提示：

// 0 <= n <= 100

/**
 * @param {number} N
 * @return {number}
 * 这题审题不清，没弄清楚每项都要取模，因此一连错了好几次，如果是在面试中，那直接挂了
 */
var fib = function (N) {
  if (N < 0 || N > 100) {
    return 0;
  }
  var fibArray = [0, 1];
  var result = 0;
  for (var i = 2; i <= N; i++) {
    fibArray.push((fibArray[i - 2] + fibArray[i - 1]) % 1000000007);
  }
  result = N > 0 ? fibArray[fibArray.length - 1] : result;
  return result;
};
