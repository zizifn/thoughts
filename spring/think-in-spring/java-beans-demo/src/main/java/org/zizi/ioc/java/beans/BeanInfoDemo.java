package org.zizi.ioc.java.beans;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyEditorSupport;
import java.util.stream.Stream;

public class BeanInfoDemo {

    public static void main(String[] args) throws IntrospectionException {

        BeanInfo beanInfo = Introspector.getBeanInfo(Person.class, Object.class);

        Stream.of(beanInfo.getPropertyDescriptors()).forEach(
                propertyDescriptor -> {
                    System.out.println("propertyDescriptor = " + propertyDescriptor);

                    Class<?> propertyType = propertyDescriptor.getPropertyType();
                    String name = propertyDescriptor.getName();

                    if("age".equals(name)){
                        propertyDescriptor.setPropertyEditorClass(StringToIntPropertyEditor.class);

                        // propertyDescriptor.createPropertyEditor()
                    }
                }
        );

    }


    static class StringToIntPropertyEditor extends PropertyEditorSupport{
        @Override
        public void setAsText(String text) throws IllegalArgumentException {

            Integer value = Integer.valueOf(text);
            setValue(value);
        }
    }
}
