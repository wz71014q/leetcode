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

