// 插入排序, 时间复杂度O(n^2)，空间复杂度O(1)
var insertionSorting = function(nums) {
  for (let i = 0, j = 0; i < nums.length; i++, j++) {
    while (nums[j - 1] && nums[j - 1] > nums[j]) { // 从当前元素开始依次往前遍历，将当前值插入到合适位置
      let temp = nums[j];
      nums[j] = nums[j - 1];
      nums[j - 1] = temp;
      j--;
    }
    j = i;
  }
  return nums;
};

