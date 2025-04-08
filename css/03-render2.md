# Rendering Logic II Position Layour

## Containing Blocks

和 flow layout 的 `width: 100%` 一样，`position:absloute` 的 top, left, right, bottom 也是相对于 containing block。

但是`position:absloute` 会忽略 containing block 的 padding。

## Stacking Context

> 可以简单理解成三维，这个和 chrome dev tool 里面的 layer 应该是一样的。

如果没有创建 stacking context，元素会在同一个 stacking context 里面。默认 viewport 是一个 stacking context。每个创建 stacking context 的元素同时受到自己所在的 stacking context 的影响。

https://developer.mozilla.org/en-US/docs/Web/CSS/position
https://github.com/andreadev-it/stacking-contexts-inspector

## Portals

一般策略是，在 body 下面创建一个节点，然后把所有的 portal 都放在这个节点下面。 但是这里可能会出现，如果 react root 节点下创建一个元素，有 z-index，就会覆盖掉 portal。

## fixed position

fixed position 是相对于 **viewport** 的。但是如果 有 transform 的话，fixed position 会相对于 transform 的元素，这就和 **absolute** 一样。

> 可以用下面脚本，一直根据 fixed 的 element 往上找，直到找到 transform 的元素。

```js
function findCulprits(elem) {
  if (!elem) {
    throw new Error("Could not find element with that selector");
  }
  let parent = elem.parentElement;
  while (parent) {
    const { transform, willChange } = getComputedStyle(parent);
    if (transform !== "none" || willChange === "transform") {
      console.warn("🚨 Found a culprit! 🚨\n", parent, {
        transform,
        willChange,
      });
    }
    parent = parent.parentElement;
  }
}
```

## Overflow

### scroll container

`overflow-x` 和 `overflow-y` 只能做到隐藏一个 axis 的 scrollbar。

如果有任何一个 axis 的 overflow，都会一个 scroll container。然后要么 show or hide scrollbar。

overflow 是相对与 scroll container 的。overflow 也适用在 position containing blocks 上。

## sticky position

Sticky position 是在 parent 里面的。如果 parent 已经消失，sticky 元素就没有了。另外 sticky position 还是在 flow 里面的。

> 等到 sticky 生效时候，top/left/right/bottom 是相对于 viewport 的。

下面的情况，取决于 header 有多高。然后 sticky 就可以固定在屏幕上多久。

```
    <header>
      <div class="sticky"></div>
    </header>
```

如果 parent 有 overflow， sticky position 也会不好用。下面脚本会找出 sticky 的元素的 parent 是否含有 overflow。

> 为什么 parent 的 overflow 会影响 sticky position？因为一旦 parent 的 overflow 变成了 scroll container，sticky 就会相对于这个 scroll container 来定位。 如果 scroll container 的 top 不见了，sticky 就会消失。

```
const selector = '.the-fixed-child';
function findCulprits(elem) {
  if (!elem) {
    throw new Error(
      'Could not find element with that selector'
    );
  }
  let parent = elem.parentElement;
  while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== 'visible') {
      console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));
```

## hidden

- display: none
- visibility: hidden
- opacity: 0

accessibility
https://www.joshwcomeau.com/snippets/react-components/visually-hidden/

```
.visually-hidden:not(:focus):not(:active) {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0); /* Legacy property for Internet Explorer */
  clip-path: inset(50%);
  white-space: nowrap;
}
```
