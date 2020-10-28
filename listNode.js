// 链表，方便测试
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function LinkedList() {
  this.head = new ListNode(null); // 哨兵节点
  this.linkedLength = 0;
  this.maxLength = 2000;
}

LinkedList.prototype.addAtTail = function (val) {
  if (this.linkedLength >= this.maxLength) {
    return;
  }
  var result = this.head;
  while (result.next !== null) {
    result = result.next;
  }
  result.next = new ListNode(val);
  this.linkedLength++;
};

const myLinkedList = new LinkedList();
myLinkedList.addAtTail(5);
myLinkedList.addAtTail(4);
myLinkedList.addAtTail(1);
myLinkedList.addAtTail(3);
myLinkedList.addAtTail(2);

const myList = new ListNode(8);
myList.next = new ListNode(0);
myList.next.next = new ListNode(7);
myList.next.next.next = new ListNode(6);
myList.next.next.next.next = new ListNode(9);
console.log(JSON.stringify(myLinkedList), JSON.stringify(myList));
