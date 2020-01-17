package org.zizi.thinkinspring.ioc.overview.dependency.injection;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.env.Environment;
import org.zizi.thinkinspring.ioc.overview.repository.UserRepository;

/**
 * @author James
 */
public class DependencyInjection {
    public static void main(String[] args) {

//        BeanFactory beanFactory = new ClassPathXmlApplicationContext("META-INF/dependency-injection.xml");

        ApplicationContext applcationConext = new
                ClassPathXmlApplicationContext("META-INF/dependency-injection.xml");
        
//        applcationConext.getBean()
//
        // 1. 自定义的BEAN
        UserRepository userRepository = applcationConext.getBean("userRepository", UserRepository.class);
//        System.out.println(userRepository.getUsers());


        BeanFactory beanFactory1 = userRepository.getBeanFactory();
        // 依赖查找。。。。have error
//      System.out.println(applcationConext.getBean(BeanFactory.class));

        whoIsIocContainer(userRepository, applcationConext);


        ObjectFactory<ApplicationContext> applicationContextObjectFactory = userRepository.getApplicationContextObjectFactory();
        System.out.println(applicationContextObjectFactory.getObject() == applcationConext);

        System.out.println(applcationConext == beanFactory1);
        System.out.println(beanFactory1);
        System.out.println(applcationConext);

        //3. 容器内建的Bean
        Environment environment = applcationConext.getBean(Environment.class);
        System.out.println("获取 Environment bean" +  environment );

    }

    private static void whoIsIocContainer(UserRepository userRepository, ApplicationContext applicationContext){
        //AbstractApplicationContext 组合了 BeanFactory
        // applicationContext#getbean 实现都是 BeanFactory
        // doc:
        // https://docs.spring.io/spring/docs/5.2.2.RELEASE/spring-framework-reference/core.html#beans-introduction


        // 依赖注入。。。 2. 内建的依赖。。不是一个bean
        BeanFactory beanFactory1 = userRepository.getBeanFactory(); //DefaultListableBeanFactory

        //
        System.out.println(beanFactory1 == applicationContext); // sClassPathXmlApplicationContext
    }
}
