package org.zizi.thinkinspring.spring.bean.factory;

import org.zizi.thinkinspring.ioc.overview.domain.User;

public interface UserFactory {
    default public User createUser(){
        return User.createUser();
    }

}
