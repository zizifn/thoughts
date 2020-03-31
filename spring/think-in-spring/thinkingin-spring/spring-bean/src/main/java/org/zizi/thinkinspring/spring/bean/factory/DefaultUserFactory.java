package org.zizi.thinkinspring.spring.bean.factory;

import org.springframework.beans.factory.InitializingBean;
import org.zizi.thinkinspring.ioc.overview.domain.User;

import javax.annotation.PostConstruct;

public class DefaultUserFactory implements UserFactory, InitializingBean {

    @Override
    public User createUser() {
        User user = new User();
        user.setName("zizi-DefaultUserFactory");
        return user;
    }

    // 1.
    @PostConstruct
    public void init(){
        System.out.println("@PostConstruct: DefaultUserFactory init-ing....");
    }

    //2.
    public void initUserFactory(){
        System.out.println("自定义初始化方法: DefaultUserFactory init-ing....");

    }

    //3.
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean#afterPropertiesSet: DefaultUserFactory init-ing....");
    }
}
