/*
 * @lc app=leetcode.cn id=133 lang=javascript
 *
 * [133] 克隆图
 *
 * https://leetcode-cn.com/problems/clone-graph/description/
 *
 * algorithms
 * Medium (66.43%)
 * Likes:    354
 * Dislikes: 0
 * Total Accepted:    60.5K
 * Total Submissions: 90.3K
 * Testcase Example:  '[[2,4],[1,3],[2,4],[1,3]]\n[[]]\n[]'
 *
 * 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
 * 
 * 图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。
 * 
 * class Node {
 * ⁠   public int val;
 * ⁠   public List<Node> neighbors;
 * }
 * 
 * 
 * 
 * 测试用例格式：
 * 
 * 简单起见，每个节点的值都和它的索引相同。例如，第一个节点值为 1（val = 1），第二个节点值为 2（val =
 * 2），以此类推。该图在测试用例中使用邻接列表表示。
 * 
 * 邻接列表 是用于表示有限图的无序列表的集合。每个列表都描述了图中节点的邻居集。
 * 
 * 给定节点将始终是图中的第一个节点（值为 1）。你必须将 给定节点的拷贝 作为对克隆图的引用返回。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
 * 输出：[[2,4],[1,3],[2,4],[1,3]]
 * 解释：
 * 图中有 4 个节点。
 * 节点 1 的值是 1，它有两个邻居：节点 2 和 4 。
 * 节点 2 的值是 2，它有两个邻居：节点 1 和 3 。
 * 节点 3 的值是 3，它有两个邻居：节点 2 和 4 。
 * 节点 4 的值是 4，它有两个邻居：节点 1 和 3 。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 
 * 输入：adjList = [[]]
 * 输出：[[]]
 * 解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
 * 
 * 
 * 示例 3：
 * 
 * 输入：adjList = []
 * 输出：[]
 * 解释：这个图是空的，它不含任何节点。
 * 
 * 
 * 示例 4：
 * 
 * 
 * 
 * 输入：adjList = [[2],[1]]
 * 输出：[[2],[1]]
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 节点数不超过 100 。
 * 每个节点值 Node.val 都是唯一的，1 <= Node.val <= 100。
 * 无向图是一个简单图，这意味着图中没有重复的边，也没有自环。
 * 由于图是无向的，如果节点 p 是节点 q 的邻居，那么节点 q 也必须是节点 p 的邻居。
 * 图是连通图，你可以从给定节点访问到所有节点。
 * 
 * 
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 * @description BFS， 时间复杂度O(n)，空间复杂度O(n)
 */
 var cloneGraph = function (node) {
  if (!node) {
    return null;
  }
  const history = new Map();
  const queue = [node];
  while (queue.length) {
    let current = queue.shift();
    let newNode;
    if (!history.has(current.val)) {
      newNode = new Node(current.val);
      history.set(newNode.val, newNode);
    } else {
      newNode = history.get(current.val);
    }
    for (let i = 0; i < current.neighbors.length; i++) {
      if (!history.has(current.neighbors[i].val)) {
        let neighbor = new Node(current.neighbors[i].val);
        newNode.neighbors.push(neighbor);
        history.set(current.neighbors[i].val, neighbor);
        queue.push(current.neighbors[i]);
      } else {
        newNode.neighbors.push(history.get(current.neighbors[i].val));
      }
    }
  }
  return history.get(node.val);
};
// @lc code=end
/**
 * @param {Node} node
 * @return {Node}
 * @description DFS， 时间复杂度O(n)，空间复杂度O(n)
 */
 var cloneGraph = function (node) {
  if (!node) {
    return null;
  }
  const history = new Map();
  const stack = [node];
  let current = node;
  while (stack.length) {
     // 找准一条路一直走下去
    while (current && !history.has(current.val)) {
      let newNode = new Node(current.val);
      history.set(newNode.val, newNode);
      for (var i = 0; i < current.neighbors.length; i++) {
        if (!history.has(current.neighbors[i].val)) {
          current = current.neighbors[i];
          stack.push(current);
          break;
        }
      }
    }
    // 走到头开始回退
    current = stack.pop();
    let newCurrent = history.get(current.val);
    for (var i = 0; i < current.neighbors.length; i++) {
      if (!history.has(current.neighbors[i].val)) {
        let newNode = new Node(current.neighbors[i].val);
        history.set(newNode.val, newNode);
        newCurrent.neighbors.push(newNode);
        stack.push(current.neighbors[i]); // 回退过程中发现分岔路口，走进去
      } else {
        newCurrent.neighbors.push(history.get(current.neighbors[i].val));
      }
    }
  }
  return history.get(node.val);
};
