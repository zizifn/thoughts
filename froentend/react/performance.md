# React Performance

## Element Optimization

利用工具看是否需要，或者有过多的元素渲染。

然后优化方式是，

- 通过把状态下放到子组件，来减少父组件的渲染。
- 通过把子组件的 props 传递给子组件，来减少子组件的渲染。
- 也可以结合 context 来减少 props 的传递，然后配合 props
- useMemo 缓存计算结果 & memo 缓存组件

## Optimize Context

这个是利用 useMemo 来缓存 context 的值，避免每次都重新计算。而且把 context 组件下方，然后通过 children 传递给子组件。这样就避免 children 组件的重新渲染。

```jsx
<FooterProvider>
  <div>
    <FooterSetters />
    <button onClick={() => setAppCount((c) => c + 1)}>
      The app count is {appCount}
    </button>
    <Main footer={<Footer />} />
  </div>
</FooterProvider>;

function FooterProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState("black");
  const [name, setName] = useState("test");
  const value = useMemo(() => ({ color, name }), [color, name]);
  const disPatchvalue = useMemo(
    () => ({ setColor, setName }),
    [setColor, setName]
  );
  return (
    <FooterContext value={value}>
      <FooterDispatchContext value={disPatchvalue}>
        {children}
      </FooterDispatchContext>
    </FooterContext>
  );
}
```

## Concurrent Rendering

如果有个巨大的 list 需要做 filter，当你输入时候，list 会重新渲染。但是此时 input 是在输入的，所以会有卡顿， 因为需要等到 list 渲染完，才能输入。

React 现在提供新的 hook 可以让开发决定，render 的优先级，这样就不会 block input 的输入。

https://react.dev/reference/react/useDeferredValue#deferring-re-rendering-for-a-part-of-the-ui

下面是 `useDeferredValue` 执行的例子。

使用 `useDeferredValue` 来延迟渲染的值。如果 text 变化，`deferredText` 不会立刻更新，React 会认为他是一个低优先级的更新。这样 SlowList 的渲染就会被延迟。React 会尽力更新使用`deferredText` UI。如果 Text 改变， react 会 abort 或者站厅这个更新。

useTransition 也是类似的，但是是用来处理 UI 的过渡。

```jsx
export default function App() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);
  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  );
}
```

```jsx
export function MatchingPosts() {
  const [searchParams] = useSearchParams();
  const query = getQueryParam(searchParams);
  const deferredQuery = useDeferredValue(query);
  const matchingPosts = getMatchingPosts(deferredQuery);

  return (
    <ul className="post-list">
      {matchingPosts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </ul>
  );
}
```

## Code Splitting

lazy load component。

我们可以 eager load 组件根据一些 event。 如果用了 suspense，就需要考虑到 startTransition 来避免出现 loading。

```jsx
const loadGlobe = () => import("./globe.tsx");
const Globe = lazy(loadGlobe);
```

## Expensive Calculations

useMemo 来缓存计算结果 or Worker 来计算。 Comlink 可以用来简化 worker 的使用。

## Optimize Rendering

首先解决 slow rendering 的问题，然后在解决 re-rendering 的问题。

使用 memo 来缓存组件，避免不必要的渲染。然后尽量使用 primitive 来传递 props。这样 memo default compare 就可以避免不必要的渲染。

```jsx
import React, { memo } from "react";

const MyComponent = memo(({ value }) => {
  return <div>{value}</div>;
});

export default MyComponent;
```

## Windowing
