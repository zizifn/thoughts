
# Java Syntax I feel odd

## Anonymous Classes & Lambda Expression

Reference:
[Oracle Doc--Lambda Expressions](https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html#approach5)
[Oracle Doc--Anonymous Classes](https://docs.oracle.com/javase/tutorial/java/javaOO/anonymousclasses.html)

Here is the anonymous class sample code.

``` Java
interface CheckPerson {
    boolean test(Person p);
}

printPersons(
    roster,
    new CheckPerson() { //
        public boolean test(Person p) {
            return p.getGender() == Person.Sex.MALE
                && p.getAge() >= 18
                && p.getAge() <= 25;
        }
    }
);
```

Below is the Lambda Expressions for this case:

> The CheckPerson interface is a **functional interface**. A functional interface is any interface that contains only one abstract method. (A functional interface may contain one or more default methods or static methods.) Because a functional interface contains only one abstract method, you can omit the name of that method when you implement it. To do this, instead of using an anonymous class expression, you use a **lambda expression**, which is highlighted in the following method invocation:


``` Java
printPersons(
    roster,
    (Person p) -> p.getGender() == Person.Sex.MALE
        && p.getAge() >= 18
        && p.getAge() <= 25
);
```
