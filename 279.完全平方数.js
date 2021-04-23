/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 *
 * https://leetcode-cn.com/problems/perfect-squares/description/
 *
 * algorithms
 * Medium (59.47%)
 * Likes:    838
 * Dislikes: 0
 * Total Accepted:    129.4K
 * Total Submissions: 215.2K
 * Testcase Example:  '12'
 *
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 * 
 * 给你一个整数 n ，返回和为 n 的完全平方数的 最少数量 。
 * 
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11
 * 不是。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：n = 12
 * 输出：3 
 * 解释：12 = 4 + 4 + 4
 * 
 * 示例 2：
 * 
 * 
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 * @description 动态多叉树。先找到全部完全平方数，这些数量就是多叉树的分叉个数，然后用BFS找最快的一条路
 * 例：     12             --------根节点
 *      3 | 8 |     11     --------12-9、12-4、12-1
 *      2 | 4 | 2 | 7 | 10 --------3-1、8-4、11-9、11-4、11-1
 *      1 | 0 | 1 |3 6|1 6 9------ 2-1、4-4(已找到答案)、2-1(重复，需要去掉)、7-4、7-1、10-9、10-4、10-1
 * 时间复杂度(O(N+M))，N：整数n，M：多叉树的全部节点
 * 空间复杂度(O(N+M))，N：整数n以内的全部完全平方数个数，M：多叉树的全部节点
 * leetcode的时间复杂度(不会算)：
 * O(n^(h/2))其中 h 是 N 元树的高度。在前面的方法三我们可以看到详细解释。
 * 空间复杂度O(h**0.5)，这也是在 h 级可以出现的最大节点数。可以看到，虽然我们保留了一个完全平方数列表，但是空间的主要消耗是队列变量，它跟踪给定 N 元树级别上要访问的剩余节点。
 */
 var numSquares = function(n) {
  let target = n;
  let level = 0;
  const queue = [n];
  const sqrtArray = [];
  const history = new Set();
  let queueLength = queue.length;
  while (target > 0) {
    if (Math.sqrt(target) % 1 == 0) {
      sqrtArray.push(target);
    }
    target--;
  }
  while (queue.length) {
    for (let i = 0; i < queueLength; i++) {
      let current = queue.shift();
      if (current === 0) {
        return level;
      }
      for (let i = 0; i < sqrtArray.length; i++) {
        let next = current - sqrtArray[i];
        if (next >= 0 && !history.has(next)) {
          queue.push(next);
          history.add(next);
        }
      }
    }
    queueLength = queue.length;
    level++;
  }
  return level;
};
// @lc code=end

/**
 * @param {number} n
 * @return {number}
 * @description 动态规划，状态转移方程：dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
 * 方程理解：举例：n=12，那么最多由12个1组成，即dp[12] = 12;还可能由dp[11]和1的平方组成，即dp[12] = dp[12 - 1 * 1] + 1 = dp[11] + 1种，
 * 然后取其中较小的，即Math.min(dp[i], dp[i - j * j] + 1);
 * 时间复杂度O(n**(3/2))，空间复杂度O(n)
 */
 var numSquares = function (n) {
  let level = 0;
  const dp = [];
  for (let i = 0; i <= n; i++) {
    dp[i] = i; // n最多由n个1组成，所以这是最大值
    for (let j = 0; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }
  return dp[n];
};
