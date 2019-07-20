package test;

import org.apache.commons.lang3.RandomUtils;
import org.junit.Test;

import java.util.SplittableRandom;
import java.util.stream.IntStream;

public class ServletUT {

    private boolean whichone;
    @Test
    public void radom(){

        int random = (int)(Math.random() * 5);
        // System.out.println(random);

        SplittableRandom splittableRandom = new SplittableRandom();

        IntStream ints = splittableRandom.ints(10,20,99);

        ints.forEach(System.out::println);

        int i1 = splittableRandom.nextInt(10);
        System.out.println(i1);

        boolean b = splittableRandom.nextBoolean();

        System.out.println(b);

        int i=1;

        for(int j=0;j<1000000;j++){
            i += i+100000000;
        }

        System.out.println(i);


        if(whichone){
            whichone = !whichone;

        }

        int i2 = RandomUtils.nextInt(1, 10);
        System.out.println(i2);
    }
}
