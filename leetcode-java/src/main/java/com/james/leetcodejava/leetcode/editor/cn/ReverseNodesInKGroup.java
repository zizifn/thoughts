//给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
//
// k 是一个正整数，它的值小于或等于链表的长度。 
//
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。 
//
// 示例 : 
//
// 给定这个链表：1->2->3->4->5 
//
// 当 k = 2 时，应当返回: 2->1->4->3->5 
//
// 当 k = 3 时，应当返回: 3->2->1->4->5 
//
// 说明 : 
//
// 
// 你的算法只能使用常数的额外空间。 
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。 
// 
// Related Topics 链表

package com.james.leetcodejava.leetcode.editor.cn;

import com.james.leetcodejava.leetcode.editor.cn.comm.ListNode;

public class ReverseNodesInKGroup {
    public static void main(String[] args) {
        Solution solution = new ReverseNodesInKGroup().new Solution();

        ListNode head = new ListNode(1);
        ListNode head2 = new ListNode(2);
        ListNode head3 = new ListNode(3);
        ListNode head4 = new ListNode(4);
        ListNode head5 = new ListNode(5);

        head.next = head2;
//        head2.next = head;
          head2.next = head3;
          head3.next = head4;
          head4.next = head5;
//          head5.next = null;

        ListNode listNode = solution.reverseKGroup(head5, 2);

        for (int i = 0; listNode != null; i++) {
            System.out.println(listNode.val);
            listNode = listNode.next;

        }
//        System.out.println();
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

        // n+ k*n/k = 2n
        public ListNode reverseKGroup(ListNode head, int k) {

            ListNode newHead = null;
            ListNode initHead = head;
            ListNode lastkGroupTail = null;
            for (int i = 0; true ; i++) {
                if(i!=0 && i%k == 0){
                    ListNode tempHead = head;
                    ListNode currentkGroupHead = initHead;
                    for (int j = 0; j < k; j++) {
                        ListNode temp = initHead;
                        initHead = initHead.next;
                        temp.next = tempHead;
                        tempHead = temp;

                    }
                    if(newHead == null){
                        newHead = tempHead;
                    }

                    if(lastkGroupTail!=null){
                        lastkGroupTail.next = tempHead;
                    }
                    lastkGroupTail = currentkGroupHead;

                }

                if(head == null){
                    break;
                }
                head = head.next;

            }
            // if linked list size NOT > K, return linked list
            if(newHead == null){
                return initHead;
            }

            return newHead;
        }

        // n+ k*n/k = 2n
        public ListNode reverseKGroup2(ListNode head, int k) {

            ListNode newHead = null;
            ListNode currentKGroupHead = head;
            ListNode lastkGroupTail = null;
            for (int i = 0; true ; i++) {
                if(i!=0 && i%k == 0){

                    //每次遇到k的节点，把之前K个节点翻转。
                    // 需要记录上个K group的尾部和这个Kgroup的头部
                    ListNode tempHead = head;
                    ListNode tempCurrentkGroupHead = currentKGroupHead;
                    for (int j = 0; j < k; j++) {
                        ListNode temp = currentKGroupHead;
                        currentKGroupHead = currentKGroupHead.next;
                        temp.next = tempHead;
                        tempHead = temp;

                    }
                    if(newHead == null){
                        newHead = tempHead;
                    }

                    // 关联 上个K group的尾部和这个Kgroup的头部
                    if(lastkGroupTail!=null){
                        lastkGroupTail.next = tempHead;
                    }
                    lastkGroupTail = tempCurrentkGroupHead;

                }

                if(head == null){
                    break;
                }
                head = head.next;

            }
            // if linked list size NOT > K, return linked list
            if(newHead == null){
                return currentKGroupHead;
            }

            return newHead;
        }



    }
//leetcode submit region end(Prohibit modification and deletion)

}