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
 * 最近在看动态规划问题，这题专门用动态规划的思想去做，但是状态转移方程写错了，我想的是从中间开始，向两边累加，但是没做出来(目前为止唯一没做出来的，不想再独自想了，有点费时间。其实已经思考过了一段时间，再看答案也可以看懂)
 *           nums[i],           nums[i-1]<=0
 * dp[i] = {
*/           nums[i-1]+nums[i], nums[i-1] > 0
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

