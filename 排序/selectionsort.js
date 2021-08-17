// 选择排序，先选一个最小/大的，再循环对比调换位置。时间复杂度O(n^2)，空间复杂度O(1)
var selectionsort = function(nums) {
  if (!nums.length) {
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        let temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
      }
    }
  }
  return nums;
};

const nums = [3, 9, 10, 6, 1, 8, 0];
console.log(selectionsort(nums));
