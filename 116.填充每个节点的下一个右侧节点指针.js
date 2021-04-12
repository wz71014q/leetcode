/*
 * @lc app=leetcode.cn id=116 lang=javascript
 *
 * [116] 填充每个节点的下一个右侧节点指针
 *
 * https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/description/
 *
 * algorithms
 * Medium (68.97%)
 * Likes:    416
 * Dislikes: 0
 * Total Accepted:    102.7K
 * Total Submissions: 148.8K
 * Testcase Example:  '[1,2,3,4,5,6,7]'
 *
 * 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
 * 
 * 
 * struct Node {
 * ⁠ int val;
 * ⁠ Node *left;
 * ⁠ Node *right;
 * ⁠ Node *next;
 * }
 * 
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 
 * 初始状态下，所有 next 指针都被设置为 NULL。
 * 
 * 
 * 
 * 进阶：
 * 
 * 
 * 你只能使用常量级额外空间。
 * 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 
 * 
 * 输入：root = [1,2,3,4,5,6,7]
 * 输出：[1,#,2,3,#,4,5,6,7,#]
 * 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B
 * 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 树中节点的数量少于 4096
 * -1000 
 * 
 * 
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 * @description 基于广度优先遍历的层次遍历，每一层都会有个队列，时间复杂度O(n)，空间复杂度O(n)
 */
 var connect = function (root) {
  if (!root) return null;
  const levelQueue = []; // 每一层的队列
  let queue = []; // 每一层元素的队列
  levelQueue.push([root]);
  let curQueue;
  while (levelQueue.length) {
    curQueue = levelQueue.shift();
    queue = [];
    for (var i = 0; i < curQueue.length; i++) {
      curQueue[i].next = curQueue[i + 1] ? curQueue[i + 1] : null;
      if (curQueue[i].left) {
        queue.push(curQueue[i].left);
      }
      if (curQueue[i].right) {
        queue.push(curQueue[i].right);
      }
    }
    if (queue.length) {
      levelQueue.push(queue);
    }
  }
  return root;
};
// @lc code=end
// 优化版广度优先遍历，时间复杂度O(n)，空间复杂度O(n)
var connect = function (root) {
  if (!root) return null;
  let queue = [];
  queue.push(root);
  let queueLength = queue.length;
  let curQueue;
  while (queue.length) {
    for (var i = 0; i < queueLength; i++) {
      curQueue = queue.shift();
      curQueue.next = (i + 1) < queueLength ? queue[0] : null;
      if (curQueue.left) {
        queue.push(curQueue.left);
      }
      if (curQueue.right) {
        queue.push(curQueue.right);
      }
    }
    queueLength = queue.length;
  }
  return root;
};
