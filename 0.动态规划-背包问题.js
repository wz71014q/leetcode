function backpack(maxWeight, goods, worth, weights) {
  let result = [];
  const dp = [];
  for (let i = 0; i < goods.length; i++) {
    dp[i] = [];
  }
  for (let i = 0; i < goods.length; i++) {
    for (let j = 0; j <= maxWeight; j++) {
      if (i == 0) {
        dp[i][j] = weights[i] <= j ? worth[i] : 0; // 只有一件物品时的初始值
      } else {
        let topValue = dp[i - 1][j]; // 上一个网格的值
        let thisValue;
        if (weights[i] <= j) {
          // worth[i] + dp[i - 1][j - weights[i]] 指的是当前产品价值+剩余重量的最佳产品价值
          thisValue = weights[i] < j ? worth[i] + dp[i - 1][j - weights[i]] : Math.max(worth[i] + dp[i - 1][j - weights[i]], worth[i]);
        } else {
          thisValue = topValue;
        }
        dp[i][j] = Math.max(topValue, thisValue); // 返回 topValue和thisValue中较大的一个
      }
    }
  }
  console.log(dp);
  return result;
}
const maxWeight = 4;
const goods = ['G', 'S', 'L', 'I', 'M'];
const worth = [1500, 3000, 2000, 2000, 1000];
const weights = [1, 4, 3, 1, 1];
console.log(backpack(maxWeight, goods, worth, weights));
// 重量    0, 1,    2,    3,    4
//物品 [ [ 0, 1500, 1500, 1500, 1500 ],
//   G   [ 0, 1500, 1500, 1500, 3000 ],
//   G   [ 0, 1500, 1500, 2000, 3500 ],
//   G   [ 0, 2000, 3500, 3500, 4000 ],
//   G   [ 0, 2000, 3500, 4500, 4500 ] ]