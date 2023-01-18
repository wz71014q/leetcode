/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 *
 * https://leetcode-cn.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Easy (52.59%)
 * Likes:    2635
 * Dislikes: 0
 * Total Accepted:    365.6K
 * Total Submissions: 693.2K
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 
 * 示例:
 * 
 * 输入: [-2,1,-3,4,-1,2,1,-5,4]
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 * 
 * 
 * 进阶:
 * 
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * 状态转移方程：
 *           nums[i],           nums[i-1]<=0
 * dp[i] = {
 *           nums[i-1]+nums[i], nums[i-1] > 0
 */
var maxSubArray = function (nums) {
  if (nums.length <= 0) {
    return 0;
  }
  var maxValue = nums[0];
  for (var i = 1; i < nums.length; i++) {
    if (nums[i - 1] > 0 ) {
      nums[i] = nums[i - 1] + nums[i];
    }
    maxValue = nums[i] > maxValue ? nums[i] : maxValue;
  }
  return maxValue;
};
// @lc code=end

