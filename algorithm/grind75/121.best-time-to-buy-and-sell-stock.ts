/*
 * @lc app=leetcode id=121 lang=typescript
 *
 * [121] Best Time to Buy and Sell Stock
 */

// @lc code=start
function maxProfit(prices: number[]): number {
  const min = Math.min(prices);
  const minIndex = prices.findIndex((price) => price === min);

  const max = Math.max(prices.slice(minIndex));
  if (max < min) {
    return 0;
  } else {
    return max - min;
  }
}
// @lc code=end
