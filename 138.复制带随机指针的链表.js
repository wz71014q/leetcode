/*
 * @lc app=leetcode.cn id=138 lang=javascript
 *
 * [138] 复制带随机指针的链表
 *
 * https://leetcode-cn.com/problems/copy-list-with-random-pointer/description/
 *
 * algorithms
 * Medium (57.61%)
 * Likes:    418
 * Dislikes: 0
 * Total Accepted:    50.3K
 * Total Submissions: 86.9K
 * Testcase Example:  '[[7,null],[13,0],[11,4],[10,2],[1,0]]'
 *
 * 给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。
 *
 * 要求返回这个链表的 深拷贝。
 *
 * 我们用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：
 *
 *
 * val：一个表示 Node.val 的整数。
 * random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 * 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：head = [[1,1],[2,1]]
 * 输出：[[1,1],[2,1]]
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：head = [[3,null],[3,0],[3,null]]
 * 输出：[[3,null],[3,0],[3,null]]
 *
 *
 * 示例 4：
 *
 * 输入：head = []
 * 输出：[]
 * 解释：给定的链表为空（空指针），因此返回 null。
 *
 *
 *
 *
 * 提示：
 *
 *
 * -10000 <= Node.val <= 10000
 * Node.random 为空（null）或指向链表中的节点。
 * 节点数目不超过 1000 。
 *
 *
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 * 这道题花了我近三个多小时才解开。。。思路很清晰，但总是有各种细节要考虑，而且有循环对象，JS自测比较麻烦。
 * 思路：1、按顺序先创建random节点，再创建一个数组存放已知链表节点；2、顺着原链表往下走，如下一个节点或下一个节点的random节点已存在，直接连接即可，如果不存在(包含新节点和random节点)，则创建新节点并存放数组内
 * 时间复杂度：O(L*n)，L是节点数量，n是因为需要遍历已储存random节点2次，如果用字典存储已有节点，时间复杂度为O(L)
 * 空间复杂度: O(L+L+L) = O(L)，新的链表占L，存储已有节点的数组占L
 */
var copyRandomList = function (head) {
  if (head === null) {
    return head;
  }
  var current = head;
  var copyLinked = new Node(null, null, null); // 哨兵节点
  var result = copyLinked;
  var random = null;
  var oldRandomArray = []; // 存放旧节点已知节点，用来在newRandomArray查找index
  var newRandomArray = []; // 存放新链表中已知节点
  while (current !== null) {
    if (current.random !== null) {
      // 如果当前节点的random节点不存在，创建新节点并存储
      if (oldRandomArray.indexOf(current.random) < 0) {
        random = new Node(current.random.val, null, null);
        oldRandomArray.push(current.random);
        newRandomArray.push(random);
      } else {
        // 如果当前节点的random节点已存在，直接使用
        var index = oldRandomArray.indexOf(current.random);
        random = newRandomArray[index];
      }
    } else {
      random = null;
    }
    // 连接节点
    if (oldRandomArray.indexOf(current) < 0) {
      copyLinked.next = new Node(current.val, null, random);
      oldRandomArray.push(current);
      newRandomArray.push(copyLinked.next);
    } else {
      var index = oldRandomArray.indexOf(current);
      copyLinked.next = newRandomArray[index];
      copyLinked.next.random = random;
    }
    current = current.next;
    copyLinked = copyLinked.next;
  }
  return result.next;
};
// @lc code=end
// 采用字典存储已有节点
var copyRandomList = function (head) {
  if (head === null) {
    return head;
  }
  var current = head;
  var copyLinked = new Node(null, null, null); // 哨兵节点
  var result = copyLinked;
  var random = null;
  var dictionary = new Map();
  while (current !== null) {
    if (current.random !== null) {
      if (!dictionary.has(current.random)) {
        random = new Node(current.random.val, null, null);
        dictionary.set(current.random, random);
      } else {
        random = dictionary.get(current.random);
      }
    } else {
      random = null;
    }
    if (!dictionary.has(current)) {
      copyLinked.next = new Node(current.val, null, random);
      dictionary.set(current, copyLinked.next);
    } else {
      copyLinked.next = dictionary.get(current);
      copyLinked.next.random = random;
    }
    current = current.next;
    copyLinked = copyLinked.next;
  }
  return result.next;
};