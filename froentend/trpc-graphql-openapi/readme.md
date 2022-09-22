# 如何让前后端高效的合作？

如果要问，前后端交流什么最烦，

1. 那么估计就是 API 的定义会排在第一位。
2. 第二位或许就是定义 API 的 model， 并且保持 API model 是最新的。

如果能完美的解决这个两个问题，那么前后端开发者，估计都很开心，再也不用一起撕逼了。

本文，我讲分别阐述，目前最流行的三种解决方案优缺点。

## 魔法一般的 TRPC

> 请不要把 TRPC 和 GRPC 混为一谈，他们可以说毫不相干。

如果你的项目恰好是 full stack 项目，前后端在一起，比如 Next.js 或者 express.js + angular/vue/react。 并且你们使用 typescript，那么 TRPC 是非常值得你考虑的产品。

![trpc](./trpc.gif)

上图的 client 没有导入任何 server 端的 code，仅仅是导入 type。

注意看，这里 server 定义的任何 type 基本是不需要特别的 model 的，然后 client 都可以无痛的拿到。

Client 甚至感觉不到自己在发起 http 请求，就像调用一个方法一样。所有的参数和返回值都有自动有了 type。

如果你经常被后端 api 的结构坑，或者经常手写后端 api 的 model 定义，那么 trpc 就是提高效率，提前下班的技术。

更多例子请参考官网，https://trpc.io/。

TRPC 无需 code generator 就可以 前后端的接口是一直，并且它会让前后端的边界变得是非常模糊。

![trpc-png](./trpc-png.excalidraw.png)

### 是否是强 type

TRPC 在编译器和运行时，如果传入的 type 不满足定义，都会直接报错。

### 不足的地方

1. 必须是 typescript
2. 如果 mobile 采用原生的技术， 那么 trpc 使用起来很困难。
   不过 https://github.com/jlalmes/trpc-openapi 这个项目，可以把 trpc 的 API 生成 openapi/swagger，这样非 Typescript 的项目就可以使用了。

## 重新创建一门语言的 Graphql

GraphQL 创造了一本新的语言， 我们再写 GraphQL 时候，首先是先定义 利用 GQL schema。

![graphql](./graphql.gif)

一旦写好，query 就可以根据 code gen 生成不同语言的调用 code。

## 为什么基于 REST 的 OpenAPI 为什么不完美

虽然 openapi 是标准，但是 openapi 的生成和 code 并不是 match 的，不是强制的。

## 本质的区别

![type](./type.excalidraw.png)
