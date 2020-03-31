package org.zizi.thinkinspring.spring.bean.def;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
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

        UserFactory bean = annotationConfigApplicationContext.getBean(UserFactory.class);

        annotationConfigApplicationContext.close();
    }

    /**
     * init 不同方式执行顺序，
     * 1. @PostConstruct: DefaultUserFactory init-ing....
     * 2. InitializingBean#afterPropertiesSet: DefaultUserFactory init-ing....
     * 3. 自定义初始化方法: DefaultUserFactory init-ing....
     *
     * @return
     */
    @Bean(initMethod = "initUserFactory")
    @Lazy
    public UserFactory userFactory(){
        return new DefaultUserFactory();
    }
}
