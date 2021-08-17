// 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

// 示例 1:

// 输入: [10,2]
// 输出: "102"
// 示例 2:

// 输入: [3,30,34,5,9]
// 输出: "3033459"
// 提示:

// 0 < nums.length <= 100
// 说明:

// 输出结果可能非常大，所以你需要返回一个字符串而不是整数
// 拼接起来的数字可能会有前导 0，最后结果不需要去掉前导 0

// leetcode解题思路
// 若拼接字符串 x + y > y + x ，则 x “大于” y ；
// 反之，若 x + y < y + x ，则 x “小于” y ；
// x “小于” y 代表：排序完成后，数组中 x 应在 y 左边；“大于” 则反之。
var minNumber = function (nums) {
  if (nums.length <= 0) {
    return '';
  }
  let min;
  let result = '';
  for (var i = 0; i < nums.length; i++) {
    for (var j = i; j < nums.length; j++) {
      if (parseInt(`${nums[j]}${nums[i]}`) < parseInt(`${nums[i]}${nums[j]}`)) {
        let temp = nums[j];
        nums[j] = nums[i];
        nums[i] = temp;
      }
    }
  }
  result = nums.join('');
  return result;
};
