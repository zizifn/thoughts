package org.zizi.thinkinspring.ioc.overview.container;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.zizi.thinkinspring.ioc.overview.domain.User;

import java.util.Map;

/**
 * 自己加载Bean
 */
public class AnnotationAsIocContainerDemo {

    public static void main(String[] args) {

        // create bean factory
        AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext();
        annotationConfigApplicationContext.register(AnnotationAsIocContainerDemo.class);

        annotationConfigApplicationContext.refresh();

        lookupByCollectionType(annotationConfigApplicationContext);

        // close
        annotationConfigApplicationContext.close();

    }

    @Bean
    public User user(){
        User user = new User();
        user.setId(123L);
        user.setName("zizi");
        return user;
    }

    private static void lookupByCollectionType(BeanFactory beanFactory) {
        if (beanFactory instanceof ListableBeanFactory) {
            Map<String, User> beansOfType = ((ListableBeanFactory) beanFactory).getBeansOfType(User.class);
            System.out.println("lookupByCollectionType " + beansOfType);
        }
    }
}
