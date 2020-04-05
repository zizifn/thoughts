package org.zizi.thinkinspring.spring.bean.def;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class BeanGarbageCollectionDemo {

    public static void main(String[] args) throws InterruptedException {
        AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext();

        annotationConfigApplicationContext.register(BeanInitDemo.class);

        annotationConfigApplicationContext.refresh();

        annotationConfigApplicationContext.close();
        Thread.sleep(5000L);
        // force close GC
        System.gc();

        // testing --amend
    }
}
