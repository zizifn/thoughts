# flexbox

## Growing and Shrinking

flex size 有个很重要的的概念。minimum content size 和 hypothetical content size。

width/flex-basis 是设置一个 hypothetical content size。

min-width 或者实际的 content 决定了这个元素的最小宽度。

shrink 的时候，会去看每个元素的 hypothetical content size，如果元素 **没有小于 hypothetical content size**，shrink 并不生效。

> 如果 flex contianer 是在变大,并且没有小于 hypothetical content size，此时虽然元素在变大，grow 不会生效，仍然是按照 shink 来。

如果大于 flex-shrink 的比例来 shrink。一直到 shink 到 minimum content size。

grow 生效条件是看每个元素的 hypothetical content size 是否都达到。如果达到了，grow 才会生效。

```
.wrapper {
  display: flex;
}
nav, aside.contacts {
  min-width: 150px;
  max-width: 250px;
  flex-shrink: 9999999;
  flex-basis: 250px;
}
main {
  flex: 1;
  flex-basis: 500px;
}

  @media (max-width: 700px) {
    nav {
      display: none;
    }
  }
<div class="wrapper">
  <nav></nav>
  <main></main>
  <aside class="contacts"></aside>
</div>
```

### Shorthand

```
flex: 1; /* flex-grow: 1; flex-shrink: 1; flex-basis: 0; */
width: 500px; 这个不会生效，因为 flex-basis 已经设置了。
```
