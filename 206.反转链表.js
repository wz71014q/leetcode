/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
 *
 * https://leetcode-cn.com/problems/reverse-linked-list/description/
 *
 * algorithms
 * Easy (70.78%)
 * Likes:    1303
 * Dislikes: 0
 * Total Accepted:    359.6K
 * Total Submissions: 507.8K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 反转一个单链表。
 * 
 * 示例:
 * 
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 * 
 * 进阶:
 * 你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
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
 * @return {ListNode}
 */
var reverseList = function(head) {
  if (head === null) {
    return head;
  }
  var pre = head;
  var middle = head;// 最终的反转节点
  var fast = head;
  while (fast !== null) {
    pre = middle;
    middle = fast;
    fast = fast.next;
    if (pre !== middle) {
      if (pre === head) {
        pre.next = null;
      }
      middle.next = pre
    }
  }
  return middle;
};

// 头插法，将当前节点添加到最前面
var reverseList = function(head) {
  if (head === null) {
    return head;
  }
  let fast = head;
  let slow = null;
  while (fast) {
    let temp = fast.next;
    fast.next = slow;
    slow = fast;
    fast = temp;
  }
  return slow;
};
// @lc code=end

