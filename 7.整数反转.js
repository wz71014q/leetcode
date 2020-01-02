/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */
const number = 1534236469;
// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let result;
  const numberString = `${Math.abs(x)}`;
  const numberArray = numberString.split('').reverse();
  const maxReference = 2 ** 31 - 1;
  const minReference = -(2 ** 31);
  result = Number(numberArray.join(''));
  result = x < 0 ? `-${result}` : result
  if (result > maxReference || result < minReference) {
    result = 0;
  }
  return result;
}
// @lc code=end
console.log(reverse(number))

// 不用转化字符串的解法
const number = -123;
var reverse = function(x) {
  var bb = 0;
  var max = Math.pow(2,31);
  var min = (-1)*Math.pow(2,31);
  while (x) {
      bb = bb*10+x%10;
      x = x/10>>0; // 取整，最好使用Math.floor等数学方法处理，没有越界问题
  }
  if(bb < min || bb > max){
     bb = 0;
  }
  return bb
};
console.log(reverse(number))