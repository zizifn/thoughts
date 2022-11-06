function validMountainArray(arr: number[]): boolean {
  if (arr.length < 3) return false;
  let index = 0;
  let rightMount = false;
  let leftMount = true;

  for (let i = 1; i < arr.length; i++, index++) {
    if (arr[i] === arr[index]) {
      return false;
    }
    if (rightMount) {
      if (arr[i] > arr[index]) {
        return false;
      }
      continue;
    }

    if (arr[i] < arr[index]) {
      if (i == 1) {
        leftMount = false;
      }
      rightMount = true;
    }
  }

  return leftMount && rightMount;
}

// console.log(validMountainArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]));
console.log(validMountainArray([1, 7, 9, 5, 4, 1, 2]));
// There exists some i with 0 < i < arr.length - 1 such that:
// arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
// arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
