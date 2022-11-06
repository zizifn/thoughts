function removeElement(nums: number[], val: number): number {
  let index = 0;
  for (const num of nums) {
    if (num !== val) {
      nums[index++] = num;
    }
  }

  return index;
}

// removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
removeElement([1], 1);

// Input: nums = [0,1,2,2,3,0,4,2], val = 2
// Output: 5, nums = [0,1,4,0,3,_,_,_]
