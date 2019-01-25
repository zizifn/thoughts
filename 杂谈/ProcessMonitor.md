# 是谁在重置Widnows 的DNS Server?

## 起因

由于`http://cn.bing.com`临时不好用，原因是DNS，于是强制指定自己`Widnows`系统DNS到`1.1.1.1`.但是发现，自己系统会自动重置DNS。引起自己好奇，于是想查清楚到底是哪个process自动重置系统的DNS。

## 查找问题的过程

- 强制指定路由器的DNS Server,但是系统还是会重置DNS Server.
- 检查registry后,DNS registry会自动改变。

![DNS](/杂谈/data/DNSRegistry.jpg)

## 工具

于是使用微软的[Process Monitor](https://docs.microsoft.com/zh-cn/sysinternals/downloads/procmon),来检查是谁在变动Registry?
找到process后，发现是netsh一直在RegsetValue，更改DNS的registry。于是我用`netsh int ip reset` 重置设置。问题解决！

![Process Monitor](/杂谈/data/processmon.jpg)

## 感悟

发现问题，不放弃，稳住一步步分析，就可以解决。不慌的代价就是凌晨一点后才睡。
