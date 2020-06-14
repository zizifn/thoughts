package com.james.leetcodejava.leetcode.editor.cn.test;

import java.util.Iterator;
import java.util.Objects;
import java.util.function.Consumer;

public class CustomIterator<I extends Number> {

    public static void main(String[] args) {
        new FactorialIterable(5).forEach(System.out::println);
    }


    public static class FactorialIterable implements Iterable<Integer> {

        private final FactorialIterator factorialIterator;

        public FactorialIterable(Integer value) {
            factorialIterator = new FactorialIterator(value);
        }

        @Override
        public Iterator<Integer> iterator() {
            return factorialIterator;
        }

        @Override
        public void forEach(Consumer<? super Integer> action) {
            Objects.requireNonNull(action);
            Integer last = 0;
            for (Integer t : this) {
                last = t;
            }
            action.accept(last);
        }

    }

    public static class FactorialIterator implements Iterator<Integer> {

        private final Integer mNumber;
        private Integer mPosition;
        private Integer mFactorial;


        public FactorialIterator(Integer number) {
            this.mNumber = number;
            this.mPosition = 1;
            this.mFactorial = 1;
        }

        @Override
        public boolean hasNext() {
            return mPosition <= mNumber;
        }

        @Override
        public Integer next() {
            if (!hasNext()) {
                return 0;
            }

            mFactorial = mFactorial * mPosition;

            mPosition++;

            return  mFactorial;
        }
    }

}
