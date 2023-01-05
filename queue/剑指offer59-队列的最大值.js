// 请定义一个队列并实现函数 max_value 得到队列里的最大值，要求函数max_value、push_back 和 pop_front 的均摊时间复杂度都是O(1)。

// 若队列为空，pop_front 和 max_value 需要返回 -1

// 示例 1：

// 输入: 
// ["MaxQueue","push_back","push_back","max_value","pop_front","max_value"]
// [[],[1],[2],[],[],[]]
// 输出: [null,null,null,2,1,2]
// 示例 2：

// 输入: 
// ["MaxQueue","pop_front","max_value"]
// [[],[],[]]
// 输出: [null,-1,-1]
//  

// 限制：

// 1 <= push_back,pop_front,max_value的总操作数 <= 10000
// 1 <= value <= 10^5


// 使用对象模拟队列
var MaxQueue = function() {
  this.queue = {};
  this.maxVal = null;
  this.queueLength = 0;
  this.index = 0; // 需要保证队列的index是递增的
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  return this.queueLength === 0 ? -1 : this.maxVal;
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  this.queue[this.index] = value;
  if (!this.maxVal || this.maxVal < value) {
    this.maxVal = value;
  }
  this.index++;
  this.queueLength++;
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if (this.queueLength === 0) {
    return -1;
  }
  let result = null;
  for (let key in this.queue) {
    if (!result) {
      result = this.queue[key];
      delete this.queue[key];
      break;
    }
  }
  this.queueLength--;
  if (result === this.maxVal) {
    this.maxVal = null;
    for (let key in this.queue) {
      if (!this.maxVal || this.queue[key] > this.maxVal) {
        this.maxVal = this.queue[key];
      }
    }
  }
  return result;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */

var obj = new MaxQueue();
obj.push_back(46);
obj.max_value();
obj.push_back(868);
obj.push_back(869);
obj.pop_front();
console.log('obj', obj.max_value());



// 使用数组的队列和双端队列实现
var MaxQueue = function() {
  this.queue = [];
  this.deque = [];
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  return this.deque.length ? this.deque[0] : -1;
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  this.queue.push(value);
  const dequeLength = this.deque.length;
  for (let i = dequeLength - 1; i >= 0; i--) {
    if (this.deque[i] < value) {
      this.deque.pop();
    }
  }
  this.deque.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if (!this.queue.length) {
    return -1;
  }
  const value = this.queue.shift();
  if (value === this.deque[0]) {
    this.deque.shift();
  }
  return value;
};