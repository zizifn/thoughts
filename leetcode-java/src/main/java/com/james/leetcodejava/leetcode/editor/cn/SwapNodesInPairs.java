 //给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。 
//
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。 
//
// 
//
// 示例: 
//
// 给定 1->2->3->4, 你应该返回 2->1->4->3.
// 
// Related Topics 链表
  
  package com.james.leetcodejava.leetcode.editor.cn;
  public class SwapNodesInPairs{
      public static void main(String[] args) {
           Solution solution = new SwapNodesInPairs().new Solution();
          ListNode head = new ListNode(1);
          ListNode head2 = new ListNode(2);
          ListNode head3 = new ListNode(3);
          ListNode head4 = new ListNode(4);
          ListNode head5 = new ListNode(5);

          head.next = head2;
//          head2.next = head3;
//          head3.next = head4;
//          head4.next = head5;
//          head5.next = null;

          ListNode listNode = solution.swapPairs(head);

          for (int i = 0; listNode != null; i++) {
              System.out.println(listNode.val);
              listNode = listNode.next;

          }
      }


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {

    public ListNode swapPairs(ListNode head) {

        if(head == null || head.next == null){
            return head;
        }
        ListNode newHead = new ListNode(-1);
        newHead.next = head;
        head = newHead;

        for( int i = 0; head.next !=null && head.next.next !=null ; i++, head = head.next.next) {

            ListNode tempHead = head.next.next;
            head.next.next = tempHead.next;
            tempHead.next = head.next;
            head.next = tempHead;
        }
        return newHead.next;

    }

    public ListNode swapPairs2(ListNode head) {
        if(head== null || head.next == null){
            return head;
        }
        ListNode newHead = null;
        ListNode evenElement = null;
        for (int i = 1; head.next !=null; head = head.next, i++) {

            // if meet odd element, switch element后继续循环
            if(i%2 ==1 ){
                //swap the linked list element
                ListNode next = head.next;
                head.next = head.next.next;
                next.next = head;
                head = next;

                // 处理第一个基数element
                if(newHead == null){
                    newHead = head;
                    evenElement = next;
                }else {
                    evenElement.next = head;
                }
            }else {
                // 记录每次的偶数元素，以保持linked list的连贯性。
                evenElement = head;
            }

        }

        return newHead;
    }
}
//leetcode submit region end(Prohibit modification and deletion)

      public static class ListNode {
          int val;
          ListNode next;

          ListNode(int x) {
              val = x;
          }
      }
  }