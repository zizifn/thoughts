package org.zizi.thinkinspring.dependcy.lookup;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;

/**
 *
 */
public class ObjectProviderDemo {

    public static void main(String[] args) {
        
        // create bean factory
        AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext();

        annotationConfigApplicationContext.register(ObjectProviderDemo.class);

        annotationConfigApplicationContext.refresh();

        lookupByObjectProvider(annotationConfigApplicationContext);

        // close
        annotationConfigApplicationContext.close();

    }

    private static void lookupByObjectProvider(AnnotationConfigApplicationContext annotationConfigApplicationContext) {
        ObjectProvider<String> beanProvider = annotationConfigApplicationContext.getBeanProvider(String.class);
        System.out.println(beanProvider.getObject());
    }

    @Bean
    public String helloWorld(){ // method name is Bean name ="helloWorld"
        return "Hello, World";
    }
}
