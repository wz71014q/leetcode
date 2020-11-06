/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
 *
 * https://leetcode-cn.com/problems/rotate-list/description/
 *
 * algorithms
 * Medium (40.50%)
 * Likes:    362
 * Dislikes: 0
 * Total Accepted:    94.7K
 * Total Submissions: 233.8K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
 * 
 * 示例 1:
 * 
 * 输入: 1->2->3->4->5->NULL, k = 2
 * 输出: 4->5->1->2->3->NULL
 * 解释:
 * 向右旋转 1 步: 5->1->2->3->4->NULL
 * 向右旋转 2 步: 4->5->1->2->3->NULL
 * 
 * 
 * 示例 2:
 * 
 * 输入: 0->1->2->NULL, k = 4
 * 输出: 2->0->1->NULL
 * 解释:
 * 向右旋转 1 步: 2->0->1->NULL
 * 向右旋转 2 步: 1->2->0->NULL
 * 向右旋转 3 步: 0->1->2->NULL
 * 向右旋转 4 步: 2->0->1->NULL
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * @description 快慢指针，时间复杂度O(L)，空间复杂度O(1)。较快的方法是将头尾相连，再在需要断开的地方断开链表
 */
var rotateRight = function(head, k) {
  if (head === null || k === 0) {
    return head;
  }
  var slow = head;
  var fast = head;
  var result = head.next ? head.next : head;
  while (k > 0) {
    fast = fast.next === null ? head : fast.next;
    k--;
  }
  if (slow === fast) {
    return head;
  }
  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
    result = result.next ? result.next: head;
  }
  slow.next = null;
  if (slow !== fast) {
    fast.next = head;
  }
  return result;
};
// @lc code=end

