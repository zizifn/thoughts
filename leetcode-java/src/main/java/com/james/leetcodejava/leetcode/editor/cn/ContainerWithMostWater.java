//给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
//
// 说明：你不能倾斜容器，且 n 的值至少为 2。 
//
// 
//
// 图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。 
//
// 
//
// 示例: 
//
// 输入: [1,8,6,2,5,4,8,3,7]
//输出: 49 
// Related Topics 数组 双指针

package com.james.leetcodejava.leetcode.editor.cn;

public class ContainerWithMostWater {
    public static void main(String[] args) {
        Solution solution = new ContainerWithMostWater().new Solution();
        int[] nums = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        int i = solution.maxArea(nums);
        System.out.println(i);


    }


//leetcode submit region begin(Prohibit modification and deletion)

    class Solution {
        public int maxArea(int[] height) {
            int maxArea = 0;
            for (int i = 0, j = height.length -1; i < j; ) {
                int temp = (j - i) * Math.min(height[i], height[j]);
                maxArea = Math.max(maxArea, temp);

                //  面积的大小，是由最短的那一条高决定的，
                //  所以，要移动最短的哪个高，这样才有可能获得比之前大的面积。
                if(height[i] < height[j]){
                    i++;
                }else {
                    j--;
                }
            }

            return maxArea;
        }
    }

    // 没有什么好解释的，穷举每一个可能，然后找最大。
class Solution2 {
    public int maxArea(int[] height) {
        int maxArea = 0;
        for (int i = 0; i < height.length -1; i++) {
            for (int j = i+1; j < height.length; j++) {
                int temp = (j - i) * Math.min(height[i], height[j]);

                maxArea = Math.max(maxArea, temp);
            }
        }
        return maxArea;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

}