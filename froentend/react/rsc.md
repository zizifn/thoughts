# React server components

## Server Components

简单来说，RSC 就是在 server 渲染组件，然后把 JSX 传给客户端。可以利用 https://rsc-parser.vercel.app/ 来理解 RSC protocol。

RSC 不可以使用 Client 的东西，比如 state 和 error boundary。

但是 RSC 可以解决 data loading waterfall 的问题。利用 suspense 可以让一个 RSC 请求 streaming JSX 到客户端，这样可以让界面快速显示。

然后可以利用 asynclocalstorage 让一个 RSC 请求共享数据，这样可以避免传入 props。

> 如果 RSC 渲染出错，还是需要 client 端的 error boundary 来处理错误。

## Client Components

怎么把一个 client component 利用 JSX protocol 进行传输呢？首先你需要有个标记，比如 `use client`。然后在 import client component 的时候，利用 bundler 或者 node loader 进行转化，转换成下面的格式

```js
"$$typeof": "Symbol(react.client.reference)",
"$$id": "ui/edit-text.js#EditableText"
```

然后在调用 `renderToPipeableStream` 的时候，client component 会被转化成一个 `client reference`，`b:I["/edit-text.js","EditableText"]`。

Client createFromFetch 就会解析这个 `client reference`，下载 client component 的 JS code，然后在客户端进行渲染。

```
const initialContentFetchPromise = fetch(`/rsc${initialLocation}`)
const initialContentPromise = createFromFetch(initialContentFetchPromise, {
	moduleBaseURL: `${window.location.origin}/ui` // 🐨 add a moduleBaseURL option here set to `${window.location.origin}/ui`
})
```

## Client Router

如果使用 RSC，我们使用 form 或者点击，就会发送请求给服务器。服务器返回一个新的 RSC。这样就会导致页面刷新。

我们需要利用禁止 form 和 link，让所有的请求走到我们自己定义的 navigator 里面，然后利用 `createFromFetch` 来渲染新的 RSC。

```jsx
function Root() {
    ......
	function navigate(nextLocation, { replace = false } = {}) {
		setNextLocation(nextLocation)
		const thisNav = Symbol(`Nav for ${nextLocation}`)
		latestNav.current = thisNav

		// 🐨 create a nextContentKey with generateKey()
		const nextContentKey = generateKey()
		const nextContentPromise = createFromFetch(
			fetchContent(nextLocation).then((response) => {
				if (thisNav !== latestNav.current) return
				if (replace) {
					window.history.replaceState({ key: nextContentKey }, '', nextLocation)
				} else {
					window.history.pushState({ key: nextContentKey }, '', nextLocation)
				}
				return response
			}),
		)

		contentCache.set(nextContentKey, nextContentPromise)

		// 🐨 update this to setContentKey(nextContentKey)
		startTransition(() => setContentKey(nextContentPromise))
	}
}

```

## Server Actions

Server action 是 open door 给 client component。具体是利用 `use server` 来标记一个 action。然后在 client component 里面调用这个 action。RSC protocol 会把这个 action 变成一个 `server reference`。

```
13:{"id":"file:///C:/BaiduNetdiskDownload/Learn%20React%2019%20with%20Epic%20React%20v2/github/react-server-components/playground/ui/actions.js#updateShipName","bound":null}
```

当解析 RSC 时候，就会自动把 action 变成一个 RPC over fetch 的 call。

```js
function createFromFetch(fetchPromise) {
  return RSC.createFromFetch(fetchPromise, {
    moduleBaseURL: `${window.location.origin}/ui`,
    callServer,
  });
}

async function callServer(id, args) {
  const fetchPromise = fetch(`/action${getGlobalLocation()}`, {
    method: "POST",
    headers: { "rsc-action": id },
    body: await RSC.encodeReply(args),
  });
  const contentKey = window.history.state?.key ?? generateKey();
  onStreamFinished(fetchPromise, () => {
    updateContentKey(contentKey);
  });
  const actionResponsePromise = createFromFetch(fetchPromise);
  contentCache.set(contentKey, actionResponsePromise);
  const { returnValue } = await actionResponsePromise;
  return returnValue;
}
```

当 server 接收到 rsc-action 的时候，就会解析这个 action。这样就是实现了 action RPC.

```js
app.post("/action", async (context) => {
  const serverReference = context.req.header("rsc-action");
  const [filepath, name] = serverReference.split("#");
  const action = (await import(filepath))[name]; // 动态import action，然后调用函数。
  if (action.$$typeof !== Symbol.for("react.server.reference")) {
    throw new Error("Invalid action");
  }

  const formData = await context.req.formData();
  const args = await decodeReply(formData, moduleBasePath);
  const result = await action(...args);
  return await renderApp(context, result);
});
```
