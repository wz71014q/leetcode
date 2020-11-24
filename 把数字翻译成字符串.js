// 剑指 Offer 46. 把数字翻译成字符串
// 给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 “b”，……，11 翻译成 “l”，……，25 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。

//  

// 示例 1:

// 输入: 12258
// 输出: 5
// 解释: 12258有5种不同的翻译，分别是"bccfi", "bwfi", "bczi", "mcfi"和"mzi"
//  

// 提示：

// 0 <= num < 231

/**
 * @param {number} num
 * @return {number}
 * @description 该题与爬楼梯类似，使用动态规划法，状态转移方程是dp(i) = dp(i - 1) + dp(i - 2)，但要排除不合法的数字组合
 * 时间复杂度O(n)，空间复杂度O(n)
 */
var translateNum = function (num) {
  var bigger = num % 100 > 25 || num % 100 < 10; // 排除大于25的或者06这种
  var numsArray = `${num}`.split('');
  var arrayLength = numsArray.length;
  if (arrayLength <= 2) {
    return num <= 25 ? arrayLength : 1;
  }
  // 排除大于25的或者06这种
  return bigger ? translateNum(parseInt(num / 10)) : translateNum(parseInt(num / 10)) + translateNum(parseInt(num / 100));
};

// TODO 优化算法