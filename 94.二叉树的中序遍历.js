/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Medium (74.20%)
 * Likes:    792
 * Dislikes: 0
 * Total Accepted:    306.7K
 * Total Submissions: 413.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
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
 * 输出：[2,1]
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
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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
 */
// 递归，时间复杂度O(n), 空间复杂度O(n)
var inorderTraversal = function (root) {
  if (!root || !root.val) {
    return [];
  }
  var result = [];
  var dfs = function (current) {
    if (!current || !current.val) {
      return '';
    }
    if (current.left) {
      dfs(current.left);
    }
    result.push(current.val);
    if (current.right) {
      dfs(current.right);
    }
    return result;
  };
  return dfs(root);
};
// @lc code=end
// 迭代，时间复杂度O(n), 空间复杂度O(n)
var inorderTraversal = function (root) {
  if (!root || !root.val) {
    return [];
  }
  var stack = [];
  var result = [];
  var current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  console.log(stack);
  return result;
};