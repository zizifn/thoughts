# 从 C# String 类理解 Unicode（UTF8/UTF16)

上一篇博客：[从字节理解 Unicode（UTF8/UTF16)](./Unicode.md) 。这次我将从 C# code 中再一次阐述上篇博客的内容。

## C# 代码看 UTF8

代码如下：

```C#
string test = "UTF-8 你";

            //把字符转换为 byte[]
            byte[] bytearray_UTF8 = Encoding.UTF8.GetBytes(test);
            // byte[] to 16 进制的字符形式
            String hexString = BitConverter.ToString(bytearray_UTF8);
```

运行后的结果“hexString ”就是“55-54-46-2D-38-E4-BD-A0”，字符“你”占 3 个字节，3 个字节为“E4-BD-A0”。

完全符合上篇博客用 txt 分析的结果。（请参考上篇博客。从字节理解 Unicode（UTF8/UTF16) ）
![utf8](./pic/utf8.png)

## C# 代码看 UTF16

代码如下：

```C#

            string test = "UTF-8你";

    //把字符转换为 UTF16 byte[]
            byte[] bytearray_Unicode = Encoding.Unicode.GetBytes(test);
            //byte[] to 16 进制的字符形式
            String hexString_UTF16 = BitConverter.ToString(bytearray_UTF8);
```

运行后的结果“hexString_UTF16”就是"55-00-54-00-46-00-2D-00-38-00-60-4F"，字符“你”占 2 个字节，2 个字节为“60-4F”。（Widnwos（.net）默认 Unicode 是 UTF16）

完全符合上篇博客用 txt 分析的结果。当然字节序也完全一样，因为我的 CPU 是 intel 的，注定是低字节序。（请参考，上篇博客从字节理解 Unicode（UTF8/UTF16) ）
![utf16](./pic/utf16.png)

从 C#代码 String 类和从文本角度查看二进制角度得到的结果是完全一致的。当然这也不难理解，无论从 String 类角度，还是文本角度，他们使用的都是 UTF8/UTF16。那么他们从字节角度都应该得到一致的结果。

## 从字节角度看图片和视频格式？？

那么从一个文本文件的二进制，然后在知道这个文本用的是 UTF8/UTF16，（其实很多情况我们可以判断出一个文本文件的编码是 UTF8 或者 UTF16），就可以从二进制的角度去理解和修改文本文件。这样即使你把文本文件损坏，然后修复者按照这样的方式，可以把大部分的文本修复回来，只要损坏程度不高，理解起来完全没有问题。
那么或许你会问，那么图片和视频呢？他们不也是一个一个的字节吗？那么我可以从字节角度去理解或者修复一副图片和一个视频文件吗？

读到这里你是不是想到一个 TED 演讲，说的是一个摄影师，照相机被人偷走，最后找到相机，但是文件都被删除了，于是他求助数据修复师，最后得到一些非常奇怪的图片，然后他就办了一个这样照片的展览。

那么当然是可以得。但是实际操作起来是很麻烦的。因为，图片和视频都有复杂的格式，格式决定他们是如何存储和读取信息的。类似于字符的 UTF8/UTF16。图片有 JPG 等等格式，你必须理解这样格式是怎么编码的，你才能去正确的修改图片。
感兴趣的话，可以参考以下文章。
[JPEG 编解码过程详解](http://www.zhihu.com/question/22293783)
