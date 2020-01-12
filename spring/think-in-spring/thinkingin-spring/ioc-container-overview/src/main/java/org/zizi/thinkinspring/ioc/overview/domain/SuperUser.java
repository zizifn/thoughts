package org.zizi.thinkinspring.ioc.overview.domain;

import org.zizi.thinkinspring.ioc.overview.annotation.Super;

@Super
public class SuperUser extends User {

    private String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "SuperUsere{" +
                "address='" + address + '\'' +
                ", hash='" + hashCode() + '\'' +
                "} " + super.toString();
    }
}
