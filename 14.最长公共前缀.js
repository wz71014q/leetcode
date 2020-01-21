/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (35.62%)
 * Likes:    817
 * Dislikes: 0
 * Total Accepted:    166.8K
 * Total Submissions: 467.7K
 * Testcase Example:  '["flower","flow","flight", "right", "raw"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 
 * 如果不存在公共前缀，返回空字符串 ""。
 * 
 * 示例 1:
 * 
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 * 
 * 
 * 示例 2:
 * 
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 * 
 * 
 * 说明:
 * 
 * 所有输入只包含小写字母 a-z 。
 * 
 */
const arr = ["flower","flow","flight", "right", "raw"];
// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
/* eslint-disable */
var longestCommonPrefix = function (strs) {
  if (strs.length < 1) {
    return ''
  }
  let result = ''
  let maxLength = strs[0].length
  for (let i = 0; i < strs.length; i += 1) {
    if (strs[i].length > maxLength) {
      maxLength = strs[i].length
    }
  }
  for (let i = 0; i < maxLength; i += 1) {
    let headWord = []
    for (let j = 0; j < strs.length; j += 1) {
      headWord.push(strs[j].slice(i, i+1))
    }
    result += lengStr(headWord)
    if (/false/g.test(result)) {
      result = result.replace(/false/g, "")
      break
    }
  }
  return result
}

function lengStr(strArray) {
  let result = strArray[0]
  for (let j = 0; j < strArray.length; j += 1) {
    if (strArray[j] !== result) {
      result = false
      break;
    }
  }
  return result
}
// @lc code=end
console.log('str = ', longestCommonPrefix(strsArr))

