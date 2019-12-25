//反转一个单链表。
//
// 示例: 
//
// 输入: 1->2->3->4->5->NULL
//输出: 5->4->3->2->1->NULL 
//
// 进阶: 
//你可以迭代或递归地反转链表。你能否用两种方法解决这道题？
// Related Topics 链表

package com.james.leetcodejava.leetcode.editor.cn;

public class ReverseLinkedList {
    public static void main(String[] args) {
        Solution solution = new ReverseLinkedList().new Solution();

        ListNode head = new ListNode(1);
        ListNode head2 = new ListNode(2);
        ListNode head3 = new ListNode(3);
        ListNode head4 = new ListNode(4);
        ListNode head5 = new ListNode(5);

        head.next = head2;
        head2.next = head3;
        head3.next = head4;
        head4.next = head5;
        head5.next = null;

        ListNode listNode = solution.reverseList(head);

        for (int i = 0; listNode != null; i++) {
            System.out.println(listNode.val);
            listNode = listNode.next;

        }

    }


//leetcode submit region begin(Prohibit modification and deletion)

    /**
     * Definition for singly-linked list.
     * public class ListNode {
     * int val;
     * ListNode next;
     * ListNode(int x) { val = x; }
     * }
     */
    class Solution {

        private ListNode reverseList(ListNode head) {
            if (head == null || head.next == null) {
                return head;
            }
            ListNode p = reverseList(head.next);
            head.next.next = head;
            head.next = null;
            return p;
        }
    }

    class Solution2 {
        public ListNode reverseList(ListNode head) {
            // 先定义一个新的头部，然后依次对这个经行操作。
            ListNode newHead = null;
            for (int i = 0; head !=null ; i++) {
                ListNode temp = head;
                head = head.next;
                temp.next = newHead;
                newHead = temp;

            }
            return newHead;
        }
    }

    class Solution1 {
        public ListNode reverseList(ListNode head) {
            return reverseList(null, head);
        }
        /*
        * 尾递归就是把循环，翻译成递归。中间的变量，依靠参数传进去。
        * */
        private ListNode reverseList(ListNode newHead, ListNode head) {
            if(head == null){
                return newHead;
            }
            ListNode next = head.next;
            head.next = newHead;
            return reverseList(head, next);
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