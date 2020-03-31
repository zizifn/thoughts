package org.zizi.thinkinspring.ioc.overview.domain;

/**
 * @author James
 */
public class User {

    private Long id;

    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", hash='" + hashCode() + '\'' +
                '}';
    }

    public static User createUser(){
        return new User();
    }

}
