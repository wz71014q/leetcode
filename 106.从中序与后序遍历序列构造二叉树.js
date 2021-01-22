/*
 * @lc app=leetcode.cn id=106 lang=javascript
 *
 * [106] 从中序与后序遍历序列构造二叉树
 *
 * https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/
 *
 * algorithms
 * Medium (70.80%)
 * Likes:    414
 * Dislikes: 0
 * Total Accepted:    80.1K
 * Total Submissions: 113.1K
 * Testcase Example:  '[9,3,15,20,7]\n[9,15,7,20,3]'
 *
 * 根据一棵树的中序遍历与后序遍历构造二叉树。
 * 
 * 注意:
 * 你可以假设树中没有重复的元素。
 * 
 * 例如，给出
 * 
 * 中序遍历 inorder = [9,3,15,20,7]
 * 后序遍历 postorder = [9,15,7,20,3]
 * 
 * 返回如下的二叉树：
 * 
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 * 时间复杂度：O(n)，其中 n 是树中的节点个数。
 * 空间复杂度：O(n)。
 */
var buildTree = function (inorder, postorder) {
  var getTree = function (childInorder, childPostorder) {
    if (!childInorder.length) {
      return null;
    }
    if (childInorder.length <= 1) {
      return new TreeNode(childInorder[0]);
    }
    let localPostorder = [].concat(childPostorder);
    let rootEle = localPostorder.pop(); // 根节点
    let leftTreePostorder = [];
    let rightTreePostorder = [];
    let leftTreeInorder = childInorder.slice(0, childInorder.indexOf(rootEle));
    let rightTreeInorder = childInorder.slice(childInorder.indexOf(rootEle) + 1);
    const rightTreeLength = rightTreeInorder.length;
    let rootNode = new TreeNode(rootEle);
    let leftRoot = '';
    let rightRoot = '';
    if (rightTreeLength) {
      rightRoot = localPostorder.pop();
      rightTreePostorder.push(rightRoot);
      for (let i = 0; i < rightTreeLength - 1; i++) { // 剩下的是左子树的后序遍历
        rightTreePostorder.unshift(localPostorder.pop());
      }
      rootNode.right = getTree(rightTreeInorder, rightTreePostorder);
    }
    if (leftTreeInorder.length) {}
    leftRoot = localPostorder[localPostorder.length - 1];
    leftTreePostorder = [].concat(localPostorder);
    rootNode.left = getTree(leftTreeInorder, leftTreePostorder);
    return rootNode;
  };
  return getTree(inorder, postorder);
};
// @lc code=end
// 采用双指针维护左右子树的范围
var buildTree = function (inorder, postorder) {
  let currentRootIndex;
  const idx_map = new Map();
  // 从后序遍历的最后一个元素开始
  currentRootIndex = postorder.length - 1;
  // 建立（元素，下标）键值对的哈希表
  inorder.forEach((val, idx) => {
    idx_map.set(val, idx);
  });
  const helper = (in_left, in_right) => {
    // 如果这里没有节点构造二叉树了，就结束
    if (in_left > in_right) {
      return null;
    }
    // 选择 currentRootIndex 位置的元素作为当前子树根节点
    const root_val = postorder[currentRootIndex];
    const currentRoot = new TreeNode(root_val);
    // 根据 currentRoot 所在位置分成左右两棵子树
    const index = idx_map.get(root_val);
    // 下标减一
    currentRootIndex--;
    // 构造右子树
    currentRoot.right = helper(index + 1, in_right);
    // 构造左子树
    currentRoot.left = helper(in_left, index - 1);
    return currentRoot;
  };
  return helper(0, inorder.length - 1);
};