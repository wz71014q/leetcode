// 希尔排序，根据增量序列delta，时间复杂度O(N^1.5)，空间复杂度O(1)
function shellSort(arr) {
  let delta = 1;
  while (delta < arr.length / 3) {
    delta = delta * 3 + 1; // <O(n^(3/2)) by Knuth,1973>: 1, 4, 13, 40, 121, ...
  }
  let temp;
  for (; delta >= 1; delta = parseInt(delta / 3)) {
    for (let i = delta; i < arr.length; i++) {
      for (let j = i; j >= delta; j = j - delta) {
        if (arr[j] < arr[j - delta]) {
          temp = arr[j - delta];
          arr[j - delta] = arr[j];
          arr[j] = temp;
        }
      }
    } //loop i
  } //loop delta
  return arr;
}
console.log('shellSort, ', shellSort([9, 4, 1, 6, 2, 3, 5, 8]));
