/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层序遍历
 * Binary Tree Level Order Traversal
 *
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (63.74%)
 * Likes:    712
 * Dislikes: 0
 * Total Accepted:    223K
 * Total Submissions: 349.7K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 * 
 * 
 * 
 * 示例：
 * 二叉树：[3,9,20,null,null,15,7],
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 
 * 
 * 返回其层次遍历结果：
 * 
 * [
 * ⁠ [3],
 * ⁠ [9,20],
 * ⁠ [15,7]
 * ]
 * 
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 迭代法，使用队列维护当前level的节点，时间复杂度O(n)，空间复杂度O(n)
var levelOrder = function (root) {
  if (!root) {
    return [];
  }
  var queue = [];
  var result = [];
  var level = 0;
  queue.push(root);
  while (queue.length) {
    var part = [];
    level = level + 1;
    var queueLength = queue.length;
    for (var i = 0; i < queueLength; i++) {
      var current = queue.shift();
      part.push(current.val);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    result.push(part);
  }
  return result;
};
// @lc code=end

