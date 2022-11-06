function removeDuplicates(nums: number[]): number {
  let index = 0;
  let pervious = Number.MAX_VALUE;
  for (let num of nums) {
    if (num !== pervious) {
      nums[index++] = num;
      pervious = num;
    }
  }
  console.log(index);

  return index;
}
removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
// Input: nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
