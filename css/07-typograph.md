# Typography and Images

## Text Rendering

### 字距调整

正常情况不会做的。

```css
font-kerning: none;
letter-spacing: 0.1rem;
```

### 字体光栅化

https://en.wikipedia.org/wiki/Font_rasterization

- bitmap font 不能缩放，不能变大。
- vector font（ttf, otf, svg, and woff/woff2） 可以缩放，变大。

> WebKit 基本是所有浏览器 render rendering engine 的源头。

## Text Overflow

字体一般根据 soft wrap 来换行。

下面就是不能换行的空格。

```css
<p>
  That sandwich costs $10&nbsp;USD, or you can barter for it.
</p>
```

text-wrap 可以用来微调 wrap。 eg `text-wrap: balance;`

如果一个字太长，就会出发 scroll bar。但是可以用

```css
overflow-wrap: break-word;
hyphens: auto; // 这里会加入 - 模仿出版业
```

来强制换行。这样不会选中。

## Print-style Layouts

- Column layout

` columns: 2;` 这种就是类似书的布局。

- float layout

`float: left;` 这种就是类似报纸的布局。字体围绕着元素。

> 这里其实有个副作用，这会导致后面的元素都会围绕着这个元素。如果你不想要这个效果，可以用 `clear: both;` 来清除。或者用 `display:flow-root;` 来清除。
