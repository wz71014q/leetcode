/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 *
 * https://leetcode-cn.com/problems/climbing-stairs/description/
 *
 * algorithms
 * Easy (50.75%)
 * Likes:    1337
 * Dislikes: 0
 * Total Accepted:    316.1K
 * Total Submissions: 621.6K
 * Testcase Example:  '2'
 *
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * 注意：给定 n 是一个正整数。
 * 
 * 示例 1：
 * 
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶
 * 2.  2 阶
 * 
 * 示例 2：
 * 
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1.  1 阶 + 1 阶 + 1 阶
 * 2.  1 阶 + 2 阶
 * 3.  2 阶 + 1 阶
 * 
 * 
 */

// @lc code=start
function factorial(n) {
  let result = 1;
  while (n > 0) {
    result = result * n --;
  }
  return result;
}

// 排列
function permutation(n, m) {
  let result = 1;
  const max = n -  m + 1;
  while (n >= max) {
    result = result * n --;
  }
  return result;
}

// 组合
function combination(n, m) {
  const result = permutation(n, m) / factorial(m);
  return result;
}
/**
 * @param {number} n
 * @return {number}
 * @description 这题花了很长时间找规律，最后发现是组合题，果然建模才是关键。
 * 如：3：
 *     1 1 1 —— 1种
 *     1 2   —— 2种
 *           —— 总共3种：C(3, 0) + C(2, 1) = 3
 * 4:  1 1 1 1 —— 1种
 *     1 1 2   —— 3种
 *     2 2     —— 1种
 *             —— 总共5种：C(4, 0) + C(3, 1)  + C(2, 2) = 5
 * 5:  1 1 1 1 1 —— 1种
 *     1 1 1 2   —— 4种
 *     1 2 2     —— 3种
 *               —— 总共8种：C(5, 0) + C(4, 1)  + C(3, 2) = 8
 */
var climbStairs = function (n) {
  var time = 0;
  var sup = 0;
  var sub = n;
  while (sub >= sup) {
    time += combination(sub, sup);
    sup++;
    sub--;
  }
  return time;
};
// @lc code=end

// 递归法，数字大了会导致内存溢出
var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }
  return climbStairs(n - 2) + climbStairs(n - 1);
};