# Grid

## grid-template-columns: 25% 75%;

不像 flexbox 这里的设置是硬限制，不是建议。
flexible 的单位是 fr unit (as well as auto). Pixels, rems, and percentages are all hard limits.

## align

`justify-content` applies to the grid structure, changing the columns.

`justify-items` applies to the child elements, without affecting the shape of the grid.

## minmax(0, 1fr)

https://css-tricks.com/preventing-a-grid-blowout/
