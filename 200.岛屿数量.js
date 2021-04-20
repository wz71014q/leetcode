/*
 * @lc app=leetcode.cn id=200 lang=javascript
 *
 * [200] 岛屿数量
 *
 * https://leetcode-cn.com/problems/number-of-islands/description/
 *
 * algorithms
 * Medium (52.76%)
 * Likes:    1102
 * Dislikes: 0
 * Total Accepted:    236.7K
 * Total Submissions: 443.3K
 * Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
 *
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 
 * 此外，你可以假设该网格的四条边均被水包围。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：grid = [
 * ⁠ ["1","1","1","1","0"],
 * ⁠ ["1","1","0","1","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","0","0","0"]
 * ]
 * 输出：1
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：grid = [
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["1","1","0","0","0"],
 * ⁠ ["0","0","1","0","0"],
 * ⁠ ["0","0","0","1","1"]
 * ]
 * 输出：3
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * m == grid.length
 * n == grid[i].length
 * 1 
 * grid[i][j] 的值为 '0' 或 '1'
 * 
 * 
 */

// @lc code=start
/**
 * @param {character[][]} grid
 * @return {number}
 * @ 广度优先遍历，时间复杂度O(MN)，空间复杂度O(min(M,N))
 */
 var numIslands = function (grid) {
  if (!grid || !grid.length) {
    return 0;
  }
  let result = 0;
  const m = grid.length;
  let n = grid[0].length;
  let queue = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == '1') {
        result++;
        queue.push(`${i}-${j}`);
        while(queue.length) {
          let current = queue.shift().split('-');
          let row = parseInt(current[0]);
          let col = parseInt(current[1]);
          if (grid[row] && grid[row][col - 1] == '1') {
            grid[row][col - 1] = '0';
            queue.push(`${row}-${col-1}`);
          }
          if (grid[row] && grid[row][col + 1] == '1') {
            grid[row][col + 1] = '0';
            queue.push(`${row}-${col+1}`);
          }
          if (grid[row - 1] && grid[row - 1][col] == '1') {
            grid[row - 1][col] = '0';
            queue.push(`${row-1}-${col}`);
          }
          if (grid[row + 1] && grid[row + 1][col] == '1') {
            grid[row + 1][col] = '0';
            queue.push(`${row+1}-${col}`);
          }
        }
      }
    }
  }
  return result;
};
// @lc code=end

