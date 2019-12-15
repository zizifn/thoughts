 //给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。 
//
// 示例: 
//
// 输入: [0,1,0,3,12]
//输出: [1,3,12,0,0] 
//
// 说明: 
//
// 
// 必须在原数组上操作，不能拷贝额外的数组。 
// 尽量减少操作次数。 
// 
// Related Topics 数组 双指针
  
  package com.james.leetcodejava.leetcode.editor.cn;
  public class MoveZeroes{

      // 有一个滚雪球的方案，看起来不错。
      // 下面是双指针。。

      public static void main(String[] args) {

          int i = 1;
          int temp = i++;

          int j =1;
          int temp2 = ++j;

           Solution solution = new MoveZeroes().new Solution();
          int[] nums = new int[]{0,0,1,0,3,12};
          nums = new int[]{1,3,12};
          solution.moveZeroes(nums);
          for (int num: nums
          ) {
              System.out.println(num);

          }
      }
      

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public void moveZeroes(int[] nums) {
        int nonzeroLocation = 0;
        for (int i = 0, numsLength = nums.length; i < numsLength; i++) {
            int num = nums[i];
            if (num != 0) {
                int temp = nums[nonzeroLocation];
                nums[nonzeroLocation] = num;
                nums[i] = temp;
                nonzeroLocation = nonzeroLocation + 1;
            }

        }
        
    }
}
//leetcode submit region end(Prohibit modification and deletion)

  }