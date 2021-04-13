/*
 * @lc app=leetcode.cn id=236 lang=javascript
 *
 * [236] 二叉树的最近公共祖先
 *
 * https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (66.55%)
 * Likes:    1062
 * Dislikes: 0
 * Total Accepted:    184.3K
 * Total Submissions: 275.4K
 * Testcase Example:  '[3,5,1,6,2,0,8,null,null,7,4]\n5\n1'
 *
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * 百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x
 * 的深度尽可能大（一个节点也可以是它自己的祖先）。”
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出：3
 * 解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出：5
 * 解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：root = [1,2], p = 1, q = 2
 * 输出：1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点数目在范围 [2, 10^5] 内。
 * -10^9 
 * 所有 Node.val 互不相同 。
 * p != q
 * p 和 q 均存在于给定的二叉树中。
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 * @description 采用深度优先遍历，分别得到从根节点到两个子节点的栈，对比得到最近的公共祖先
 * 如[1, 2, 3, 4, 5, 6, 7]，入栈顺序如下：
 * [1] => [1, 2] => [1, 2, 4]，检测到4已经没有子节点了，弹出，继续： [1, 2, 5] => [1, 2] => [1, 3] => [1, 3, 6] => [1, 3, 7] => [1, 3] => [1] => []
 */
 var lowestCommonAncestor = function (root, p, q) {
  const stack = [];
  let current = root;
  let first = []; // 从根节点到p的栈
  let second = []; // 从根节点到q的栈
  let ancestor;
  const dic = new Set(); // 避免重复入栈
  while (current || stack.length) {
    while (current && !dic.has(current.val)) {
      stack.push(current);
      dic.add(current.val);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (current && current.val === p.val) { // 记录从根节点到p路径的栈
      first = [].concat(stack);
    }
    if (current && current.val === q.val) { // 记录从根节点到p路径的栈
      second = [].concat(stack);
    }
    current = current && current.right;
    if (!current || dic.has(current.val)) { // 当前节点已经没有子节点了，弹出
      stack.pop();
    }
  }
  // 对比两个栈，得到最近的公共祖先，如[1, 2, 4]   [1, 3, 6] => 1
  for (var i = 0; i < first.length; i++) {
    if (second.includes(first[i])) {
      ancestor = first[i];
    }
  }
  return ancestor;
};
// @lc code=end

