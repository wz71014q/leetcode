/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 *
 * https://leetcode-cn.com/problems/palindrome-number/description/
 *
 * algorithms
 * Easy (56.77%)
 * Likes:    859
 * Dislikes: 0
 * Total Accepted:    221K
 * Total Submissions: 389.2K
 * Testcase Example:  '121'
 *
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 
 * 示例 1:
 * 
 * 输入: 121
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: -121
 * 输出: false
 * 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
 * 
 * 
 * 示例 3:
 * 
 * 输入: 10
 * 输出: false
 * 解释: 从右向左读, 为 01 。因此它不是一个回文数。
 * 
 * 
 * 进阶:
 * 
 * 你能不将整数转为字符串来解决这个问题吗？
 * 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  if (x < 0) {
    return false
  }
  const numberArray = (x + '').split('');
  let head;
  let afterbody;
  let result = true
  while (numberArray.length > 1) {
    head = numberArray.shift();
    afterbody = numberArray.pop();
    if (head !== afterbody) {
      result = false
    }
  }
  return result
};
// @lc code=end
// 不转化成字符串解法
var isPalindrome = function(x) {
  if (x < 0) {
    return false
  }
  let origin = x;
  let reverse = 0;
  while (origin) {
    reverse = reverse * 10 + origin % 10;
    origin = Math.floor(origin / 10);
  }
  return reverse === x
};
