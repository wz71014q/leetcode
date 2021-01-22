/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
 *
 * https://leetcode-cn.com/problems/path-sum/description/
 *
 * algorithms
 * Easy (51.43%)
 * Likes:    475
 * Dislikes: 0
 * Total Accepted:    156.4K
 * Total Submissions: 303.8K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22'
 *
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
 * 
 * 说明: 叶子节点是指没有子节点的节点。
 * 
 * 示例: 
 * 给定如下二叉树，以及目标和 sum = 22，
 * 
 * ⁠             5
 * ⁠            / \
 * ⁠           4   8
 * ⁠          /   / \
 * ⁠         11  13  4
 * ⁠        /  \      \
 * ⁠       7    2      1
 * 
 * 
 * 返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。
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
 * @param {number} sum
 * @return {boolean}
 */
// 以前序遍历为基础，将使用的栈改为存储从根节点到叶子节点的栈，计算栈中所有值的和是否与sum相同
// 时间复杂度O(N * m)，N：总共的节点数，m: 每条路径的节点数；空间复杂度：O(N)
var hasPathSum = function(root, sum) {
  if (!root) {
    return false;
  }
  var stack = [];
  var collection = new Set(); // 记录是否已经走过该条路径, Set是值的集合，不含key，Map才是字典
  stack.push(root);
  while (stack.length) {
    var current = stack[stack.length - 1];
    if (current.left && !collection.has(current.left)) { // 左边路径
      stack.push(current.left);
      collection.add(current.left);
    } else if (current.right && !collection.has(current.right)) { // 右边路径
      stack.push(current.right);
      collection.add(current.right);
    } else if (!current.left && !current.right) { // 叶子节点
      var currentSum = 0
      for (var i = 0; i < stack.length; i++) {
        currentSum = currentSum + stack[i].val;
      }
      if (currentSum === sum) {
        return true;
      } else {
        stack.pop();
      }
    } else { // 左右都已走过即后退一步
      stack.pop();
    }
  }
  return false;
};
// @lc code=end
// 递归，时间复杂度O(N)，N：总共的节点数；空间复杂度：O(N)
var hasPathSum = function(root, sum) {
  if (!root) {
    return false;
  }
  if (root.left == null && root.right == null) {
    return sum == root.val;
  }
  return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
};
