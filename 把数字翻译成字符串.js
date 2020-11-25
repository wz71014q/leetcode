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
 * @description 普通递归，从上往下，依赖于下一个节点的值
 * 时间复杂度O(Math.pow(2, n))，空间复杂度O(n)
 * 存在重复计算的问题，子树计算优化可以参考二叉树
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

// 优化算法
// 一、存储已知值的递归
// 将已知的值存起来，减少运算次数，时间复杂度O(n)，空间复杂度O(n)
var translateNum = function (num) {
  var memory = {};
  var dfs = function (num) {
    if (memory[num]) {
      return memory[num];
    }
    var invalid = num % 100 > 25 || num % 100 < 10; // 排除大于25的或者06这种
    var numsArray = `${num}`.split('');
    var arrayLength = numsArray.length;
    if (arrayLength <= 2) {
      return num <= 25 ? arrayLength : 1;
    }
    memory[num] = (invalid ? dfs(parseInt(num / 10)) : dfs(parseInt(num / 10)) + dfs(parseInt(num / 100)));
    return memory[num];
  }
  return dfs(num);
};

// 二、动态规划，从下往上(画出树的结构，从最下面已知的case开始)，由已知结果求上面的问题，时间复杂度O(n)，空间复杂度O(1)
// 状态转移方程是dp(i) = dp(i - 1) + dp(i - 2); (10 <= num <= 25)
//              dp(i) = dp(i - 1); (num > 25)
var translateNum = function (num) {
  var str = `${num}`;
  var numLength = str.length;
  if (numLength < 2) {
    return numLength;
  }
  var result = 0;
  var f0 = 1;
  var f1 = 1;
  var curNumber = 0;
  for (var i = 2; i <= numLength; i++) {
    curNumber = Number(str[i - 2] + str[i - 1]);
    if (curNumber > 9 && curNumber < 26) {
      result = f1 + f0;
    } else {
      result = f1;
    }
    f0 = f1;
    f1 = result;
  }
  return result;
};