public class Closure {

    public static void main(String[] args) {

        ClosureModlue closureModlue = new ClosureModlue();

        for (int i = 0; i < 2 ; i++) {
            System.out.println("b = " + closureModlue.fun1());
            System.out.println("a = " + ClosureModlue.a);
        }

        System.out.println("--------------------------");
        closureModlue = new ClosureModlue();

        for (int i = 0; i < 2 ; i++) {
            System.out.println("b = " + closureModlue.fun1());
            System.out.println("a = " + ClosureModlue.a);
        }


    }

    public static class ClosureModlue {
        public static int a = 0;
        private int b =0;

        public int fun1(){
            a += 1;
            b += 1;
            return b;
        }
    }
}
