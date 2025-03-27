/*
 * @lc app=leetcode id=21 lang=typescript
 *
 * [21] Merge Two Sorted Lists
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function mergeTwoLists(
  list1: ListNode | null,
  list2: ListNode | null
): ListNode | null {
  if (!list1) {
    return list2;
  }
  if (!list2) {
    return list1;
  }
  let head1 = list1;
  let head2 = list2;
  let newList = null;
  for (let i = 0; head1.next !== null; i++) {
    const current = head1;
    for (let j = 0; head2.next !== null; j++) {
      if (current.val < head2.val) {
        // move head1
        head1 = head1.next;
        current.next = head2;
        newList = current;
      } else {
        head2.next = head2.next;
      }
    }
  }
  head2.next = head1;
  return newList;
}
// @lc code=end
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
