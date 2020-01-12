package com.james.leetcodejava.leetcode.editor.cn;

import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {

        List<String> ls = new ArrayList<>();

        ls.add("1");
        ls.add("2");
        ls.add("3");
        ls.add("4");


//        List ls1 = ls;
//        ls1.add(1);

        removeList(ls);

    }

    private static void removeList(List<String> ls) {

        if(ls.isEmpty()){
            return;
        }
        ls.remove(1);
        removeList(ls);

    }
}
