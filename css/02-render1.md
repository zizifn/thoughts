# Rendering Logic I

## built-in declared and inherited

一般情况 inherit 的 property 都是 typography-related。color, font-size, text-shadow etc
https://www.sitepoint.com/css-inheritance-introduction/#list-css-properties-inherit

Forcing inheritance。一般情况浏览器有默认的样式，这样会不能 inherit。可以写一个 ` color: inherit;`, 这样权重就高过浏览器了。

# Cascade

````js
const appliedStyles = {
  ...inheritedStyles,
  ...tagStyles,
  ...classStyles, // 权重
  ...idStyles,
  ...inlineStyles,
  ...importantStyles
}```
````

在现代的 component-based 框架中，权重没有这么必要。

# Directions

block and inline.

`margin-block-start` 和 `margin-inline-start` or `margin-block-end` 和 `margin-inline-end`。
这样做就可以满足不同 writeing modes 的需求。

# The Box Model

- box-sizing

  - content-box

    width = content. **eg `width: 100%` = parent content width**

  - border-box

    width = content + padding + border `width: 100%` = parent content width

- padding
- border

  - specify a border color, it'll use the font's color by default. `border: 1px solid currentColor;`

- margin

# Flow layout

## width calculation

block element 会占满整个空间。默认是 `width: auto`。

> 注意：`width: auto` 和 `width: 100%` 是不一样的。
> `width: 100%` 是根据父元素 content width 来计算的。

width:

- min-width : fit-content/min-content/max-content
- max-width

## height calculation

## Margin collapsing
