package chapter01;

import org.objectweb.asm.*;

public class FooDump implements Opcodes {

    public static byte[] dump() throws Exception {

        ClassWriter cw = new ClassWriter(0);
        FieldVisitor fv;
        MethodVisitor mv;
        AnnotationVisitor av0;

        cw.visit(V1_8, ACC_PUBLIC + ACC_SUPER, "chapter01/Foo", null, "java/lang/Object", null);

        cw.visitSource("Foo.java", null);

        {
            mv = cw.visitMethod(ACC_PUBLIC, "<init>", "()V", null, null);
            mv.visitCode();
            Label l0 = new Label();
            mv.visitLabel(l0);
            mv.visitLineNumber(3, l0);
            mv.visitVarInsn(ALOAD, 0);
            mv.visitMethodInsn(INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
            mv.visitInsn(RETURN);
            Label l1 = new Label();
            mv.visitLabel(l1);
            mv.visitLocalVariable("this", "Lchapter01/Foo;", null, l0, l1, 0);
            mv.visitMaxs(1, 1);
            mv.visitEnd();
        }
        {
            mv = cw.visitMethod(ACC_PUBLIC + ACC_STATIC, "main", "([Ljava/lang/String;)V", null, null);
            mv.visitCode();
            Label l0 = new Label();
            mv.visitLabel(l0);
            mv.visitLineNumber(5, l0);
            mv.visitInsn(ICONST_1);
            mv.visitVarInsn(ISTORE, 1);
            Label l1 = new Label();
            mv.visitLabel(l1);
            mv.visitLineNumber(6, l1);
            mv.visitVarInsn(ILOAD, 1);
            Label l2 = new Label();
            mv.visitJumpInsn(IFEQ, l2);
            Label l3 = new Label();
            mv.visitLabel(l3);
            mv.visitLineNumber(8, l3);
            mv.visitFieldInsn(GETSTATIC, "java/lang/System", "out", "Ljava/io/PrintStream;");
            mv.visitLdcInsn("Hello, Java!");
            mv.visitMethodInsn(INVOKEVIRTUAL, "java/io/PrintStream", "println", "(Ljava/lang/String;)V", false);
            mv.visitLabel(l2);
            mv.visitLineNumber(10, l2);
            mv.visitFrame(Opcodes.F_APPEND, 1, new Object[]{Opcodes.INTEGER}, 0, null);
            mv.visitVarInsn(ILOAD, 1);
            mv.visitInsn(ICONST_1);
            Label l4 = new Label();
            mv.visitJumpInsn(IF_ICMPNE, l4);
            Label l5 = new Label();
            mv.visitLabel(l5);
            mv.visitLineNumber(12, l5);
            mv.visitFieldInsn(GETSTATIC, "java/lang/System", "out", "Ljava/io/PrintStream;");
            mv.visitLdcInsn("Hello, JVM!");
            mv.visitMethodInsn(INVOKEVIRTUAL, "java/io/PrintStream", "println", "(Ljava/lang/String;)V", false);
            mv.visitLabel(l4);
            mv.visitLineNumber(14, l4);
            mv.visitFrame(Opcodes.F_SAME, 0, null, 0, null);
            mv.visitInsn(RETURN);
            Label l6 = new Label();
            mv.visitLabel(l6);
            mv.visitLocalVariable("args", "[Ljava/lang/String;", null, l0, l6, 0);
            mv.visitLocalVariable("flag", "Z", null, l1, l6, 1);
            mv.visitMaxs(2, 2);
            mv.visitEnd();
        }
        cw.visitEnd();

        return cw.toByteArray();
    }
}
