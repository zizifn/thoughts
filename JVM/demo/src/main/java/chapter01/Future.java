package chapter01;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class Future {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        final String str = "start main";
        Test test = new Test("first test");
        final CompletableFuture<Void> future
                = CompletableFuture.runAsync(() -> {
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("test " + test.getTest());
        });
        test.setTest("end main");
        System.out.println("main " + test.getTest());

        for (int i = 0; i < 5; i++) {
            int finalI = i;
            CompletableFuture.runAsync(() -> {
                        System.out.println("test " + finalI);});
        }

        future.get();
    }
}
