# Suspence

## data fetching

### react use 的原理。

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <TestErrorBoundary></TestErrorBoundary>
</Suspense>;
function TestErrorBoundary() {
  throw Promise.resolve("error"); // 这里抛出一个 promise，react 会自动捕获这个 promise, 并且会在这个 promise resolve 之后，重新渲染这个组件。
  throw Promise.reject("error"); // react 不在乎 promise 的状态。
}
```

然后一个自定义的 use, 这里利用向 promise 添加状态来跟踪这个 promise 是什么状态。

```jsx
type UsePromise<Value> = Promise<Value> & {
	status: 'pending' | 'fulfilled' | 'rejected'
	value: Value
	reason: unknown
}

function use<Value>(promise: Promise<Value>): Value {
	const usePromise = promise as UsePromise<Value>
	if (usePromise.status === 'fulfilled') {
		return usePromise.value
	} else if (usePromise.status === 'rejected') {
		throw usePromise.reason
	} else if (usePromise.status === 'pending') {
		throw usePromise
	} else {
		usePromise.status = 'pending'
		usePromise.then(
			(result) => {
				usePromise.status = 'fulfilled'
				usePromise.value = result
			},
			(reason) => {
				usePromise.status = 'rejected'
				usePromise.reason = reason
			},
		)
		throw usePromise
	}
}
```

## Dynamic Promise

如果下面 code， 会造成死循环。需要 getship 根据 name 返回一个固定的 promise。

```jsx
function ShipDetails({ shipName }: { shipName: string }) {
  const ship = use(getShip(shipName, delay));
}

const shipCache = new Map<string, Promise<Ship>>()

export function getShip(name: string, delay?: number) {
	const shipPromise = shipCache.get(name) ?? getShipImpl(name, delay)
	shipCache.set(name, shipPromise)
	return shipPromise
}
```

如果切换时候，Suspense 的 fallback 会出现。如果你需要自定义，可以使用 useTransition 来实现。

```jsx
const [isTransitionPending, startTransition] = useTransition();
function handleShipSelection(newShipName: string) {
  startTransition(() => {
    setShipName(newShipName);
  });
}
```

如果网速太快 isTransitionPending 太短，就会照成界面闪烁。 可以利用 useSpinDelay 来自定义 loading 状态是否显示，显示多久。

```jsx
const isPending = useSpinDelay(isTransitionPending, {
  delay: 300,
  minDuration: 350,
});
```

## Optimistic UI

如果使用 useTransition 来实现乐观更新， 不能够使用 useState 来更新数据。因为 state 不会及时更新。需要配合 useoptimistic 来实现。

```jsx
function CreateForm({
	setOptimisticShip,
	setShipName,
}: {
	setOptimisticShip: (ship: Ship | null) => void
	setShipName: (name: string) => void
}) {
	const [message, setMessage] = useOptimistic('Create')
	// 🐨 call useOptimistic for message and setMessage (initialize to 'Create')
	return (
		<div>
			<p>Create a new ship</p>
			<ErrorBoundary FallbackComponent={FormErrorFallback}>
				<form
					action={async (formData) => {
						setMessage('Creating...')
						setOptimisticShip(await createOptimisticShip(formData))

						await createShip(formData, 2000)

						setMessage('Created! Loading...')
						setShipName(formData.get('name') as string)
					}}
				>

```

## Suspense img

如果 img src 改变，img 会暂时保持上一个图片。如果向等待 img 加载完成，需要使用 use 和 suspense 来实现。

如果想在 usetransition 中让 nest 的 suspense 显示 fallback， 需要利用 key。

```jsx
function Img({ src = "", ...props }: React.ComponentProps<"img">) {
  src = use(imgSrc(src));
  return <img src={src} {...props} />;
}

function ShipImg(props: React.ComponentProps<"img">) {
  return (
    // 🐨 add a key to this ErrorBoundary. Set it to props.src
    <ErrorBoundary key={props.src} fallback={<img {...props} />}>
      <Suspense fallback={<img {...props} src="/img/fallback-ship.png" />}>
        <Img {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

Transition

- We call startTransition to change the shipName
- React tries to re-render and ShipDetails calls use(getShip(shipName)) which suspends
- React keeps the previous state around and gives us the isPending state as true so we can show a more - contextual pending UI (opacity 0.6).
- The getShip promise resolves and React attempts to render the ShipDetails again.
- ShipImg renders Img which calls use(imgSrc(src)) which suspends
- React keeps the isPending state as-is
- The imgSrc promise resolves and React attempts to render the Img again
- Everything settles.

## Responsive

如果使用 useTransition，那么 input search 的内容不一定能及时显示，因为 suspence。这里需要 useDeferredValue 来实现。useDeferredValue 会先用旧的值渲染，然后在 background 在渲染新的值。这样就可以保留上次的结果。

```jsx
function ShipSearch({
	onSelection,
}: {
	onSelection: (shipName: string) => void
}) {
	const [search, setSearch] = useState('')
	const deferredValue = useDeferredValue(search)
	const isPending = useSpinDelay(search !== deferredValue, {
		delay: 300,
		minDuration: 350,
	})
```

## Optimization

https://github.com/epicweb-dev/react-suspense/tree/main/exercises/06.optimization

### render-then-fetch
