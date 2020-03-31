package org.zizi.thinkinspring.spring.bean.def;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.zizi.thinkinspring.ioc.overview.domain.User;

public class BeanInstanceCreationDemo {

    public static void main(String[] args) {
        BeanFactory beanFactory = new ClassPathXmlApplicationContext("META-INF/bean-instance-create.xml");

        User userByStaticMehod = beanFactory.getBean("user-by-static-method", User.class);
        User userByInstanceMehod = beanFactory.getBean("user-by-instance-method", User.class);
        User userByFactoryBean = beanFactory.getBean("user-by-factoryBean", User.class);


        System.out.println(userByStaticMehod);
        System.out.println(userByInstanceMehod);
        System.out.println(userByFactoryBean);

        System.out.println(userByInstanceMehod == userByStaticMehod);
        System.out.println(userByInstanceMehod == userByFactoryBean);



    }
}
