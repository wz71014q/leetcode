// 快速排序, 时间复杂度O(NlogN), 空间复杂度O(NlogN)
var quickSort = function(nums) {
  if (!nums.length) {
    return nums;
  }
  let mySort = function(_nums, leftIdx, rightIdx) {
    if (leftIdx >= rightIdx) {
      return;
    }
    let middle = _nums[leftIdx]; // 选定第一个数为中位数
    let moveNums = 0; // 用来表示中位数移动了几位
    for (let i = leftIdx, j = i; i < _nums.length; i++, j++) {
      if (_nums[i] < middle) {
        while (j - moveNums > leftIdx) { // 将小于选定的中位数移到中位数前面
          let tem = _nums[j];
          _nums[j] = _nums[j - 1];
          _nums[j - 1] = tem;
          j--;
        }
        j = i;
        moveNums++;
      }
    }
    mySort(_nums, leftIdx, leftIdx + moveNums - 1); // 递归排序中位数之前的数字
    mySort(_nums, leftIdx + moveNums + 1, rightIdx); // 递归排序中位数之后的数字
    return _nums;
  };
  return mySort(nums, 0, nums.length - 1);
};

const nums = [1, 3, 5, 9, 2, 4, 6, 3];
console.log(quickSort(nums));
