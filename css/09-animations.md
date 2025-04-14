# Animations

## Designing Animations

- Realism 不能为了动画而动画。

- Animation duration， 一般在 200ms-500ms 之间。

> https://medium.com/bridge-collection/improve-the-payment-experience-with-animations-3d1b0a9b810e

> https://abookapart.com/products/animation-at-work

> https://tobiasahlin.com/blog/meaningful-motion-w-action-driven-animation/

### Action-Driven Animation

- Enter duration: 500ms
- Enter timing function: ease-out
- Exit duration: 250ms
- Exit timing function: ease-in

### Orchestration

- The backdrop starts fading in right away, and lasts a long time (1000ms).
- The modal waits for 250ms, and then slides in over 400ms
- The close button is now hidden by default, and is given its own unique transition. It starts - - animating after 600ms, and lasts 250ms.

## 特效 demo

https://tympanus.net/
