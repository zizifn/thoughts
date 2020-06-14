package com.james.leetcodejava.leetcode.editor.cn.test;

import java.util.Iterator;

public class CountNumber {

    public static void main(String[] args) {

        for( int i : new CountIterable(10)){
            System.out.println(i);
        }

//        CountIterable integers = new CountIterable(10);
//        Iterator<Integer> iterator = integers.iterator();
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());
//        System.out.println(iterator.next());


    }

    public static class CountIterable implements Iterable<Integer>{

        private CountIterator countIterator;
        private int num = 0;

        public CountIterable(int num){
            this.num = num;
            countIterator = new CountIterator(num);
        }
        @Override
        public Iterator<Integer> iterator() {
            return new Iterator<Integer>(){

                private int count = 0;
                @Override
                public boolean hasNext() {
                    return count <= num;
                }

                @Override
                public Integer next() {
                    return count++;
                }
            };
        }
    }

    public static class CountIterator implements Iterator<Integer>{

        private int count = 0;
        private int num = 0;

        public CountIterator(int num){
            this.num = num;
        }

        @Override
        public boolean hasNext() {
            return count <=  num;
        }

        @Override
        public Integer next() {
            if(!hasNext()){
                return 0;
            }
            return count++;
        }
    }


}
