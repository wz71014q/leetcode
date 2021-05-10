// 归并排序
var mergeSort = function(nums) {
  if (!nums || !nums.length) {
    return [];
  }
  const newArray = [].concat(nums);
  const internalMergeSort = (_nums, newArray, startIdx, endIdx) => {
    if (startIdx >= endIdx) {
      return;
    }
    let middle = parseInt((startIdx + endIdx) / 2);
    internalMergeSort(_nums, newArray, startIdx, middle); //左子数组
    internalMergeSort(_nums, newArray, middle + 1, endIdx); //右子数组
    mergeSortedArray(_nums, newArray, startIdx, middle, endIdx); //合并两个子数组
  };
  // 合并两个有序子序列
  const mergeSortedArray = (_nums, temp, start, middle, end) => {
    var i = start;
    var j = middle + 1;
    var k = 0;
    while (i <= middle && j <= end) {
      temp[k++] = _nums[i] <= _nums[j] ? _nums[i++] : _nums[j++];
    }
    while (i <= middle) {
      temp[k++] = _nums[i++];
    }
    while (j <= end) {
      temp[k++] = _nums[j++];
    }
    //把数据复制回原数组
    for (i = 0; i < k; ++i) {
      _nums[start + i] = temp[i];
    }
  };
  internalMergeSort(nums, newArray, 0, nums.length - 1);
  return nums;
};

console.log('mergeSort', mergeSort([5, 2, 1, 6, 8, 3, 2, 0]));
