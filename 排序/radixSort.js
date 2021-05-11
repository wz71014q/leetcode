// 基数排序法。假设位数最高为2位
function radixSort(numbers) {
  const doubleNumbers = []; // 补位之后的数组
  const radix1 = []; // 以个位数为基数的排序结果
  const result = []; // 最终结果，也是以十位数为基数的排序结果
  let history = {};
  for (let i = 0; i < numbers.length; i++) {
    let current = numbers[i] < 10 ? `0${numbers[i]}` : `${numbers[i]}`;
    doubleNumbers.push(current);
  }
  for (let i = 0; i < doubleNumbers.length; i++) {
    if (!history[doubleNumbers[i][1]]) {
      history[doubleNumbers[i][1]] = [doubleNumbers[i]];
    } else {
      history[doubleNumbers[i][1]].push(doubleNumbers[i]);
    }
  }
  for (let key in history) { // 先对以个位数为基数的进行排序
    history[key].forEach((item) => {
      radix1.push(item);
    });
  }
  history = {};
  for (let i = 0; i < radix1.length; i++) {
    if (!history[radix1[i][0]]) {
      history[radix1[i][0]] = [radix1[i]];
    } else {
      history[radix1[i][0]].push(radix1[i]);
    }
  }
  for (let key in history) { // 再对以十位数为基数的进行排序
    history[key].forEach((item) => {
      result.push(parseInt(item));
    });
  }
  return result;
}
console.log('radixSort, ', radixSort([9, 4, 1, 6, 2, 0, 3, 15, 8, 2]));
