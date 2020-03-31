package org.zizi.thinkinspring.spring.bean.def;

import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.zizi.thinkinspring.spring.bean.factory.DefaultUserFactory;
import org.zizi.thinkinspring.spring.bean.factory.UserFactory;

import java.util.Iterator;
import java.util.ServiceLoader;

public class SpecialBeanInstanceCreationDemo {

    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("META-INF/bean-instance-create-special.xml");

//        ServiceLoader<UserFactory> userFactoryServiceLoader = applicationContext.getBean("userFactoryServiceLoader", ServiceLoader.class);
//        displayServiceLoader(userFactoryServiceLoader);
//        demoServiceLoader();

        AutowireCapableBeanFactory autowireCapableBeanFactory = applicationContext.getAutowireCapableBeanFactory();
        ServiceLoader<UserFactory>  serviceLoader = autowireCapableBeanFactory.getBean("userFactoryServiceLoader", ServiceLoader.class);
        displayServiceLoader(serviceLoader);


        UserFactory userFactory = autowireCapableBeanFactory.createBean(DefaultUserFactory.class);
        System.out.println(userFactory.createUser());


    }

    public static void demoServiceLoader() {
        ServiceLoader<UserFactory> serviceLoader = ServiceLoader.load(UserFactory.class, Thread.currentThread().getContextClassLoader());

        displayServiceLoader(serviceLoader);

    }

    public static void displayServiceLoader(ServiceLoader<UserFactory> userFactoryServiceLoader) {

        Iterator<UserFactory> iterator = userFactoryServiceLoader.iterator();

        for (; iterator.hasNext(); ) {
            UserFactory userFactory = iterator.next();
            System.out.println(userFactory.createUser());
        }

    }
}
