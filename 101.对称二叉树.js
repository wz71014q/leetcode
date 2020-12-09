/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
 *
 * https://leetcode-cn.com/problems/symmetric-tree/description/
 *
 * algorithms
 * Easy (53.18%)
 * Likes:    1151
 * Dislikes: 0
 * Total Accepted:    238.4K
 * Total Submissions: 447.7K
 * Testcase Example:  '[1,2,2,3,4,4,3]'
 *
 * 给定一个二叉树，检查它是否是镜像对称的。
 * 
 * 
 * 
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 * 
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠/ \ / \
 * 3  4 4  3
 * 
 * 
 * 
 * 
 * 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
 * 
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠  \   \
 * ⁠  3    3
 * 
 * 
 * 
 * 
 * 进阶：
 * 
 * 你可以运用递归和迭代两种方法解决这个问题吗？
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
 * @return {boolean}
 */
// 迭代法，中序遍历，两个指针分别从左右子树遍历并对比，时间复杂度O(N)，空间复杂度O(N)
var isSymmetric = function(root) {
  if (!root) {
    return true;
  }
  var stackL = [];
  var stackR = [];
  var currentL = root;
  var currentR = root;
  while (currentL || currentR || stackL.length || stackR.length) {
    while(currentL || currentR) {
      stackL.push(currentL);
      stackR.push(currentR);
      currentL = currentL && currentL.left || '';
      currentR = currentR && currentR.right || '';
    }
    currentL = stackL.pop();
    currentR = stackR.pop();
    if ((currentL && !currentR) || (!currentL && currentR)) { // 如果左子树或右子树对应不上就不是对称节点
      return false;
    }
    if (currentL.val !== currentR.val) {
      return false;
    } else if (currentL == currentR) { // 到中间就停
      return true;
    }
    currentL = currentL.right;
    currentR = currentR.left;
  }
  return true;
};
// @lc code=end
// 迭代法，前序遍历，两个指针分别从左右子树遍历并对比，时间复杂度O(N)，空间复杂度O(N)
var isSymmetric = function(root) {
  if (!root) {
    return true;
  }
  var stackL = [root];
  var stackR = [root];
  while (stackL.length) {
    var currentL = stackL.pop();
    var currentR = stackR.pop();
    if (currentL.val !== currentR.val) {
      return false;
    }
    if (currentL == root.right && currentR == root.left) {
      return true;
    }
    if (currentL.right && currentR.left) {
      stackL.push(currentL.right);
      stackR.push(currentR.left);
    } else if (currentL.right || currentR.left) {
      return false;
    }
    if (currentL.left && currentR.right) {
      stackL.push(currentL.left);
      stackR.push(currentR.right);
    } else if (currentL.left || currentR.right) {
      return false;
    }
  }
  return true;
};
