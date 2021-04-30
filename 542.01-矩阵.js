/*
 * @lc app=leetcode.cn id=542 lang=javascript
 *
 * [542] 01 矩阵
 *
 * https://leetcode-cn.com/problems/01-matrix/description/
 *
 * algorithms
 * Medium (45.47%)
 * Likes:    414
 * Dislikes: 0
 * Total Accepted:    50.8K
 * Total Submissions: 111.7K
 * Testcase Example:  '[[0,0,0],[0,1,0],[0,0,0]]'
 *
 * 给定一个由 0 和 1 组成的矩阵，找出每个元素到最近的 0 的距离。
 * 
 * 两个相邻元素间的距离为 1 。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：
 * [[0,0,0],
 * ⁠[0,1,0],
 * ⁠[0,0,0]]
 * 
 * 输出：
 * [[0,0,0],
 * [0,1,0],
 * [0,0,0]]
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：
 * [[0,0,0],
 * ⁠[0,1,0],
 * ⁠[1,1,1]]
 * 
 * 输出：
 * [[0,0,0],
 * ⁠[0,1,0],
 * ⁠[1,2,1]]
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 给定矩阵的元素个数不超过 10000。
 * 给定矩阵中至少有一个元素是 0。
 * 矩阵中的元素只在四个方向上相邻: 上、下、左、右。
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[][]}
 * @description 这种查找最优解一般用BFS。时间复杂度O(rc)，空间复杂度O(rc)。其中 r 为矩阵行数，c 为矩阵列数，即矩阵元素个数。
 */
 var updateMatrix = function(mat) {
  let top, right, bottom, left;
  const rowLength = mat.length;
  if (!rowLength) {
    return [];
  }
  const colLength = mat[0].length;
  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      if (mat[row][col] !== 0) {
        let path = 0;
        let queue = [[row, col]];
        let queueLength = queue.length;
        while (queue.length) {
          for (let i = 0; i < queueLength; i++) {
            let current = queue.shift();
            let row = current[0];
            let col = current[1];
            if (mat[row][col] == 0) {
              queue = [];
              break;
            }
            top = row - 1;
            right = col + 1;
            bottom = row + 1;
            left = col - 1;
            // 上
            if (mat[top] !== undefined && mat[top][col] !== undefined) {
              queue.push([top, col]);
            }
            // 右
            if (mat[bottom] !== undefined && mat[bottom][col] !== undefined) {
              queue.push([bottom, col]);
            }
            // 下
            if (mat[row] !== undefined && mat[row][right] !== undefined) {
              queue.push([row, right]);
            }
            // 左
            if (mat[row] !== undefined && mat[row][left] !== undefined) {
              queue.push([row, left]);
            }
          }
          queueLength = queue.length;
          path = queueLength > 0 ? path + 1 : path; // 在for循环中进行的是否为0判断，break之后这里会多运算一次，所以需要判断queue是否为空
        }
        mat[row][col] = path;
      }
    }
  }
  return mat;
};
// @lc code=end

