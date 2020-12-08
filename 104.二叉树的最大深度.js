/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (75.37%)
 * Likes:    752
 * Dislikes: 0
 * Total Accepted:    314.4K
 * Total Submissions: 416.8K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最大深度。
 * 
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * 
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * 返回它的最大深度 3 。
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 * 广度优先遍历, 时间复杂度O(N), 空间复杂度O(N)
 */
var maxDepth = function(root) {
  if (!root) {
    return 0;
  }
  var maxDepth = 0;
  var queue = [];
  queue.push(root);
  while (queue.length) {
    var queueLength = queue.length;
    for (var i = 0; i < queueLength; i++) {
      var current = queue.shift();
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    maxDepth++;
  }
  return maxDepth;
};
// @lc code=end
// 递归
var maxDepth = function(root) {
  if (!root) return 0;
  var left = maxDepth(root.left);
  var right = maxDepth(root.right);
  return Math.max(left, right) + 1;
};
