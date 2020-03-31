package org.zizi.thinkinspring.spring.bean.def;

import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.zizi.thinkinspring.ioc.overview.domain.User;

import java.util.Map;

public class BeanDefinitionCreationDemo {

    public static void main(String[] args) {

        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("META-INF/bean-def.xml");
        DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) applicationContext.getBeanFactory();


        User user = null;
        // 1. 通过 builder 来构建
        BeanDefinitionBuilder beanDefinitionBuilder = BeanDefinitionBuilder.genericBeanDefinition(User.class);

        // 通过属性设置
        beanDefinitionBuilder.addPropertyValue("id", 23);
        beanDefinitionBuilder.addPropertyValue("name", "zizi");

        // 获取 beandefinition instance
        BeanDefinition beanDefinition = beanDefinitionBuilder.getBeanDefinition();

        //2. beandefinition 并非bean的终态，可以自定义修改。
        GenericBeanDefinition genericBeanDefinition = new GenericBeanDefinition();
        genericBeanDefinition.setBeanClass(User.class);

        // MutablePropertyValues
        MutablePropertyValues mutablePropertyValues = new MutablePropertyValues();
        mutablePropertyValues.add("id", 1).add("name", "zizi");
        genericBeanDefinition.setPropertyValues(mutablePropertyValues);

        beanFactory.registerBeanDefinition("test111", beanDefinition);
        beanFactory.registerBeanDefinition("test112", genericBeanDefinition);

        Map<String, User> beansOfType = applicationContext.getBeansOfType(User.class);

        final User test111 = applicationContext.getBean("test111", User.class);
        final User test112 = applicationContext.getBean("test112", User.class);
        System.out.println(test111);
        System.out.println(test112);


//        genericApplicationContext.registerBeanDefinition();


    }
}
