// 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
// 青蛙跳上1级台阶有1种方案，跳上2级台阶有2种方案，青蛙跳上n级台阶时，最后跳的为1阶或2阶
// 设跳上n阶的总方案为f(n)，则f(n) = f(n - 1) + f(n - 2);
function climbStairs(n) {
  const dp = [1, 1, 2];
  if (n <= 2) {
    return dp[n];
  }
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
  }
  return dp[n];
}

const result = climbStairs(44);
console.log('result', result);

// 我们能用的的只有所求元素的前两位，所以不需要单独维护一个数组
function climbStairs(n) {
  if (n <= 1) {
    return 1;
  }
  let f_n_1 = 1;
  let f_n_2 = 1;
  let f_n = 0;
  for (let i = 2; i <= n; i++) {
    f_n = (f_n_1 + f_n_2) % 1000000007;
    f_n_1 = f_n_2;
    f_n_2 = f_n;
  }
  return f_n;
}