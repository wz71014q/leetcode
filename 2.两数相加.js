/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (38.76%)
 * Likes:    5185
 * Dislikes: 0
 * Total Accepted:    611.2K
 * Total Submissions: 1.6M
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 *
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 *
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 *
 * 示例：
 *
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
 *
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

// 该题实际是将求和时进位向左改为向右，因此思路为链表各部分相加，短的一条自动续上0，时间复杂度O(Max(m, n))，空间复杂度O(Max(m, n) - Min(m, n))
var addTwoNumbers = function (l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }
  var linked1 = l1;
  var linked2 = l2;
  var carry = false; // 标记进位
  while (linked1 !== null && linked2 !== null) {
    var variable1 = linked1.val;
    var variable2 = linked2.val;
    var sum = carry ? variable1 + variable2 + 1 : variable1 + variable2;
    carry = sum > 9;
    // 这里两条链表的值都改为和，方便后续选取长链表
    linked1.val = carry ? sum % 10 : sum;
    linked2.val = carry ? sum % 10 : sum;
    // 如果有进位但是有一个链表已到头，手动续上，注意节点值为0，因为进位已在前面相加
    if (carry && linked1.next == null) {
      linked1.next = new ListNode(0);
    }
    if (carry && linked2.next == null) {
      linked2.next = new ListNode(0);
    }
    linked1 = linked1.next;
    linked2 = linked2.next;
  }
  var sumLinked = linked1 === null ? l2 : l1; // 结果选长的一条链表
  return sumLinked;
};
// @lc code=end

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 * @description 暴力破解，较小数可用。原本想暴力破解，即先转为数字，相加后再转为所需结果。但碰到大数，JS会自动转为科学计数法，比如1000000000000000000000000000001，转为1e+30，如果继续使用该方法，需要新增科学计数法的转换方法。
 */
var addTwoNumbers = function (l1, l2) {
  if (l1 == null) {
    return l2;
  }
  if (l2 == null) {
    return l1;
  }
  var linked1 = l1;
  var linked2 = l2;
  var num1 = [];
  var num2 = [];
  while (linked1 !== null || linked2 !== null) {
    if (linked1 !== null) {
      num1.push(linked1.val);
      linked1 = linked1.next;
    }
    if (linked2 !== null) {
      num2.push(linked2.val);
      linked2 = linked2.next;
    }
  }
  num1 = num1.reverse().join('');
  num2 = num2.reverse().join('');
  var num3 = Number(num1) + Number(num2);
  num3 = (num3 + '').split('').reverse();
  var sum = new ListNode(num3[0]);
  var pointer = sum;
  for (var i = 1; i < num3.length; i++) {
    pointer.next = new ListNode(num3[i]);
    pointer = pointer.next;
  }
  return sum;
};
