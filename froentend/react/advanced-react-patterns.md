# Advanced React Patterns

## Composition

有时候你需要考虑把有些内容提升到父组件。这样可以避免 props drilling。

```jsx
<Main
  sidebar={
    <List
      listitems={sportList.map((p) => (
        <li key={p.id}>
          <SportListItemButton sport={p} onClick={() => setSelectedSport(p)} />
        </li>
      ))}
    />
  }
  content={<Details selectedSport={selectedSport} />}
/>
```

## latest ref

TODO, impletment debounce

## Compound Components

这是常用的构建 componments 的方式。是利用 context 来实现状态之间的传递。

```jsx
type ToggleValue = { on: boolean, toggle: () => void };
const ToggleContext = (createContext < ToggleValue) | (null > null);

export function Toggle({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return <ToggleContext value={{ on, toggle }}>{children}</ToggleContext>;
}
<Toggle>
  <ToggleOn>The button is on</ToggleOn>
  <ToggleOff>The button is off</ToggleOff>
  <ToggleButton />
</Toggle>;
```

## Slots

Slots allow you to specify an element which takes on a particular role in the overall collection of components.

https://react-spectrum.adobe.com/react-aria/Button.html

Slots 也是一个组件组合的方式。 这是利用预先定义一些 prop (event etc),来预先定义一些逻辑。

```jsx
				<TextField> // 这里利用 Slots 和context 预先定义号label 和input 的id关联。
					<Label>Venue</Label>
					<Input />
				</TextField>
export function TextField({
	id,
	children,
}: {
	id?: string
	children: React.ReactNode
}) {
	const generatedId = useId()
	id ??= generatedId
	const solt = {
		label: { htmlFor: id },
		input: { id },
	}
	return <SlotContext value={solt}>{children}</SlotContext>
}
type Slots = Record<string, Record<string, unknown>>
export const SlotContext = createContext<Slots>({})
function useSlotProps(props: any, solt: string) {
	const context = use(SlotContext)
	const soltProps = context[solt]
	return {
		...soltProps,
		...props,
	}
}
export function Label(props: React.ComponentProps<'label'>) {
	const labelProps = useSlotProps(props, 'label')
	return <label {...labelProps} />
}

```

## Prop Collections and Getters

The Prop Collections and Getters Pattern allows your hook to support common use cases for UI elements people build with your hook.

```jsx
export function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.info("onButtonClick"),
          id: "custom-button-id",
        })}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}
```

## State Initializer

The state initializer pattern is a way to initialize (and reset) the state of a component in a predictable way.

这里使用 useRef 来保存初始值。 这样就可以始终使用这个初始值来重置状态。

```jsx
function useCounter({ initialCount = 0 } = {}) {
  const initialCountRef = useRef(initialCount);
  const [count, setCount] = useState(initialCountRef.current);
  const increment = () => setCount((c) => c + 1);
  const reset = () => setCount(initialCountRef.current);
  return { count, increment, reset };
}
```

## State Reducer

The State Reducer Pattern inverts control over the state management of your hook and/or component to the developer using it so they can control the state changes that happen when dispatching events.

这个 pattern 就是 IOC. 通过 hook 的方式反转控制。

```jsx
export function App() {
	const [timesClicked, setTimesClicked] = useState(0)
	const clickedTooMuch = timesClicked >= 4

	const { on, getTogglerProps, getResetterProps } = useToggle({
		extraReducer(state, action) {
			if (action.type === 'toggle' && clickedTooMuch) {
				return state
			}

			return toggleReducer(state, action)
		},
	})

```

## Control Props

The Control Props pattern allows users to completely control state values within your component. This differs from the state reducer pattern in the fact that you can not only change the state changes based on actions dispatched but you also can trigger state changes from outside the component or hook as well.

这是算是 IOC 的一个升级。一般的组件可能会使用这个 pattern， 他们暴露出来一个 event， 比如 onChange, 让用户来控制状态。

```jsx
function handleToggleChange(state: ToggleState, action: ToggleAction) {
  if (action.type === "toggle" && timesClicked > 4) {
    return;
  }
  setBothOn(state.on);
  setTimesClicked((c) => c + 1);
}
<Toggle on={bothOn} onChange={handleToggleChange} />;
```
