// 蛋糕问题
// 重量 0 1 2 3 4 5 6
// 售价 0 2 3 6 7 11 15
// 设重量为n的售价为p(n)，最高售价为f(n)，f(0)=0，f(1)=p(1)
// 重量为n的蛋糕划分之后,
// 剩余的最后一块蛋糕可能为：0, 1, 2, 3, 4, 5, 6；
// 对应的已划分最高售价为f(n), f(n - 1), f(n - 2), f(n - 3), f(n - 4), f(n - 5), f(n - 6)；
// 最终最高售价就在p(0) + f(n - 0), p(1) + f(n - 1), p(2) + f(n - 2), p(3) + f(n - 3), p(4) + f(n - 4), p(5) + f(n - 5), p(5) + f(n - 6)中寻找。
// f(n) = (0 <= i < n)max(f(i) + p(n - i))
// 最优子结构
function getOptimal(n) {
  const priceMap = {
    0: 0,
    1: 2,
    2: 3,
    3: 6,
    4: 7,
    5: 11,
    6: 15
  };
  const maxPriceMap = {
    0: 0,
    1: 2
  };
  const dp = function (lastWeight) {
    if (lastWeight <= 1) {
      return priceMap[lastWeight];
    }
    let maxPrice = 0;
    for (let i = 0; i < lastWeight; i++) {
      const f_i = maxPriceMap[i] !== undefined ? maxPriceMap[i] : dp(i);
      const p_n_i = priceMap[lastWeight - i] !== undefined ? priceMap[lastWeight - i] : 0;
      maxPrice = Math.max(maxPrice, f_i + p_n_i);
    }
    maxPriceMap[lastWeight] = maxPrice;
    return maxPrice;
  };
  return dp(n);
}

const result = getOptimal(7);
console.log(result);

// 2: maxPriceMap[2] = max(maxPriceMap[0] + priceMap[2], maxPriceMap[1] + priceMap[1])
// 3: maxPriceMap[3] = max(maxPriceMap[0] + priceMap[3], maxPriceMap[1] + priceMap[2], maxPriceMap[2] + priceMap[1])
// ...
// 7: maxPriceMap[7] = max(maxPriceMap[0] + priceMap[7], maxPriceMap[1] + priceMap[6], maxPriceMap[2] + priceMap[5], maxPriceMap[3] + priceMap[4], maxPriceMap[4] + priceMap[3], maxPriceMap[5] + priceMap[2], maxPriceMap[6] + priceMap[1]);
function getMaxPrice(n) {
  const priceMap = {
    0: 0,
    1: 2,
    2: 3,
    3: 6,
    4: 7,
    5: 11,
    6: 15
  };
  const maxPriceMap = {
    0: 0,
    1: 2
  };
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const preMax = maxPriceMap[i] || 0;
      const preiceValue = priceMap[i - j] || 0;
      maxPriceMap[i] = Math.max(preMax, maxPriceMap[j] + preiceValue);
    }
  }
  return maxPriceMap[n];
}

const result1 = getMaxPrice(2);
console.log(result1);
