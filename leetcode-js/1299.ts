function replaceElements(arr: number[]): number[] {
  const result: number[] = [];
  let max = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] !== max) {
      max = -1;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] > max) {
          max = arr[j];
        }
      }
    }
    result.push(max);
  }

  return result;
}

console.log(replaceElements([17, 18, 5, 4, 6, 1]));
// console.log(replaceElements([400]));
