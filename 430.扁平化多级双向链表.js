/*
 * @lc app=leetcode.cn id=430 lang=javascript
 *
 * [430] 扁平化多级双向链表
 *
 * https://leetcode-cn.com/problems/flatten-a-multilevel-doubly-linked-list/description/
 *
 * algorithms
 * Medium (51.46%)
 * Likes:    135
 * Dislikes: 0
 * Total Accepted:    13.4K
 * Total Submissions: 26K
 * Testcase Example:  '[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]'
 *
 *
 * 多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。
 *
 * 给你位于列表第一级的头节点，请你扁平化列表，使所有结点出现在单级双链表中。
 *
 *
 *
 * 示例 1：
 *
 * 输入：head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
 * 输出：[1,2,3,7,8,11,12,9,10,4,5,6]
 * 解释：
 *
 * 输入的多级列表如下图所示：
 *
 *
 *
 * 扁平化后的链表如下图：
 *
 *
 *
 *
 * 示例 2：
 *
 * 输入：head = [1,2,null,3]
 * 输出：[1,3,2]
 * 解释：
 *
 * 输入的多级列表如下图所示：
 *
 * ⁠ 1---2---NULL
 * ⁠ |
 * ⁠ 3---NULL
 *
 *
 * 示例 3：
 *
 * 输入：head = []
 * 输出：[]
 *
 *
 *
 *
 * 如何表示测试用例中的多级链表？
 *
 * 以 示例 1 为例：
 *
 * ⁠1---2---3---4---5---6--NULL
 * ⁠        |
 * ⁠        7---8---9---10--NULL
 * ⁠            |
 * ⁠            11--12--NULL
 *
 * 序列化其中的每一级之后：
 *
 * [1,2,3,4,5,6,null]
 * [7,8,9,10,null]
 * [11,12,null]
 *
 *
 * 为了将每一级都序列化到一起，我们需要每一级中添加值为 null 的元素，以表示没有节点连接到上一级的上级节点。
 *
 * [1,2,3,4,5,6,null]
 * [null,null,7,8,9,10,null]
 * [null,11,12,null]
 *
 *
 * 合并所有序列化结果，并去除末尾的 null 。
 *
 * [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
 *
 *
 *
 * 提示：
 *
 *
 * 节点数目不超过 1000
 * 1 <= Node.val <= 10^5
 *
 *
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 * @description 该题容易想到使用递归法做，时间复杂度O(L)——主链表总长度，空间复杂度O(X)——X：子链表层级
 * 官方答案思路一样，只是方法名称叫深度优先遍历，以二叉树的思维结题，时间复杂度和空间复杂度都是O(n)?
 */
var flatten = function (head) {
  if (head == null) {
    return head;
  }
  var prev = head;
  var middle = head;
  var theNext = head;
  // 未用哨兵节点，需要处理head节点就有child节点的情况
  if (head.child !== null) {
    theNext = theNext.next;
  }
  // 遍历节点，寻找子节点连接点
  while (middle !== null && middle.child == null) {
    prev = middle;
    middle = theNext;
    theNext = theNext ? theNext.next : null;
  }
  if (middle !== null && middle.child !== null) {
    /** 将子节点的第一个节点与主干节点连接处连接 start */
    middle.next = middle.child;
    middle.child = null;
    prev = middle;
    middle = middle.next;
    middle.prev = prev;
    /** 将子节点的第一个节点与主干节点连接处连接 end */
    var child = flatten(middle); // 递归寻找下一个子链表
    while (child.next !== null) {
      child = child.next;
    }
    // 将子链表与主链表连接
    child.next = theNext;
    if (theNext !== null) {
      theNext.prev = child;
    }
  }
  return head;
};
// @lc code=end

/**
 * @param {Node} head
 * @return {Node}
 * @description 执行时间较短的范例，使用栈进行迭代时间复杂度：O(N)。空间复杂度：O(N)。
 */
var flatten = function (head) {
  if (!head) return null;
  const stack = [head];
  const newhead = new Node(null);
  let p = newhead;
  while (stack.length !== 0) {
    let curr = stack.pop();
    p.next = curr;
    curr.prev = p;
    while (curr) {
      if (curr.child) {
        if (curr.next) stack.push(curr.next);
        curr.next = curr.child;
        curr.child.prev = curr;
        curr.child = null;
      }
      if (!curr.next) p = curr;
      curr = curr.next;
    }
  }
  newhead.next.prev = null;
  return newhead.next;
};
