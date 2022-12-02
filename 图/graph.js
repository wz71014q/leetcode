// 图
// 节点1分别连接2、3、4、5；节点2分别连接1、4；节点3分别连接1、5；节点4分别连接1、2、5；节点5分别连接1、3、4。

// 邻接矩阵表示法，见 https://leetcode.cn/leetbook/read/illustration-of-algorithm/50e446/

// 邻接表表示法
// 顶点集合
const vertices = [1, 2, 3, 4, 5];
const edges = [
  [1, 2, 3, 4], // vertices[0] = 1, 1跟2、3、4、5连接，即vertices[1], vertices[2], vertices[3], vertices[4]
  [0, 3], // vertices[0] = 2, 2跟1、4连接，即vertices[0], vertices[3]
  [0, 4],
  [0, 1, 4],
  [0, 2, 3],
];
