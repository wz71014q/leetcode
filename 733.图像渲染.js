/*
 * @lc app=leetcode.cn id=733 lang=javascript
 *
 * [733] 图像渲染
 *
 * https://leetcode-cn.com/problems/flood-fill/description/
 *
 * algorithms
 * Easy (57.92%)
 * Likes:    179
 * Dislikes: 0
 * Total Accepted:    44.4K
 * Total Submissions: 76.7K
 * Testcase Example:  '[[1,1,1],[1,1,0],[1,0,1]]\n1\n1\n2'
 *
 * 有一幅以二维整数数组表示的图画，每一个整数表示该图画的像素值大小，数值在 0 到 65535 之间。
 * 
 * 给你一个坐标 (sr, sc) 表示图像渲染开始的像素值（行 ，列）和一个新的颜色值 newColor，让你重新上色这幅图像。
 * 
 * 
 * 为了完成上色工作，从初始坐标开始，记录初始坐标的上下左右四个方向上像素值与初始坐标相同的相连像素点，接着再记录这四个方向上符合条件的像素点与他们对应四个方向上像素值与初始坐标相同的相连像素点，……，重复该过程。将所有有记录的像素点的颜色值改为新的颜色值。
 * 
 * 最后返回经过上色渲染后的图像。
 * 
 * 示例 1:
 * 
 * 
 * 输入: 
 * image = [[1,1,1],[1,1,0],[1,0,1]]
 * sr = 1, sc = 1, newColor = 2
 * 输出: [[2,2,2],[2,2,0],[2,0,1]]
 * 解析: 
 * 在图像的正中间，(坐标(sr,sc)=(1,1)),
 * 在路径上所有符合条件的像素点的颜色都被更改成2。
 * 注意，右下角的像素没有更改为2，
 * 因为它不是在上下左右四个方向上与初始点相连的像素点。
 * 
 * 
 * 注意:
 * 
 * 
 * image 和 image[0] 的长度在范围 [1, 50] 内。
 * 给出的初始点将满足 0 <= sr < image.length 和 0 <= sc < image[0].length。
 * image[i][j] 和 newColor 表示的颜色值在范围 [0, 65535]内。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 * @description DFS，时间复杂度O(N*M)其中 N 和 M 分别是二维数组的行数和列数，空间复杂度O(N*M)其中 N 和 M 分别是二维数组的行数和列数
 */
 var floodFill = function(image, sr, sc, newColor) {
  const history = new Map();
  const stack = [[sr, sc]];
  const originColor = image[sr][sc];
  if (originColor == newColor) {
    return image;
  }
  let current = [sr, sc];
  let top, right, bottom, left;
  let row, col;
  while (stack.length) {
    while (image[current[0]] !== undefined && image[current[0]][current[1]] !== undefined && !history.has(`${current[0]}${current[1]}`)) {
      row = parseInt(current[0]);
      col = parseInt(current[1]);
      history.set(`${row}${col}`, 1);
      top = row - 1;
      right = col + 1;
      bottom = row + 1;
      left = col - 1;
      if (image[top] !== undefined && image[top][col] == originColor) { // 上
        stack.push([top, col]);
        current = [top, col];
      }
      if (image[bottom] !== undefined && image[bottom][col] == originColor) { // 右
        stack.push([bottom, col]);
        current = [bottom, col];
      }
      if (image[row] !== undefined && image[row][right] == originColor) { // 下
        stack.push([row, right]);
        current = [row, right];
      }
      if (image[row] !== undefined && image[row][left] == originColor) { // 左
        stack.push([row, left]);
        current = [row, left];
      }
    }
    current = stack.pop();
    row = parseInt(current[0]);
    col = parseInt(current[1]);
    image[row][col] = newColor;
  }
  return image;
};
// @lc code=end

// BFS
function floodFill(image, sr, sc, newColor) {
  var dx = [1, 0, 0, -1];
  var dy = [0, 1, -1, 0];
  var currColor = image[sr][sc];
  if (currColor == newColor) {
    return image;
  }
  var n = image.length,
    m = image[0].length;
  let queue = [];
  queue.push([sr, sc]);
  image[sr][sc] = newColor;
  while (queue.length) {
    let cell = queue.shift();
    var x = cell[0],
      y = cell[1];
    for (var i = 0; i < 4; i++) {
      var mx = x + dx[i],
        my = y + dy[i];
      if (mx >= 0 && mx < n && my >= 0 && my < m && image[mx][my] == currColor) {
        queue.push([mx, my]);
        image[mx][my] = newColor;
      }
    }
  }
  return image;
}