/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (58.84%)
 * Likes:    818
 * Dislikes: 0
 * Total Accepted:    168.5K
 * Total Submissions: 284.8K
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
 *
 * 示例：
 *
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * @description 审题没注意。。。该题求解的是合并两个有序链表，不需要排序。这里的解法是合并两个无序链表。先合并两个链表，再进行排序.排序方法：取一个元素，遍历后续节点，与之对比，小的放前面，大的再对已排序链表进行遍历排序，最大时间复杂度O(m*n + m), 空间复杂度O(1)
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 == null) {
    return l2;
  }
  if (l2 == null) {
    return l1;
  }
  var mergeLinked = l1;
  var linked1 = l1;
  var linked2 = l2;
  while (linked1.next !== null) {
    linked1 = linked1.next;
  }
  linked1.next = linked2; // 合并完成
  /*** 排序 start ***/
  mergeLinked = mergeLinked.next;
  var order = l1;
  order.next = null;
  while (mergeLinked !== null) {
    if (mergeLinked.val <= order.val) {
      var transfer = order;
      order = mergeLinked;
      mergeLinked = mergeLinked.next;
      order.next = transfer;
    } else {
      var self = order;
      var pre = self;
      while (self !== null && mergeLinked.val > self.val) {
        pre = self;
        self = self.next;
      }
      pre.next = mergeLinked;
      mergeLinked = mergeLinked.next;
      pre.next.next = self;
    }
  }
  /*** 排序 end ***/
  return order;
};
// @lc code=end
// 迭代法合并有序链表，注意两个链表中的指针不是同时走的。最大时间复杂度O(m + n)，空间复杂度O(1)
var mergeTwoLists = function(l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;
  var linked1 = l1;
  var linked2 = l2;
  var merged = new ListNode(null);
  var last = merged;
  while (linked1 !== null && linked2 !== null) {
    if (linked1.val <= linked2.val) {
      last.next = linked1;
      linked1 = linked1.next;
    } else {
      last.next = linked2;
      linked2 = linked2.next;
    }
    last = last.next;
  }
  last.next = linked1 === null ? linked2 : linked1;
  return merged.next;
};