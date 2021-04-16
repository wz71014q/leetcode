/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 *
 * https://leetcode-cn.com/problems/daily-temperatures/description/
 *
 * algorithms
 * Medium (66.30%)
 * Likes:    717
 * Dislikes: 0
 * Total Accepted:    153.1K
 * Total Submissions: 229.6K
 * Testcase Example:  '[73,74,75,71,69,72,76,73]'
 *
 * 请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0
 * 来代替。
 * 
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4,
 * 2, 1, 1, 0, 0]。
 * 
 * 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
 * 
 */

// @lc code=start
/**
 * @param {number[]} T
 * @return {number[]}
 * @description 三指针/快慢指针，其实是全数组遍历，属于暴力破解法。时间复杂度：最坏情况下O(n^2)，空间复杂度O(n)
 */
 var dailyTemperatures = function (T) {
  const temp = [];
  let idx = 0;
  let slow = 0;
  let fast = 0;
  while (slow < T.length && fast <= T.length) {
    if (T[fast] > T[slow]) {
      temp.push(fast - slow);
      slow++;
    } else if (fast >= T.length) {
      temp.push(0);
      slow++;
    } else {
      fast++;
    }
    if (idx !== slow) {
      idx = slow;
      fast = idx;
    }
  }
  return temp;
};
// @lc code=end
var dailyTemperatures = function (T) {
  const temp = new Array(T.length).fill(0);
  const stack = [];
  for (var i = 0; i < T.length; i++) {
    let current = T[i];
    let curStack = T[stack[stack.length - 1]];
    while (current > curStack && stack.length) {
      temp[stack[stack.length - 1]] = i - stack.pop();
      curStack = T[stack[stack.length - 1]];
    }
    stack.push(i);
  }
  return temp;
};
