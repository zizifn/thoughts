package org.zizi.thinkinspring.spring.bean.def;

import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.BeanDefinitionReaderUtils;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.zizi.thinkinspring.ioc.overview.domain.User;


@Import(AnnotationBeanDefDemo.Config.class) //3. Import 导入
public class AnnotationBeanDefDemo {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext annotationConfigApplicationContext = new AnnotationConfigApplicationContext();

        annotationConfigApplicationContext.register(AnnotationBeanDefDemo.class);
        // 1. 通过@Bean 方式定义
        // 2. 通过@Component 方式定义
        // 3. Import 导入
        annotationConfigApplicationContext.refresh();

        // 使用 API 来生成 bean， 给名字
        registerBeanDef(annotationConfigApplicationContext, "zizi-user-1");
        // 使用 API 来生成 bean， 不给名字
        registerBeanDef(annotationConfigApplicationContext);
//        registerBeanDef(annotationConfigApplicationContext);


        System.out.println("config Beans" + annotationConfigApplicationContext.getBeansOfType(Config.class));
        System.out.println("User Beans" + annotationConfigApplicationContext.getBeansOfType(User.class));

        annotationConfigApplicationContext.close();
    }


    /**
     *  命名Bean的注册方式
     * @param registry
     * @param user
     * @param beanName
     * @param beanclass
     */
    public static void registerBeanDef(BeanDefinitionRegistry registry, String beanName) {

        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(User.class);

        beanDefinitionBuilder.addPropertyValue("id", 1).addPropertyValue("name", "zizi");

        if (StringUtils.hasText(beanName)) {
            registry.registerBeanDefinition(beanName, beanDefinitionBuilder.getBeanDefinition());
        } else {
            BeanDefinitionReaderUtils.registerWithGeneratedName(beanDefinitionBuilder.getBeanDefinition(), registry);
        }

    }

    public static void registerBeanDef(BeanDefinitionRegistry registry){

        registerBeanDef(registry,null);
    }



    @Component // 2.
    public static class Config {

        @Bean(name = {"user", "zizi-user"}) // 1.
        public User user() {
            User user = new User();
            user.setId(123L);
            user.setName("zizi");
            return user;
        }

//        @Bean
//        public User user2() {
//            User user = new User();
//            user.setId(124L);
//            user.setName("zizi-user2");
//            return user;
//        }
    }
}
