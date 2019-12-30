/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const smallArray = [].concat(nums);
  const targetArray= [];
  if (smallArray.length === 0) {
    return [];
  }
  for (let i = 0; i < nums.length; i++) {
    const firNum = smallArray.shift();
    if (smallArray.indexOf(target - firNum) !== -1) {
      const firstIndex = nums.indexOf(firNum);
      const secondIndex = nums.indexOf(target - firNum, firstIndex + 1);
      targetArray.push(firstIndex, secondIndex);
      break;
    }
  }
  return targetArray;
};
// @lc code=end

