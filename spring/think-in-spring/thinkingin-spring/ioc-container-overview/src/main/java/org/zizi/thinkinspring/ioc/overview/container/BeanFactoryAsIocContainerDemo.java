package org.zizi.thinkinspring.ioc.overview.container;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.zizi.thinkinspring.ioc.overview.domain.User;

import java.util.Map;

/**
 * 自己加载Bean
 */
public class BeanFactoryAsIocContainerDemo {

    public static void main(String[] args) {

        // create bean factory
        DefaultListableBeanFactory defaultListableBeanFactory = new DefaultListableBeanFactory();

        XmlBeanDefinitionReader xmlBeanDefinitionReader = new XmlBeanDefinitionReader(defaultListableBeanFactory);

        String location = "META-INF/dependency-lookup.xml";
        // load
        int count = xmlBeanDefinitionReader.loadBeanDefinitions(location);
        System.out.println(count);

        lookupByCollectionType(defaultListableBeanFactory);

    }

    private static void lookupByCollectionType(BeanFactory beanFactory) {
        if (beanFactory instanceof ListableBeanFactory) {
            Map<String, User> beansOfType = ((ListableBeanFactory) beanFactory).getBeansOfType(User.class);
            System.out.println("lookupByCollectionType " + beansOfType);
        }
    }
}
