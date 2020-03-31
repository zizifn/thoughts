package org.zizi.thinkinspring.spring.bean.factory;

import org.springframework.beans.factory.FactoryBean;
import org.zizi.thinkinspring.ioc.overview.domain.User;

/**
 * {@link org.zizi.thinkinspring.ioc.overview.domain.User}
 */
public class UserFactoryBean implements FactoryBean {
    @Override
    public Object getObject() throws Exception {
        return User.createUser();
    }

    @Override
    public Class<?> getObjectType() {
        return User.class;
    }
}
