/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (40.32%)
 * Likes:    1333
 * Dislikes: 0
 * Total Accepted:    187.4K
 * Total Submissions: 462.1K
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 
 * 
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 
 * 
 * 注意空字符串可被认为是有效字符串。
 * 
 * 示例 1:
 * 
 * 输入: "()"
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: "()[]{}"
 * 输出: true
 * 
 * 
 * 示例 3:
 * 
 * 输入: "(]"
 * 输出: false
 * 
 * 
 * 示例 4:
 * 
 * 输入: "([)]"
 * 输出: false
 * 
 * 
 * 示例 5:
 * 
 * 输入: "{[]}"
 * 输出: true
 * 
 */
// 这道题印象深刻，之前一次面试的面试题。但是面试之前没有刷题，所以没做出来
 const brackets = '([)()()[]]'
// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  let result = true;
  let common = s;
  const reg = /\(\)|\[\]|\{\}/g;
  while (reg.test(common)) {
    common = common.replace(reg, '');
  }
  if (common.length) {
    result = false;
  }
  return result;
};
// @lc code=end

isValid(brackets)

// leetcode耗时较少的解法
var isValid = function(s) {
  let sL = '({[';
  let sR = ')}]';
  let arr = [];
  for (let i of s) {
    if (sL.indexOf(i) !== -1) {
      // 先将括号的左半边存储
      arr.push(i)
    } else {
      const rightBrackets = arr[arr.length - 1]; //已存储的最靠右边的括号
      const rightBracketIndex = sL.indexOf(rightBrackets); // 最右边括号在sL的index
      if (i == sR[rightBracketIndex]) { // 检测当前括号与index是否对应
          arr.pop()
      } else {
          return false
      }
    }
  }
  return arr.length === 0;
};
