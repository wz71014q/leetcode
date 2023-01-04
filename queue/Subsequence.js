// 用链表实现一个单调递减队列

function ListNode(val) {
  this.val = val;
  this.next = null;
}

var MaxQueue = function() {
  this.queue = null;
  this.maxVal = null;
  this.maxNode = null;
  this.queueLength = 0;
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  return !this.queue ? -1 : this.queue.val;
};

/**
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  const newNode = new ListNode(value);
  if (!this.queue) {
    this.queue = newNode;
  } else {
    let slow = null;
    let fast = this.queue;
    while (fast) {
      if (fast.val < newNode.val) {
        if (slow) {
          slow.next = newNode;
          newNode.next = fast;
        } else {
          newNode.next = fast;
          this.queue = newNode;
        }
        break;
      }
      slow = fast;
      fast = fast.next;
    }
    if (!fast) {
      slow.next = newNode;
    }
  }
  if (!this.maxVal || value > this.maxVal) {
    this.maxVal = value;
    this.maxNode = newNode;
  }
  this.queueLength++;
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  const linkedList = this.queue;
  if (!linkedList) return -1;
  let slow = linkedList;
  let fast = slow.next;
  this.queue = fast;
  this.queueLength--;
  if (this.maxVal === slow.val) {
    this.maxVal = fast.val;
    this.maxNode = fast;
  }
  return slow.val;
};

/**
 * Your MaxQueue object will be instantiated and called as such:
 * var obj = new MaxQueue()
 * var param_1 = obj.max_value()
 * obj.push_back(value)
 * var param_3 = obj.pop_front()
 */

var obj = new MaxQueue();
obj.push_back(4);
obj.push_back(2);
obj.push_back(1);
obj.push_back(3);
obj.push_back(5);
console.log('obj', obj);
console.log('max_value', obj.max_value());
obj.pop_front();
console.log('obj1', obj);
console.log('max_value1', obj.max_value());
