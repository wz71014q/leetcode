// 链表，方便测试
export function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val);
  this.next = (next === undefined ? null : next);
}

// 根据数组生成链表
function getLinkedList(arr) {
  const head = new ListNode();
  const times = arr.length;
  let point = head;
  for (let i = 0; i < times; i++) {
    point.next = new ListNode(arr[i]);
    point = point.next;
  }
  return head.next;
}
const data = [4, 1, 2, -3, 2, 2, 5];
const list = getLinkedList(data);


export function LinkedList() {
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

// Definition for a binary tree node.
// 二叉树，方便测试
export function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

export function BinaryTree (val, left, right) {
  this.head = new TreeNode(val, left, right);
  this.treeObj = {
    1: {
      1: this.head
    }
  };
}
// 树尽头添加节点
BinaryTree.prototype.addTreeNode = function(direction, treeNode) {
  var node = this.head;
  var nowRow = 2;
  if (direction === 'right') {
    while (node.right && node.right.val) {
      nowRow++;
      node = node.right;
    }
    node.right = treeNode;
  } else {
    while (node.left && node.left.val) {
      nowRow++;
      node = node.left;
    }
    node.left = treeNode;
  }
  if (!this.treeObj[nowRow]) {
    this.treeObj[nowRow] = {};
  }
  var nowColumn = direction === 'right' ? Math.pow(2, nowRow - 1) : 1;
  this.treeObj[nowRow][nowColumn] = treeNode;
}
// 指定行列添加节点, 第一行第一列为(1, 1)
BinaryTree.prototype.addLeft = function(row, column, treeNode) {
  this.treeObj[row][column].left = treeNode;
  if (!this.treeObj[row + 1]) {
    this.treeObj[row + 1] = {};
  }
  this.treeObj[row + 1][column * 2 - 1] = treeNode;
}
// 指定行列添加节点, 第一行第一列为(1, 1)
BinaryTree.prototype.addRight = function(row, column, treeNode) {
  this.treeObj[row][column].right = treeNode;
  if (!this.treeObj[row + 1]) {
    this.treeObj[row + 1] = {};
  }
  this.treeObj[row + 1][column * 2] = treeNode;
}
