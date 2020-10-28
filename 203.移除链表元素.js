/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 *
 * https://leetcode-cn.com/problems/remove-linked-list-elements/description/
 *
 * algorithms
 * Easy (46.46%)
 * Likes:    467
 * Dislikes: 0
 * Total Accepted:    109.9K
 * Total Submissions: 236.6K
 * Testcase Example:  '[1,2,6,3,4,5,6]\n6'
 *
 * 删除链表中等于给定值 val 的所有节点。
 * 
 * 示例:
 * 
 * 输入: 1->2->6->3->4->5->6, val = 6
 * 输出: 1->2->3->4->5
 * 
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
 * @param {number} val
 * @return {ListNode}
 * @description 时间复杂度O(n)，空间复杂度O(1)
 */
var removeElements = function(head, val) {
  if (head === null) {
    return head;
  }
  while (head !== null && head.val === val) {
    head = head.next;
  }
  var pre = head;
  var pointer = head;
  while (pointer !== null) {
    if (pointer.val === val) {
      pre.next = pointer.next;
    } else {
      pre = pointer;
    }
    pointer = pointer.next;
  }
  return head;
};
// @lc code=end
// 哨兵节点，时间复杂度O(n)，空间复杂度O(1)
var removeElements = function (head, val) {
  if (head === null) {
    return head;
  }
  var sentry = new ListNode(null);
  sentry.next = head;
  var pre = sentry;
  var pointer = sentry;
  while (pointer !== null) {
    if (pointer.val === val) {
      pre.next = pointer.next;
    } else {
      pre = pointer;
    }
    pointer = pointer.next;
  }
  return sentry.next;
};
