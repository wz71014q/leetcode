/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 *
 * https://leetcode.cn/problems/sort-list/description/
 *
 * algorithms
 * Medium (66.07%)
 * Likes:    1859
 * Dislikes: 0
 * Total Accepted:    365.6K
 * Total Submissions: 553.6K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。
 * 
 * 
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：head = [4,2,1,3]
 * 输出：[1,2,3,4]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：head = [-1,5,3,4,0]
 * 输出：[-1,0,3,4,5]
 * 
 * 
 * 示例 3：
 * 
 * 
 * 输入：head = []
 * 输出：[]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 链表中节点的数目在范围 [0, 5 * 10^4] 内
 * -10^5 <= Node.val <= 10^5
 * 
 * 
 * 
 * 
 * 进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
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
 * @return {ListNode}
 * 
 */
 var sortList = function (head) {
  if (!head) return head;
  let current = head; // 当前节点
  let currentPre = null;
  let min = head; // 已排序链表
  let boundary = head; // 已排序链表的最右侧边界
  while (current) {
    let fast = min; // 每次从已排序链表的最左侧开始与当前元素进行比较
    let slow = null;
    while (current.val < boundary.val) {
      if (fast.val > current.val) { // 如果发现当前元素小于fast指针，将当前元素插入到fast指针之前，结束遍历
        const currentNext = current.next;
        currentPre.next = currentNext;
        current.next = fast;
        if (slow) {
          slow.next = current;
        } else {
          min = current;
        }
        break;
      }
      slow = fast;
      fast = fast.next;
    }
    // 每次从边界之后的元素开始
    currentPre = boundary;
    current = boundary.next;
    // 更新右边界
    if (current && boundary.val <= current.val) {
      boundary = current;
    }
  }
  return min;
};
// @lc code=end

