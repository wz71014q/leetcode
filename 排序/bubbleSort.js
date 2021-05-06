// 标准版冒泡排序，时间复杂度O(N^2), 空间复杂度O(1);
var bubbleSort = function(nums) {
  if (!nums.length) {
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
  }
  return nums;
};

const nums = [3, 30, 0, 5, 34, 5, 9];
console.log(bubbleSort(nums));

// 改进版冒泡排序，时间复杂度最坏为O(N^2), 最好为O(1)。 空间复杂度O(1);
var bubbleSort = function(nums) {
  if (!nums.length) {
    return '';
  }
  let isOrdered = true; // 用来标记是否发生过排序，如果没有，那么原数列就是正序
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        isOrdered = false;
        let temp = nums[j];
        nums[j] = nums[j + 1];
        nums[j + 1] = temp;
      }
    }
    if (isOrdered) {
      return nums;
    }
  }
  return nums;
};

const nums = [3, 4, 5, 6, 7, 8, 0];
console.log(bubbleSort(nums));
