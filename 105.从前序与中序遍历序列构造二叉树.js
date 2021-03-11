/*
 * @lc app=leetcode.cn id=105 lang=javascript
 *
 * [105] 从前序与中序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/
 *
 * algorithms
 * Medium (68.55%)
 * Likes:    839
 * Dislikes: 0
 * Total Accepted:    147.1K
 * Total Submissions: 213.4K
 * Testcase Example:  '[3,9,20,15,7]\n[9,3,15,20,7]'
 *
 * 根据一棵树的前序遍历与中序遍历构造二叉树。
 *
 * 注意:
 * 你可以假设树中没有重复的元素。
 *
 * 例如，给出
 *
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 *
 * 返回如下的二叉树：
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// 递归。不会递归之前只会迭代，学会递归之后就只会递归。。。
// 时间复杂度O(n)，空间复杂度0(n)
var buildTree = function (pre, ino) {
  var recursion = function (preorder, inorder) {
    if (!preorder || preorder.length <= 0) {
      return null;
    }
    if (preorder.length <= 1) {
      return new TreeNode(preorder[0]);
    }
    var leftPreorder = [];
    var rightPreorder = [];
    var curVal = preorder.shift();
    var curRootIdx = inorder.indexOf(curVal);
    var leftInorder = inorder.slice(0, curRootIdx);
    var rightInorder = inorder.slice(curRootIdx + 1);
    leftPreorder = [];
    rightPreorder = [];
    for (var i = 0; i < preorder.length; i++) {
      if (leftInorder.includes(preorder[i])) {
        leftPreorder.push(preorder[i]);
      }
      if (rightInorder.includes(preorder[i])) {
        rightPreorder.push(preorder[i]);
      }
    }
    var curRoot = new TreeNode(curVal);
    curRoot.left = recursion(leftPreorder, leftInorder);
    curRoot.right = recursion(rightPreorder, rightInorder);
    return curRoot;
  };
  return recursion(pre, ino);
};
// @lc code=end

// 递归优化
// 时间复杂度O(n)，空间复杂度0(n)
var buildTree = function (pre, ino) {
  const nodeMap = new Map();
  // 构造哈希映射，帮助我们快速定位根节点
  ino.forEach((item, idx) => {
    nodeMap.set(item, idx);
  });
  var recursion = function (preorder, inorder, rootIndex, intervalLeft, intervalRight) {
    if (intervalRight < intervalLeft) {
      return null;
    }
    var curRootVal = preorder[rootIndex];
    var curRoot = new TreeNode(curRootVal);
    var rootInorderIdx = nodeMap.get(curRootVal);
    var leftTreeNodes = rootInorderIdx - intervalLeft; // 左子树节点数量，根据这个和右子树左边界获取右子树根节点index
    curRoot.left = recursion(preorder, inorder, rootIndex + 1, intervalLeft, rootInorderIdx - 1);
    curRoot.right = recursion(
      preorder,
      inorder,
      rootIndex + 1 + leftTreeNodes,
      rootInorderIdx + 1,
      intervalRight
    );
    return curRoot;
  };
  return recursion(pre, ino, 0, 0, ino.length - 1);
};
// 迭代
var buildTree = function (preorder, inorder) {
  if (preorder == null || preorder.length == 0) {
    return null;
  }
  var root = new TreeNode(preorder[0]);
  var stack = [];
  stack.push(root);
  var inorderIndex = 0;
  for (var i = 1; i < preorder.length; i++) {
    var curPreorderVal = preorder[i];
    var curInorderVal = inorder[inorderIndex];
    var node = stack[stack.length - 1];
    if (node.val !== curInorderVal) {
      node.left = new TreeNode(curPreorderVal);
      stack.push(node.left);
    } else {
      while (stack.length && stack[stack.length - 1].val === inorder[inorderIndex]) {
        node = stack.pop();
        inorderIndex++;
      }
      node.right = new TreeNode(curPreorderVal);
      stack.push(node.right);
    }
  }
  return root;
};
