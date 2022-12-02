/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
 var reverseBetween = function(head, left, right) {
  if ((left === right) || !head.next) {
    return head;
  }
  const guard = new ListNode();
  guard.next = head;
  let fast = guard;
  let slow = null;
  let start = guard;
  let startLast = null;
  let nodeNumber = 0; // 节点数，与快指针同步
  while (fast) {
    if (nodeNumber === left) {
      start = fast;
      startLast = slow;
    }
    while (nodeNumber > left && nodeNumber <= right) {
      let temp = fast.next;
      fast.next = slow;
      slow = fast;
      fast = temp;
      nodeNumber++;
    }
    if (nodeNumber === right + 1) {
      start.next = fast;
      startLast.next = slow;
    }
    if (fast) {
      slow = fast;
      fast = fast.next;
      nodeNumber++;
    }
  }
  return guard.next;
};

// 头插法，不用遍历所有节点
var reverseBetween = function(head, left, right) {
  const guard = new ListNode(-1);
  guard.next = head;
  let pre = guard;
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next;
  }

  let cur = pre.next;
  for (let i = 0; i < right - left; i++) {
    const next = cur.next;
    cur.next = next.next;
    next.next = pre.next;
    pre.next = next;
  }
  return guard.next;
};
// @lc code=end
