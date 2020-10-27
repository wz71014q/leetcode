/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (40.43%)
 * Likes:    1084
 * Dislikes: 0
 * Total Accepted:    274.1K
 * Total Submissions: 677.7K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * 
 * 示例：
 * 
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 * 
 * 
 * 说明：
 * 
 * 给定的 n 保证是有效的。
 * 
 * 进阶：
 * 
 * 你能尝试使用一趟扫描实现吗？
 * 
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
 * @param {number} n
 * @return {ListNode}
 * @description 双指针法，快指针每次走n步，快指针到头后慢指针正好在需要删除的点上，时间复杂度O(L)，空间复杂度O(1)
 */
var removeNthFromEnd = function(head, n) {
  if (head === undefined || head === null) {
    return head;
  }
  var slow = head;
  var fast = head;
  for (var i = 0; i < n; i++) {
    fast = fast.next;
  }
  while (fast !== null && fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  if (fast === null) {
    head = head.next;
  } else {
    slow.next = slow.next.next;
  }
  return head;
};
// @lc code=end
// 思路清晰版
var removeNthFromEnd = function (head, n) {
  if (head === undefined || head === null || n <= 0) {
    return head;
  }
  var slow = head; // 慢指针
  var fast = head; // 快指针
  var pre = head; // 慢指针之前的节点
  for (var i = 1; i < n; i++) {
    fast = fast.next;
  }
  while (fast.next !== null) {
    pre = slow;
    slow = slow.next;
    fast = fast.next;
  }
  if (pre === slow) {
    head = head.next;
  } else {
    pre.next = pre.next.next;
  }
  return head;
};