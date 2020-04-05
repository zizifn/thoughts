package org.zizi.thinkinspring.spring.bean.def;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.zizi.thinkinspring.spring.bean.factory.DefaultUserFactory;
import org.zizi.thinkinspring.spring.bean.factory.UserFactory;

/**
 * fff
 */
public class BeanInitDemo {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext();

        annotationConfigApplicationContext.register(BeanInitDemo.class);

        annotationConfigApplicationContext.refresh();

        System.out.println("spring already start!!!!!!!!!!!");

        UserFactory bean = annotationConfigApplicationContext.getBean(UserFactory.class);

        System.out.println("spring prepare closing!!!!!!!!!!!");
        annotationConfigApplicationContext.close();
        System.out.println("spring already close!!!!!!!!!!!");
    }

    /**
     * init 不同方式执行顺序，
     * 1. @PostConstruct: DefaultUserFactory init-ing....
     * 2. InitializingBean#afterPropertiesSet: DefaultUserFactory init-ing....
     * 3. 自定义初始化方法: DefaultUserFactory init-ing....
     *
     * @return
     */
    @Bean(initMethod = "initUserFactory", destroyMethod = "doDestroy")
//    @Lazy
//    spring already start!!!!!!!!!!!
//    @PostConstruct: DefaultUserFactory init-ing....
//    InitializingBean#afterPropertiesSet: DefaultUserFactory init-ing....
//    自定义初始化方法: DefaultUserFactory init-ing....   // 如果延迟加载， bean的初始化在查找时候开始
    public UserFactory userFactory(){
        return new DefaultUserFactory();
    }
}
