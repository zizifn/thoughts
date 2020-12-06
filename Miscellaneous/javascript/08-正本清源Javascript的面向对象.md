# 正本清源 JavaScript 的面向对象

~~正本清源~~ 这个词太重，虽然使用了这个词，但是本文达不到这个高度，有立 **FLAG** 的意图。本篇文章仅仅是记录自己对 JavaScript 面向对象的学习。不求完全正确，但求对得起自己学习的总结。

## 追溯 [<sup>1</sup>](#refer-anchor)

总所周知，面向对象三大特征，**封装**，**继承**，**多态**。他们三个每次都会出现在一起，好像它们天生就属于面对对象。然而我们看到对于继承，日渐质疑的声音。可见面向对象的流派也有很多，那就让我们溯源**封装**，**继承**，**多态**。

让我们看看 第一位提出 object 的 Alan Kay 是怎么形容 Object 的。

> I thought of objects being like biological cells and/or individual computers on a network, only able to communicate with messages (so messaging came at the very beginning – it took a while to see how to do messaging in a programming language efficiently enough to be useful).
> Alan Kay

> In the 1960s, object-oriented programming was put into practice with the Simula language, which introduced important concepts that are today an essential part of object-oriented programming, such as class and object, **inheritance**, and dynamic binding.

由此可见，面向对象一开始仅仅是具有了封装的概念，在后来的发展中才被加入，继承和多态的特性。

然而对面向对象的 Criticism[<sup>2</sup>](#refer-anchor) 也越来越多。这不仅让我们欢迎面向对象到底是什么，他想解决什么问题。

让我们关注与面向对象的最核心的抽象--封装， 来试图探讨下对象到底是什么吧？

## 什么是对象呢

- 对象是对数据的封装。

在 JS 中对象不过是个关联数组。正因为这样我们才能使用`for in` 这样的语句。

更为大胆的说话就是，

- 数组（Array class）是一种对象（Object class)
- 对象本质上是关联数组（Associative array）。

这意味什么，这意味着，数组和对象是可以相互用赋值语句进行转换的。这就涉及到如何构建对象和如何从对象中取出数据。

## 对象 to （数组）赋值模板

`[a, b] = {a, b}`

## 数组 to 对象

`{a, b} = [a, b]`

## 总结

<div id="refer-anchor"></div>

## Reference

[1][history](https://en.wikipedia.org/wiki/Object-oriented_programming#History)
[1][criticism](https://en.wikipedia.org/wiki/Object-oriented_programming#Criticism)
