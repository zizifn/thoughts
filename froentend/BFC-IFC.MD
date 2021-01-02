# BFC & IFC

作为一个半路转到前端的工程师，我学习中最大的障碍就是 CSS，我始终弄不明白写 CSS 的原理。 大部分都是对照 google 和 MDN， 依查字典的方式来写 CSS。但是当你不知道背后的原理时候，写东西就没有章法。那么以下是我总结给自己的 CSS 章法。

> 当然这个时候，有人会说。你怎么不看 CSS speciation 啊。额，我懒。

> 其实我也阅读了一点，但是我还是认为 MDN 是人性化的。

> 下面是我自己的理解，没有做过多的考究，也许会有偏差。但是我的目的就是掌握章法而不是准确。

## 站在浏览器的角度来解析 CSS

假如你是一个浏览器，给你一个含有 css 的 html，请问你怎么把它**画**在显示器上？那么我们就切换到浏览器的视角。

> 下面是极度简化的模型。

当浏览器拿到一个 html 文档，一看，这不就是个一个元素包含另一些元素的文档吗？那我就把一个元素当然一个 box。众所周知，万物基于方块。怎么把这些*套娃*的方块放入到一个二维的显示器上呢？

- 依次遍历方块
- 把适合 行 的方块，放入一行中
- 把适合 列 的方块，放入列中

so easy!! 等等，请问浏览器，下面 2 个问题请回答下。

### 万一一行中有多个元素，那怎么排列啊

这里我们创建一个 IFC 来显示行。那么相应的我们给 IFC 定义一些 rule， 来规定哪些 元素/box 应该放入行中。

- rule1
- etc

### 万一一列中有多个元素，那怎么排列啊

这里我们创建一个 BFC 来显示行。那么相应的我们给 BFC 定义一些 rule，来规定哪些 元素/box 应该放入列中。

记住万物基于方块，浏览器上来就会创建一个 BFC。

- rule1
- etc

请问浏览器，能不能来点实际的例子，不要搞这么虚？可以，下面就是实际的例子。

## 解释有些常见布局

我会把下面常见的例子，按照 BFC 和 IFC 的原理解释一遍。

### 为什么两个 div 默认放入一列呢

[default-div](./BFC-IFC/default-div.html)

参考阅读文档，
[CSS_Flow_Layout](./https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flow_Layout)
[Inline_elements](./https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements)
[Block-level_elements](./https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)

### 为什么 float 要这样显示
