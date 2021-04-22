/*
 * @lc app=leetcode.cn id=752 lang=javascript
 *
 * [752] 打开转盘锁
 *
 * https://leetcode-cn.com/problems/open-the-lock/description/
 *
 * algorithms
 * Medium (49.42%)
 * Likes:    244
 * Dislikes: 0
 * Total Accepted:    39.1K
 * Total Submissions: 79K
 * Testcase Example:  '["0201","0101","0102","1212","2002"]\n"0202"'
 *
 * 你有一个带有四个圆形拨轮的转盘锁。每个拨轮都有10个数字： '0', '1', '2', '3', '4', '5', '6', '7', '8',
 * '9' 。每个拨轮可以自由旋转：例如把 '9' 变为  '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。
 * 
 * 锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。
 * 
 * 列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。
 * 
 * 字符串 target 代表可以解锁的数字，你需要给出最小的旋转次数，如果无论如何不能解锁，返回 -1。
 * 
 * 
 * 
 * 示例 1:
 * 
 * 
 * 输入：deadends = ["0201","0101","0102","1212","2002"], target = "0202"
 * 输出：6
 * 解释：
 * 可能的移动序列为 "0000" -> "1000" -> "1100" -> "1200" -> "1201" -> "1202" -> "0202"。
 * 注意 "0000" -> "0001" -> "0002" -> "0102" -> "0202" 这样的序列是不能解锁的，
 * 因为当拨动到 "0102" 时这个锁就会被锁定。
 * 
 * 
 * 示例 2:
 * 
 * 
 * 输入: deadends = ["8888"], target = "0009"
 * 输出：1
 * 解释：
 * 把最后一位反向旋转一次即可 "0000" -> "0009"。
 * 
 * 
 * 示例 3:
 * 
 * 
 * 输入: deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"],
 * target = "8888"
 * 输出：-1
 * 解释：
 * 无法旋转到目标数字且不被锁定。
 * 
 * 
 * 示例 4:
 * 
 * 
 * 输入: deadends = ["0000"], target = "8888"
 * 输出：-1
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 死亡列表 deadends 的长度范围为 [1, 500]。
 * 目标数字 target 不会在 deadends 之中。
 * 每个 deadends 和 target 中的字符串的数字会在 10,000 个可能的情况 '0000' 到 '9999' 中产生。
 * 
 * 
 */

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 * @description 0000 下一步有八种可能，因此可以转为八叉树。在八叉树中用BFS找最近的一层
 * 最初只想到四颗二叉树，却没有想到合并为一颗八叉树
 * 时间复杂度：O(N^2 * A^N + D)O(N^2∗A^N+D)。我们用 A 表示数字的个数，N 表示状态的位数，D 表示数组 deadends 的大小。在最坏情况下，我们需要搜索完所有状态，状态的总数为 O(A^N)。对于每个状态，我们要枚举修改的位置，需要 O(N) 的时间，枚举后得到新的状态同样需要 O(N) 的时间。
 * 空间复杂度：O(A^N + D)：用来存储队列以及 deadends 的集合。
 */
 var openLock = function (deadends, target) {
  if (deadends.includes(target) || deadends.includes('0000')) {
    return -1;
  }
  const history = new Set();
  let result = 0;
  let original = [];
  const queue = ['0000'];
  history.add('0000');
  let queueLength = queue.length;
  while (queue.length) {
    for (let i = 0; i < queueLength; i++) {
      let current = queue.shift();
      if (current == target) {
        return result;
      }
      for (let j = 0; j < 4; j++) {
        original = current.split('');
        let item = parseInt(current[j]);
        let next = item + 1 > 9 ? 0 : item + 1; // 每个数字可能向上也可能向下
        original[j] = next;
        let nextStr = original.join('');
        if (!deadends.includes(nextStr) && !history.has(nextStr)) { // 不能包含deadends和已经走过的数字，否则会在0000-9999无限循环
          queue.push(nextStr);
          history.add(nextStr);
        }
        let pre = item - 1 < 0 ? 9 : item - 1; // 每个数字可能向上也可能向下
        original[j] = pre;
        let preStr = original.join('');
        if (!deadends.includes(preStr) && !history.has(preStr)) {
          queue.push(preStr);
          history.add(preStr);
        }
      }
    }
    queueLength = queue.length;
    result += 1;
  }
  return -1;
};
// @lc code=end

/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 * @description 将target转为0000，非最优解，但能解出来
 */
 var openLock = function (deadends, target) {
  const targetArray = target.split('').map((item) => parseInt(item));
  let _target = target;
  let result = 0;
  while (_target !== '0000') {
    for (let i = 0; i < targetArray.length; i++) {
      if (targetArray[i] == 0) {
        continue;
      }
      let current = targetArray[i];
      curNext = current + 1 == 10 ? 0 : current + 1;
      curPre = current - 1 == -1 ? 9 : current - 1;
      targetArray[i] = targetArray[i] > 5 ? curNext : curPre;
      let firstStep = targetArray.join('');
      if (deadends.includes(firstStep)) {
        targetArray[i] = targetArray[i] > 5 ? curPre : curNext;
      }
      _target = targetArray.join('');
      if (deadends.includes(_target)) {
        targetArray[i] = current;
      }
      result++;
    }
    if (deadends.includes(_target)) {
      return -1
    }
  }
  return result;
};