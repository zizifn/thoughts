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

## web fonts

```css
@font-face {
  font-family: "Open Sans";
  font-style: italic;
  font-weight: 400;
  font-stretch: 100%;
  font-display: block; //
  src: url(https://fonts.gstatic.com/s/opensans/v40/memtYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWqWvU6F15M.woff2)
    format("woff2");
}
```

Font 加载的顺序是

1. The block period

   在这段时间，字体是 invisible 的。

2. The swap period

   在这段时间，字体是先用 fallback font，然后再用 web font。
   这个时候会有一个闪烁的效果。

3. The failure period

   如果字体加载失败，浏览器会使用 fallback font。

`font-display: block` 这个会让 block period 变长。
`font-display: swap` no block period。
`font-display: fallback` It features a very-short block period (about 100ms), and a moderate swap period (about 3s)。

`size-adjust`，可以自定义 font，让这个自带 font 更像 webfont。不容易产生 layout shift。

### Font Optimization

我们可以把 font 转换成 woff2 格式。然后利用 google font 还可以按照语言加载，让 web font 的大小更小。

### Variable Fonts

```html
<link
  href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300..900;1,300..900&display=swap"
  rel="stylesheet"
/>
```

利用 Variable Fonts 可以在一个字体文件中包含多个样式和 weight，减少 font 请求数量。

> 一般情况下，font 的 weight 和 italic 是分开的。

## Images

image alt-->https://webaim.org/techniques/alttext/

> 一般 右上角的 logo， alt 应该写 “back to home” 而不是描述 logo 图片。

Image 有自带的宽度和高度，所有我们一般需要给一个 width

需要使用让浏览器自动决定加载哪些图片。

```css
<img
  alt=""
  src="/course-materials/responsive-diamond.png"
  srcset="
    /course-materials/responsive-diamond.png 1x,
    /course-materials/responsive-diamond@2x.png 2x,
    /course-materials/responsive-diamond@3x.png 3x
  "
/>

<picture>
  <source
    type="image/avif"
    srcset="
      /course-materials/responsive-diamond.avif 1x,
      /course-materials/responsive-diamond@2x.avif 2x,
      /course-materials/responsive-diamond@3x.avif 3x
    "
  />
  <source
    type="image/webp"
    srcset="
      /course-materials/responsive-diamond.webp 1x,
      /course-materials/responsive-diamond@2x.webp 2x,
      /course-materials/responsive-diamond@3x.webp 3x
    "
  />
  <img
    alt=""
    src="/course-materials/responsive-diamond.png"
  />
</picture>
```
