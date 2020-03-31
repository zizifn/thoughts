package org.zizi.thinkinspring.spring.bean.def;

        import org.springframework.beans.factory.BeanFactory;
        import org.springframework.context.support.ClassPathXmlApplicationContext;
        import org.zizi.thinkinspring.ioc.overview.domain.User;

public class BeanAliasDemo {

    public static void main(String[] args) {

        BeanFactory beanFactory = new ClassPathXmlApplicationContext("META-INF/bean-def.xml");

        User ziziUser = beanFactory.getBean("zizi-user", User.class);
        User user = beanFactory.getBean("user", User.class);

        //两个相同，同一个instance
        System.out.println(ziziUser == user);
        
    }
}
