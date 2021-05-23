package chapter01;

public class StaticClass {

    public static String getTest() {
        return test;
    }

    public static void setTest(String test) {
        StaticClass.test = test;
    }

    private static String test;
}
