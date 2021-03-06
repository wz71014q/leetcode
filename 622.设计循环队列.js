/*
 * @lc app=leetcode.cn id=622 lang=javascript
 *
 * [622] 设计循环队列
 *
 * https://leetcode-cn.com/problems/design-circular-queue/description/
 *
 * algorithms
 * Medium (42.64%)
 * Likes:    182
 * Dislikes: 0
 * Total Accepted:    51.6K
 * Total Submissions: 119.9K
 * Testcase Example:  '["MyCircularQueue","enQueue","enQueue","enQueue","enQueue","Rear","isFull","deQueue","enQueue","Rear"]\n[[3],[1],[2],[3],[4],[],[],[],[4],[]]'
 *
 * 设计你的循环队列实现。 循环队列是一种线性数据结构，其操作表现基于
 * FIFO（先进先出）原则并且队尾被连接在队首之后以形成一个循环。它也被称为“环形缓冲器”。
 *
 *
 * 循环队列的一个好处是我们可以利用这个队列之前用过的空间。在一个普通队列里，一旦一个队列满了，我们就不能插入下一个元素，即使在队列前面仍有空间。但是使用循环队列，我们能使用这些空间去存储新的值。
 *
 * 你的实现应该支持如下操作：
 *
 *
 * MyCircularQueue(k): 构造器，设置队列长度为 k 。
 * Front: 从队首获取元素。如果队列为空，返回 -1 。
 * Rear: 获取队尾元素。如果队列为空，返回 -1 。
 * enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
 * deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
 * isEmpty(): 检查循环队列是否为空。
 * isFull(): 检查循环队列是否已满。
 *
 *
 *
 *
 * 示例：
 *
 * MyCircularQueue circularQueue = new MyCircularQueue(3); // 设置长度为 3
 * circularQueue.enQueue(1);  // 返回 true
 * circularQueue.enQueue(2);  // 返回 true
 * circularQueue.enQueue(3);  // 返回 true
 * circularQueue.enQueue(4);  // 返回 false，队列已满
 * circularQueue.Rear();  // 返回 3
 * circularQueue.isFull();  // 返回 true
 * circularQueue.deQueue();  // 返回 true
 * circularQueue.enQueue(4);  // 返回 true
 * circularQueue.Rear();  // 返回 4
 *
 *
 *
 * 提示：
 *
 *
 * 所有的值都在 0 至 1000 的范围内；
 * 操作数将在 1 至 1000 的范围内；
 * 请不要使用内置的队列库。
 *
 *
 */

// @lc code=start
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.queue = new Array(k).fill(null);
  this.front = 0; // 队列头部index
  this.itemLength = 0; // 队列内元素实际长度
  this.queueLength = k; // 队列总长
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  let result = false;
  if (this.itemLength < this.queueLength) {
    result = true;
    let idx = this.front;
    for (let i = 0; i < this.queueLength; i++, idx++) {
      if (idx > this.queueLength - 1) {
        idx = 0;
      }
      if (this.queue[idx] === null) {
        this.queue[idx] = value;
        this.itemLength++;
        return result;
      }
    }
  }
  return result;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  let result = false;
  if (this.itemLength > 0) {
    result = true;
    this.queue[this.front] = null;
    this.front = this.front === this.queueLength - 1 ? 0 : this.front + 1;
    this.itemLength--;
  }
  return result;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  let result = -1;
  if (this.itemLength > 0) {
    result = this.queue[this.front];
  }
  return result;
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  let result = -1;
  if (this.itemLength > 0) {
    let idx = this.front;
    for (let i = 0; i < this.itemLength; i++, idx++) {
      if (idx > this.queueLength - 1) {
        idx = 0;
      }
      result = this.queue[idx];
    }
  }
  return result;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.itemLength === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return this.itemLength === this.queueLength;
};

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
// @lc code=end

class MyCircularQueue {
  constructor(k) {
    this.list = Array(k); // 创建一个长度为k的空数组
    this.front = 0; // 保存头部指针位置
    this.real = 0; // 保存尾部指针位置
    this.max = k; // 保存该数组最大长度，也就是k
  }
  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.list[this.front];
  }
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    let val = this.real - 1 >= 0 ? this.real - 1 : this.max - 1;
    return this.list[val];
  }
  enQueue(value) {
    if (!this.isFull()) {
      this.list[this.real] = value;
      this.real = (this.real + 1) % this.max; // 注意这种改变指针位置的方式
      return true;
    } else {
      return false;
    }
  }
  deQueue() {
    if (!this.isEmpty()) {
      this.list[this.front] = '';
      this.front = (this.front + 1) % this.max;
      return true;
    } else {
      return false;
    }
  }
  isEmpty() {
    if (this.real === this.front && !this.list[this.front]) {
      return true;
    } else {
      return false;
    }
  }
  isFull() {
    if (this.real === this.front && !!this.list[this.front]) {
      return true;
    } else {
      return false;
    }
  }
}
