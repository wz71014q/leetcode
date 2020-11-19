/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 *
 * https://leetcode-cn.com/problems/fibonacci-number/description/
 *
 * algorithms
 * Easy (66.18%)
 * Likes:    174
 * Dislikes: 0
 * Total Accepted:    89.5K
 * Total Submissions: 135.2K
 * Testcase Example:  '2'
 *
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 * 
 * F(0) = 0,   F(1) = 1
 * F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 * 
 * 
 * 给定 N，计算 F(N)。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1.
 * 
 * 
 * 示例 2：
 * 
 * 输入：3
 * 输出：2
 * 解释：F(3) = F(2) + F(1) = 1 + 1 = 2.
 * 
 * 
 * 示例 3：
 * 
 * 输入：4
 * 输出：3
 * 解释：F(4) = F(3) + F(2) = 2 + 1 = 3.
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 0 ≤ N ≤ 30
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 * @description 时间复杂度O(N) 空间复杂度O(N)
 */
var fib = function(N) {
  if (N < 0 || N > 30) {
    return 0;
  }
  var fibArray = [0, 1];
  var result = 0;
  for (var i = 2; i <= N; i++) {
    fibArray.push(fibArray[i - 2] + fibArray[i - 1])
  }
  result = N > 0 ? fibArray[fibArray.length - 1] : result;
  return result;
};
// @lc code=end
// 跟方法一同一个思路，但是没有用数组存数列，时间复杂度O(N) 空间复杂度O(1)。注意斐波那契数列第一项是f(0)
// 该方法属于动态规划法
var fib = function(N) {
  if (N <= 1 || N > 30) {
    return N;
  }
  var fnminus1 = 0;
  var result = 1;
  var flag = 0;
  for (var i = 1; i < N; i++) {
    flag = result;
    result = fnminus1 + result;
    fnminus1 = flag;
  }
  return result;
};
// 递归法。时间复杂度O(Math.pow(2, N)) 空间复杂度O(N)，图解时间复杂度./img/fib.jpg
var fib = function (N) {
  if (N <= 1) {
    return N;
  }
  result = fib(N - 1) + fib(N - 2);
  return result;
};