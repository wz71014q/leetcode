/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 * [144] Binary Tree Preorder Traversal
 *
 * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Medium (67.18%)
 * Likes:    457
 * Dislikes: 0
 * Total Accepted:    229.2K
 * Total Submissions: 334.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 * Given the root of a binary tree, return the preorder traversal of its nodes' values.
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [1,null,2,3]
 * 输出：[1,2,3]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = []
 * 输出：[]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：root = [1]
 * 输出：[1]
 * 
 * 
 * 示例 4：
 * 
 * 
 * 输入：root = [1,2]
 * 输出：[1,2]
 * 
 * 
 * 示例 5：
 * 
 * 
 * 输入：root = [1,null,2]
 * 输出：[1,2]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [0, 100] 内
 * -100 
 * 
 * 
 * 
 * 
 * 进阶：递归算法很简单，你可以通过迭代算法完成吗？
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
 * @return {number[]}
 * 迭代，时间复杂度O(n)，空间复杂度O(n)
 */
var preorderTraversal = function (root) {
  if (!root) {
    return [];
  }
  var stack = []; // 递归隐性使用的栈拿出来进行维护
  var result = [];
  stack.push(root);
  while (stack.length) {
    var current = stack.pop();
    result.push(current.val);
    if (current.right) {
      stack.push(current.right);
    }
    if (current.left) {
      stack.push(current.left);
    }
  }
  return result;
};
// @lc code=end
// 递归，时间复杂度O(n)，空间复杂度O(n)
var preorderTraversal = function(root) {
  if (!root) {
    return [];
  }
  var result = [];
  var dfs = function(root) {
    result.push(root.val);
    if (!root.left && !root.right) {
      return root
    }
    if (root.left) {
      dfs(root.left);
    }
    if (root.right) {
      dfs(root.right);
    }
  }
  dfs(root);
  return result;
};