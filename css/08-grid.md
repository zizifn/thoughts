# Grid

## grid-template-columns: 25% 75%;

不像 flexbox 这里的设置是硬限制，不是建议。
flexible 的单位是 fr unit (as well as auto). Pixels, rems, and percentages are all hard limits.

## align

`justify-content` applies to the grid structure, changing the columns.

`justify-items` applies to the child elements, without affecting the shape of the grid.

## minmax(0, 1fr)

https://css-tricks.com/preventing-a-grid-blowout/

## World famous CSS Grid Layout

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: 10px;
}
```

auto-fill vs auto-fit

- `auto-fill` 会创建尽可能多的列，但是会产生空列，如果太宽，但是元素太少。
- `auto-fit` 会创建尽可能多的列，但是不会产生空列，元素太少时会自动变大元素，占有空列。

```css
https: //css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/;;
```
