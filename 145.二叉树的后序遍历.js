/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Medium (73.58%)
 * Likes:    483
 * Dislikes: 0
 * Total Accepted:    166.5K
 * Total Submissions: 226.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 后序 遍历。
 * 
 * 示例:
 * 
 * 输入: [1,null,2,3]  
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3 
 * 
 * 输出: [3,2,1]
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
var postorderTraversal = function (root) {
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
    if (current.right) {
      dfs(current.right);
    }
    result.push(current.val);
    return result;
  };
  return dfs(root);
};
// @lc code=end
// 迭代，时间复杂度O(n), 空间复杂度O(n)
var postorderTraversal = function (root) {
  if (!root || !root.val) {
    return [];
  }
  var stack = [];
  var result = [];
  var current = root;
  var pre = null;
  while (current || stack.length) {
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      current = stack.pop();
      if (current.right && current.right !== pre) {
        stack.push(current);
        stack.push(current.right);
        current = current.right.left;
      } else {
        result.push(current.val);
        pre = current;
        current = null;
      }
    }
  }
  return result;
};
