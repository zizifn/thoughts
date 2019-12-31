 //给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。 
//
// 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。 
//
// 说明：不允许修改给定的链表。 
//
// 
//
// 示例 1： 
//
// 输入：head = [3,2,0,-4], pos = 1
//输出：tail connects to node index 1
//解释：链表中有一个环，其尾部连接到第二个节点。
// 
//
// 
//
// 示例 2： 
//
// 输入：head = [1,2], pos = 0
//输出：tail connects to node index 0
//解释：链表中有一个环，其尾部连接到第一个节点。
// 
//
// 
//
// 示例 3： 
//
// 输入：head = [1], pos = -1
//输出：no cycle
//解释：链表中没有环。
// 
//
// 
//
// 
//
// 进阶： 
//你是否可以不用额外空间解决此题？ 
// Related Topics 链表 双指针
  
  package com.james.leetcodejava.leetcode.editor.cn;

 import com.james.leetcodejava.leetcode.editor.cn.comm.ListNode;

 public class LinkedListCycleIi{
      public static void main(String[] args) {
           Solution solution = new LinkedListCycleIi().new Solution();

          ListNode head = new ListNode(1);
          ListNode head2 = new ListNode(2);
          ListNode head3 = new ListNode(3);
          ListNode head4 = new ListNode(4);
          ListNode head5 = new ListNode(5);

          head.next = head2;
          head2.next = head;
//          head2.next = head3;
//          head3.next = head2;
//          head4.next = head5;
//          head5.next = null;

          System.out.println( solution.detectCycle(head).val);
      }
      

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
//    public ListNode detectCycle(ListNode head) {
//
//        HashSet<ListNode> set = new HashSet<>();
//
//        for (int i = 0; head !=null ; head = head.next) {
//
//            if(set.contains(head)){
//                return head;
//            }else {
//                set.add(head);
//            }
//        }
//
//        return null;
//
//    }

        public ListNode detectCycle(ListNode head) {
            if(head == null || head.next == null ){
                return null;
            }
            ListNode slow = head;
            ListNode fast = head;
            for (int i = 0; true ; ) {
                if(fast == null || fast.next == null){
                    return null;
                }
                slow = slow.next;
                fast = fast.next.next;
                if(slow == fast){

                    ListNode tempHead1 = head;
                    ListNode tempHead2 = slow;

                    /**
                     * 1->2->3->4
                     *    ↑-----↓
                     *
                     *    数学证明，找到入环的节点。
                     */
                    for(; true ;){
                        if(tempHead1 == tempHead2){
                            return tempHead1;
                        }
                        tempHead1 = tempHead1.next;
                        tempHead2 = tempHead2.next;

                    }
                }
            }
        }
}
//leetcode submit region end(Prohibit modification and deletion)

  }