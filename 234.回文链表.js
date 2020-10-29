/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 *
 * https://leetcode-cn.com/problems/palindrome-linked-list/description/
 *
 * algorithms
 * Easy (43.56%)
 * Likes:    745
 * Dislikes: 0
 * Total Accepted:    164.9K
 * Total Submissions: 367.3K
 * Testcase Example:  '[1,2]'
 *
 * 请判断一个链表是否为回文链表。
 * 
 * 示例 1:
 * 
 * 输入: 1->2
 * 输出: false
 * 
 * 示例 2:
 * 
 * 输入: 1->2->2->1
 * 输出: true
 * 
 * 
 * 进阶：
 * 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
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
 * @return {boolean}
 * @description 记录所有值，再反转，遍历并对比val，时间复杂度O(2n) = O(n)，空间复杂度O(n)
 */
var isPalindrome = function(head) {
  if (head === null) {
    return head;
  }
  var pre = head;
  var reverse = head;// 最终的反转节点
  var fast = head;
  var hashTable = [];
  while (fast !== null) {
    pre = reverse;
    reverse = fast;
    hashTable.push(fast.val);
    fast = fast.next;
    if (pre !== reverse) {
      if (pre === head) {
        pre.next = null;
      }
      reverse.next = pre
    }
  }
  for (var i = 0; i < hashTable.length; i++) {
    if (hashTable[i] !== reverse.val) {
      return false;
    }
    reverse = reverse.next;
  }
  if (reverse !== null) {
    return false;
  }
  return true;
};
// @lc code=end

// 既然已经放到数组了，那直接判断数组元素就行了O.O，不需要反转链表了
var isPalindrome = function(head) {
  if (head === null) {
    return true;
  }
  var pointer = head;
  var valArray = [];
  while (pointer !== null) {
    valArray.push(pointer.val);
    pointer = pointer.next;
  }
  for (var i = 0, j = valArray.length - 1; i < j; i++, j--) {
    if (valArray[i] !== valArray[j]) {
      return false;
    }
  }
  return true;
};

// 递归解法，时间复杂度O(n)，空间复杂度O(n)
const recursivelyCheck = (currentNode) => {
  if (currentNode !== null) {
    if (currentNode.next === null) { // 这个节点已经是最后一个节点了，不会再有下一层了，此时开始pop出堆栈内的值进行比较
      console.log('current', currentNode.val, recursivelyCheck(currentNode.next));
    }
    if (!recursivelyCheck(currentNode.next)) {
      return false;
    }
    if (currentNode.val !== frontPointer.val) {
      return false;
    }
    frontPointer = frontPointer.next;
  }
  return true;
};

var isPalindrome = function (head) {
  frontPointer = head;
  return recursivelyCheck(head);
};


// 时间复杂度为O(n)，空间复杂度为O(1)的解法
const reverseList = (head) => {
  let prev = null;
  let curr = head;
  while (curr !== null) {
      let nextTemp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextTemp;
  }
  return prev;
}

const endOfFirstHalf = (head) => {
  let fast = head;
  let slow = head;
  while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next;
      slow = slow.next;
  }
  return slow;
}

var isPalindrome = function(head) {
  if (head == null) return true;

  // 找到前半部分链表的尾节点并反转后半部分链表
  const firstHalfEnd = endOfFirstHalf(head);
  const secondHalfStart = reverseList(firstHalfEnd.next);

  // 判断是否回文
  let p1 = head;
  let p2 = secondHalfStart;
  let result = true;
  while (result && p2 != null) {
      if (p1.val != p2.val) result = false;
      p1 = p1.next;
      p2 = p2.next;
  }

  // 还原链表并返回结果
  firstHalfEnd.next = reverseList(secondHalfStart);
  return result;
};
