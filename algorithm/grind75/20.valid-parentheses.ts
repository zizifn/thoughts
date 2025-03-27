/*
 * @lc app=leetcode id=20 lang=typescript
 *
 * [20] Valid Parentheses
 */

// @lc code=start
function isValid(s: string): boolean {
  const right = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  const left = [];
  for (let i = 0; i < s.length; i++) {
    if (right.has(s[i])) {
      const match = left.pop();
      if (right.get(s[i]) === match) {
        continue;
      } else {
        return false;
      }
    } else {
      left.push(s[i]);
    }
  }

  return left.length === 0;
}
// @lc code=end
