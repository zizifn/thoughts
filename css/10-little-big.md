# Little Big Details

## CSS Filters

## css shadows

https://www.joshwcomeau.com/css/designing-shadows/

## scrolling

- scroll-behavior: smooth && scroll-margin-top: 100px
- scroll-snap-type: x mandatory & scroll-snap-align: start
- scrollbar-color && scrollbar-width

### CLS

- scrollbar-gutter: stable for CLS
- images: width/height && aspect-ratio && object-fit: cover

## Focus

- focus-visible 非 pointer devices 的时候才会有 focus outline
- focus-within, 正常情况可以利用 parent 的 focus 状态修改 children。但是也可以利用 within 做到 children 有 focus 的时候，parent 也有 focus outline。
- focus-outline && outline-color && outline-style

## Float
