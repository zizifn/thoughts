package com.james.leetcodejava.leetcode.editor.cn.test;

import java.util.concurrent.atomic.AtomicInteger;

public class Closure {

    public static void main(String[] args) {

        ClosureModlue closureModlue = new ClosureModlue();

        for (int i = 0; i < 2; i++) {
            System.out.println("b = " + closureModlue.fun1());
            System.out.println("a = " + ClosureModlue.A);
        }

        System.out.println("--------------------------");
        closureModlue = new ClosureModlue();

        for (int i = 0; i < 2; i++) {
            System.out.println("b = " + closureModlue.fun1());
            System.out.println("a = " + ClosureModlue.A);
        }


    }

    public static class ClosureModlue {
        public static final AtomicInteger A = new AtomicInteger();
        private int b = 0;

        public int fun1() {
            A.addAndGet(1);
            b += 1;
            return b;
        }
    }
}
