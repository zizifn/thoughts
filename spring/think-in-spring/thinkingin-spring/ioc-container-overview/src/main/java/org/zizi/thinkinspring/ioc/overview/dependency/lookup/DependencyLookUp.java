package org.zizi.thinkinspring.ioc.overview.dependency.lookup;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.zizi.thinkinspring.ioc.overview.annotation.Super;
import org.zizi.thinkinspring.ioc.overview.domain.User;

import java.util.Map;

/**
 * @author James
 */
public class DependencyLookUp {
    public static void main(String[] args) {

        BeanFactory beanFactory = new
                ClassPathXmlApplicationContext("META-INF/dependency-lookup");

        lookupByType(beanFactory);
//        lookupInRealTime(beanFactory);
//        lookupInLazy(beanFactory);
        lookupByCollectionType(beanFactory);
        lookupByAnnotation(beanFactory);


    }

    private static void lookupByCollectionType(BeanFactory beanFactory) {

        if (beanFactory instanceof ListableBeanFactory) {
            Map<String, User> beansOfType = ((ListableBeanFactory) beanFactory).getBeansOfType(User.class);
            System.out.println("lookupByCollectionType " + beansOfType);
        }
    }

    private static void lookupByAnnotation(BeanFactory beanFactory) {
        if (beanFactory instanceof ListableBeanFactory) {
            Map<String, Object> beansOfType = ((ListableBeanFactory) beanFactory).getBeansWithAnnotation(Super.class);
            System.out.println("lookupByAnnotation " + beansOfType);
        }
    }

    private static void lookupByType(BeanFactory beanFactory) {
        User user = beanFactory.getBean(User.class);
        System.out.println("lookupByType" + user);
    }


    private static void lookupInRealTime(BeanFactory beanFactory) {
        User user = beanFactory.getBean("user", User.class);
        System.out.println("lookupInRealTime" + user);
    }

    private static void lookupInLazy(BeanFactory beanFactory) {
        ObjectFactory<User> objectFactory =
                beanFactory.getBean("objectFactory", ObjectFactory.class);

        User user = objectFactory.getObject();
        System.out.println("lookupInLazy" + user);
    }
}
