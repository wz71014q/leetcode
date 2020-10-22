/*
 * @lc app=leetcode.cn id=707 lang=javascript
 *
 * [707] 设计链表
 *
 * https://leetcode-cn.com/problems/design-linked-list/description/
 *
 * algorithms
 * Medium (28.34%)
 * Likes:    180
 * Dislikes: 0
 * Total Accepted:    29.8K
 * Total Submissions: 103.6K
 * Testcase Example:  '["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"]\n[[],[1],[3],[1,2],[1],[1],[1]]'
 *
 * 设计链表的实现。您可以选择使用单链表或双链表。单链表中的节点应该具有两个属性：val 和 next。val 是当前节点的值，next
 * 是指向下一个节点的指针/引用。如果要使用双向链表，则还需要一个属性 prev 以指示链表中的上一个节点。假设链表中的所有节点都是 0-index 的。
 * 
 * 在链表类中实现这些功能：
 * 
 * 
 * get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
 * addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
 * addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
 * addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index
 * 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
 * deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * MyLinkedList linkedList = new MyLinkedList();
 * linkedList.addAtHead(1);
 * linkedList.addAtTail(3);
 * linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
 * linkedList.get(1);            //返回2
 * linkedList.deleteAtIndex(1);  //现在链表是1-> 3
 * linkedList.get(1);            //返回3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 所有val值都在 [1, 1000] 之内。
 * 操作次数将在  [1, 1000] 之内。
 * 请不要使用内置的 LinkedList 库。
 * 
 * 
 */

// @lc code=start
var LinkedNode = function(value) {
  this.val = value;
  this.next = null;
}

var MyLinkedList = function() {
  this.head = new LinkedNode(null);
  this.linkedLength = 0;
  this.maxLength = 2000;
}

MyLinkedList.prototype.get = function(index) {
  var result = this.head
  for (var i = 0; i <= index; i++) {
    result = result.next
    if (!result) {
      result = {
        val: -1
      }
      break;
    }
  }
  return result.val;
};

MyLinkedList.prototype.addAtHead = function(val) {
  if (this.linkedLength >= this.maxLength || val > 1000) {
    return;
  }
  var headNode = this.head;
  var originFirst = headNode.next
  var newFirst = new LinkedNode(val)
  newFirst.next = originFirst
  headNode.next = newFirst;
  this.linkedLength ++;
};

MyLinkedList.prototype.addAtTail = function(val) {
  if (this.linkedLength >= this.maxLength || val > 1000) {
    return;
  }
  var result = this.head
  for (var i = 0; i <= this.linkedLength; i++) {
    if (result && !result.next) {
      result.next = new LinkedNode(val)
    } else {
      result = result.next
    }
  }
  this.linkedLength ++;
};

MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (this.linkedLength >= this.maxLength || val > 1000 || index < 0 || index > this.linkedLength) {
    return;
  }
  if (index === this.linkedLength) {
    this.addAtTail(val)
    return
  } else {
    var result = this.head
    for (var i = 0; i < index; i++) {
      if (result) {
        result = result.next
      } else {
        break;
      }
    }
    var newNode = new LinkedNode(val)
    var middleNode = result.next
    result.next = newNode
    newNode.next = middleNode
    this.linkedLength ++;
  }
};
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (this.linkedLength >= this.maxLength || index < 0 || index > this.linkedLength - 1) {
    return;
  }
  var originNode = this.head
  var nextNode = this.head.next
  for (var i = 0; i < index; i++) {
    originNode = nextNode
    nextNode = originNode.next
  }
  originNode.next = nextNode.next
  this.linkedLength --;
};
/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end