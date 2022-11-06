/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1;
  let j = n - 1;
  let index = m + n - 1;

  for (; i >= 0 && j >= 0; ) {
    if (nums1[i] > nums2[j]) {
      nums1[index--] = nums1[i--];
    } else {
      nums1[index--] = nums2[j--];
    }
  }

  for (; j > 0; ) {
    nums1[index--] = nums2[j--];
  }

  console.log(nums1);
}
[1, 2, 3, 2, 5, 6];
// [1,2,3,0,0,0]
// 3
// [2,5,6]
// 3

merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
