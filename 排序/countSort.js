// 计数排序，时间复杂度O(n)，空间复杂度O(n)
function countSort(numbers) {
  const history = {};
  const result = [];
  for (let i = 0; i < numbers.length; i++) {
    if (!history[numbers[i]]) {
      history[numbers[i]] = 1;
    } else {
      history[numbers[i]] = history[numbers[i]] + 1;
    }
  }
  for (let key in history) {
    let num = history[key];
    while (num > 0) {
      result.push(parseInt(key));
      num--;
    }
  }
  return result;
}
console.log('countSort, ', countSort([9, 4, 1, 6, 2, 3, 5, 8, 2]));
