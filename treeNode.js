// Definition for a binary tree node.
// 二叉树，方便测试
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

function BinaryTree (val, left, right) {
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

const binaryTree = new BinaryTree(1);
binaryTree.addTreeNode('left', new TreeNode(2));
binaryTree.addTreeNode('left', new TreeNode(5));
binaryTree.addTreeNode('right', new TreeNode(3));
binaryTree.addTreeNode('right', new TreeNode(8));
binaryTree.addLeft(2, 2, new TreeNode(4));
binaryTree.addRight(2, 1, new TreeNode(9));

console.log(JSON.stringify(binaryTree));
// {
//   "head": {
//     "val": 1,
//     "left": {
//       "val": 2,
//       "left": { "val": 5, "left": null, "right": null },
//       "right": { "val": 9, "left": null, "right": null }
//     },
//     "right": {
//       "val": 3,
//       "left": { "val": 4, "left": null, "right": null },
//       "right": { "val": 8, "left": null, "right": null }
//     }
//   },
//   "treeObj": {
//     "1": {
//       "1": {
//         "val": 1,
//         "left": {
//           "val": 2,
//           "left": { "val": 5, "left": null, "right": null },
//           "right": { "val": 9, "left": null, "right": null }
//         },
//         "right": {
//           "val": 3,
//           "left": { "val": 4, "left": null, "right": null },
//           "right": { "val": 8, "left": null, "right": null }
//         }
//       }
//     },
//     "2": {
//       "1": {
//         "val": 2,
//         "left": { "val": 5, "left": null, "right": null },
//         "right": { "val": 9, "left": null, "right": null }
//       },
//       "2": {
//         "val": 3,
//         "left": { "val": 4, "left": null, "right": null },
//         "right": { "val": 8, "left": null, "right": null }
//       }
//     },
//     "3": {
//       "1": { "val": 5, "left": null, "right": null },
//       "2": { "val": 9, "left": null, "right": null },
//       "3": { "val": 4, "left": null, "right": null },
//       "4": { "val": 8, "left": null, "right": null }
//     }
//   }
// }
// 前序遍历：根左右
// 中序遍历：左根右
// 后序遍历：左右根