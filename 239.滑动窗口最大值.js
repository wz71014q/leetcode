/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 *
 * https://leetcode-cn.com/problems/sliding-window-maximum/description/
 *
 * algorithms
 * Hard (49.20%)
 * Likes:    619
 * Dislikes: 0
 * Total Accepted:    86K
 * Total Submissions: 174.9K
 * Testcase Example:  '[1,3,-1,-3,5,3,6,7]\n3'
 *
 * 给定一个数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k
 * 个数字。滑动窗口每次只向右移动一位。
 * 
 * 返回滑动窗口中的最大值。
 * 
 * 
 * 
 * 进阶：
 * 
 * 你能在线性时间复杂度内解决此题吗？
 * 
 * 
 * 
 * 示例:
 * 
 * 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
 * 输出: [3,3,5,5,6,7] 
 * 解释: 
 * 
 * ⁠ 滑动窗口的位置                最大值
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 * ⁠1 [3  -1  -3] 5  3  6  7       3
 * ⁠1  3 [-1  -3  5] 3  6  7       5
 * ⁠1  3  -1 [-3  5  3] 6  7       5
 * ⁠1  3  -1  -3 [5  3  6] 7       6
 * ⁠1  3  -1  -3  5 [3  6  7]      7
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= nums.length <= 10^5
 * -10^4 <= nums[i] <= 10^4
 * 1 <= k <= nums.length
 * 
 * 
 */

// @lc code=start
function getMax(array, k) {
  var arrayMax = array[0];
  var arrayMaxIndex = 0;
  for (var i = 0; i < k; i++) {
    if (array[i] > arrayMax) {
      arrayMax = array[i];
      arrayMaxIndex = i;
    }
  }
  return {
    arrayMax: arrayMax,
    arrayMaxIndex: arrayMaxIndex
  };
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * @description 刚开始没多想，直接遍历window数组查找最大值，没想到100000长度的数组直接挂了。后来想到将window最大值存起来，与后一位进行比较，勉强通过，时间复杂度：O(m)~O(m*n)，空间复杂度O(1)(不算存储结果的数组)。m: 原数组长度，n：滑动窗口大小
 */
var maxSlidingWindow = function (nums, k) {
  if (k <=0 ) {
    return nums;
  }
  var result = [];
  var window = [];
  var numsLength = nums.length;
  var loopMax = nums.length - k;
  window = nums.splice(0, k);
  var windowMax = getMax(window, k).arrayMax;
  var windowMaxIndex = getMax(window, k).arrayMaxIndex;
  result.push(windowMax);
  while (loopMax > 0) {
    window.shift();
    var newItem = nums.shift();
    window.push(newItem);
    if (windowMaxIndex <= 0) {
      windowMax = getMax(window, k).arrayMax;
      windowMaxIndex = getMax(window, k).arrayMaxIndex;
    } else {
      if (windowMax < newItem) {
        windowMax = newItem;
        windowMaxIndex = k - 1;
      } else {
        windowMaxIndex--;
      }
    }
    result.push(windowMax);
    loopMax--;
  }
  return result;
};
// @lc code=end
/**
 * 1、用双向队列维护窗口
 * 2、滑动窗口，移除窗口中第一位数据
 * 3、新添加数据与窗口中的数据比较，保证窗口中第一位数据为最大值
 * 时间复杂度O(n)，空间复杂度O(n)
 */
var maxSlidingWindow = function(nums, k) {
  if (!nums || nums.length === 0) {
      return []
  }
  const res = [];
  const windows = [];
  for(let i = 0; i < nums.length; i++) {
      const value = nums[i];
      if (i >= k && windows[0] <= i - k) {
          windows.shift();
      }
      while(value > nums[windows[windows.length - 1]]) {
          windows.pop();
      }
      windows.push(i);
      if (i >= (k - 1)) {
          res.push(nums[windows[0]]);
      }
  }
  return res;
};
// 双向扫描法，先将数组分成n/k块，找出每个块内最大值，时间复杂度O(N), 空间复杂度O(N)
/**
 * 假设题目是：给定一个数组，分为k块，有一窗口宽度为k，求窗口所在的两块区域最大值
 * 输入[3, 1, 5, 7, 9, 1, 2, 5, 6, 3, 7], k = 3
 * 分块：
 * [3, 1, 5], [7, 9, 1], [2, 5, 6], [3, 7]
 * 最大值：
 * [5, 5, 5], [9, 9, 9], [6, 6, 6], [7, 7]
 * 假设窗口位置：
 * [5, 5, 5]------------------------------
 * 那么窗口内最大值是5；
 * 假设窗口位置：
 * -------[5,  9,  9]---------------------
 * 那么窗口内最大值是9
 * 这个最大值数组我们一眼可以看出最大值，然后写出来。但是实际运算时需要每次查找窗口内最大值，所以：
 * 输入[3, 1, 5, 7, 9, 1, 2, 5, 6, 3, 7], k = 3
 * 分块：
 * [3, 1, 5], [7, 9, 1], [2, 5, 6], [3, 7]
 * 最大值：
 * [5, 5, 5], [9, 9, 9], [6, 6, 6], [7, 7]
 * 遍历：
 * ---k次---, ---k次---, ---k次---, ---k次---
 * 时间复杂度：Math.pow(k, Math.ceil(n/k))
 *
 * 以上题来理解两端同时扫描:
 * 从左往右：扫描时在同一块内，遇到比自己大的数就替换掉，保障右边的值一定≥左边的值
 * 从右往左：扫描时在同一块内，遇到比自己大的数就替换掉，保障左边的值一定≥右边的值
 * 输入：  [3, 1, 5, 7, 9, 1, 2, 5, 6, 3, 7], k = 3
 * 分块：  [3, 1, 5], [7, 9, 1], [2, 5, 6], [3, 7]
 * 从左往右：
 * left:  [3, 3, 5], [7, 9, 9], [2, 5, 6], [3, 7]
 * 从右往左：
 * right: [5, 5, 5], [9, 9, 1], [6, 6, 6], [7, 7]
 * 窗口：
 * window:[       ]------------------------------, 将left最右边和right最左边的值比大小, 即5跟5对比，所以5是最大值
 * window:----[        ]-------------------------, 将left最右边和right最左边的值比大小, 即7跟5对比，所以7是最大值
 * 最大值: [ 5, 7, 9, 9, 9, 5, 6, 6, 7 ]
 */
var maxSlidingWindow = function (nums, k) {
  if (k <= 0) {
    return nums;
  }
  var numsLength = nums.length;
  var left = [];
  var right = [];
  var result = [];
  var leftblockMax = nums[0];
  var rightblockMax = nums[numsLength - 1];
  for (var i = 0; i < numsLength; i++) { // 求left和right
    if (i % k == 0) {
      leftblockMax = nums[i];
    }
    if (i > 0 && (numsLength - i) % k == 0) {
      rightblockMax = nums[numsLength - 1 - i];
    }
    if (leftblockMax < nums[i]) {
      leftblockMax = nums[i];
    }
    if (i > 0 && rightblockMax < nums[numsLength - 1 - i]) {
      rightblockMax = nums[numsLength - 1 - i];
    }
    left.push(leftblockMax);
    right.push(rightblockMax);
  }
  for (var i = 0; i < numsLength; i++) {
    if (i < k) {
      i = k - 1;
    }
    // right数组是反过来的，所以需要计算index
    result.push(Math.max(left[i], right[numsLength - 1 - (i - k + 1)]));
  }
  return result;
};