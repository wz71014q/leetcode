// 给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算其所有整数的移动平均值。

// 示例:

// MovingAverage m = new MovingAverage(3);
// m.next(1) = 1
// m.next(10) = (1 + 10) / 2
// m.next(3) = (1 + 10 + 3) / 3
// m.next(5) = (10 + 3 + 5) / 3

function MovingAverage(n) {
  this.queue = [];
  this.queueLength = n;
}

MovingAverage.prototype.next = function (m) {
  let result = m;
  if (this.queue.length >= this.queueLength) {
    this.queue.shift();
  }
  this.queue.push(m);
  const total = this.queue.reduce((pre, cur) => {
    return pre + cur;
  });
  result = total / this.queue.length;
  return result;
};
