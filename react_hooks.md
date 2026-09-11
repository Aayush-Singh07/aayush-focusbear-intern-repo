# React Hooks: Comprehensive Reflection & Guide

This document explores the mechanics, design patterns, performance considerations, and common pitfalls of React's core hooks: `useEffect`, `useMemo`, and `useCallback`.

---

## 1. Managing Side Effects with `useEffect` (Issue #66)

### What is `useEffect`?
`useEffect` lets functional components synchronize with external systems (APIs, DOM manipulation, timers, subscriptions). It executes after React paints the screen.

```jsx
import { useState, useEffect } from 'react';

export default function UseEffectDemo() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('focus-bear');

  // Mount, unmount, and dependency synchronization
  useEffect(() => {
    console.log("Component mounted or query changed:", query);

    // Setup an external listener or timer
    const handleResize = () => console.log("Window resized:", window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup function: runs before the effect re-runs and on unmount
    return () => {
      console.log("Cleaning up effect for query:", query);
      window.removeEventListener("resize", handleResize);
    };
  }, [query]); // Dependency array

  return <div>Current Query: {query}</div>;
}
```

### Reflection Questions & Answers

#### When should you use `useEffect` instead of handling logic inside event handlers?
- **Event Handlers:** Should be used for specific user-initiated interactions (e.g., clicking a button, submitting a form). If code runs *because* a user took a specific action, place it directly in the event handler (e.g., `onClick`, `onSubmit`).
- **`useEffect`:** Should be used for synchronization that must occur *because the component was displayed* or *because certain state changed regardless of what triggered the change*. Examples include:
  - Synchronizing with non-React widgets (e.g., Google Maps or Chart.js).
  - Setting up global event listeners (`window.addEventListener('resize')`).
  - Managing WebSockets or subscriptions.
  - Fetching initial data when a page mounts.

#### What happens if you don’t provide a dependency array?
- If no dependency array is passed (`useEffect(() => { ... })`), the effect callback executes **after every single render**.
- If that effect updates state inside itself without conditional guards, it triggers another render, causing an **infinite render loop** that crashes the browser.
- In contrast:
  - `[]` (empty array): Runs **once** after the initial mount, and cleanup runs on unmount.
  - `[dep1, dep2]`: Runs on mount and whenever `dep1` or `dep2` changes (shallow comparison via `Object.is`).

#### How can improper use of `useEffect` cause performance issues?
1. **Unnecessary Re-Renders (Chained Effects):** Using `useEffect` to compute derived state (e.g., calculating a total from a cart array) causes an extra render cycle: React renders with stale state, the effect fires, sets state, and React renders again. Derived state should simply be calculated during render time or memoized with `useMemo`.
2. **Missing Cleanup Functions (Memory Leaks):** Subscribing to timers (`setInterval`), WebSockets, or global DOM listeners without returning a cleanup function keeps listeners alive in memory even after the component unmounts.
3. **Over-Triggering Effects:** Passing non-primitive objects or inline functions in the dependency array causes the effect to run on every render because object references change on each render.

---

## 2. Optimizing Performance with `useMemo` (Issue #67)

### What is `useMemo`?
`useMemo` caches the result of an expensive calculation between renders. It recalculates the value only when one of its declared dependencies changes.

```jsx
import { useState, useMemo } from 'react';

export default function ExpensiveComponent({ numbers }) {
  const [darkTheme, setDarkTheme] = useState(false);

  // Expensive calculation memoized
  const sumOfFactorials = useMemo(() => {
    console.log("Running heavy calculation...");
    return numbers.reduce((acc, num) => {
      let f = 1;
      for (let i = 1; i <= num; i++) f *= i;
      return acc + f;
    }, 0);
  }, [numbers]); // Only recalculates when `numbers` array reference changes

  return (
    <div className={darkTheme ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <button onClick={() => setDarkTheme(!darkTheme)}>Toggle Theme</button>
      <p>Result: {sumOfFactorials}</p>
    </div>
  );
}
```

### Reflection Questions & Answers

#### How does `useMemo` improve performance?
By caching the computed result in memory, `useMemo` skips expensive CPU-intensive loops or transformations when unrelated state (such as the `darkTheme` toggle above) triggers a component re-render. Without `useMemo`, every render would re-execute the heavy factorial calculation, resulting in noticeable UI stutter and dropped frames.

#### When should you avoid using `useMemo`?
1. **Trivial Calculations:** Simple operations (e.g., adding numbers, filtering small arrays of 20 items, string concatenations) execute in sub-microseconds. The overhead of calling `useMemo`, instantiating dependency arrays, and comparing them on every render is higher than the calculation itself!
2. **Premature Optimization:** Do not wrap every value in `useMemo`. Only reach for it when profiling in React DevTools shows measurable render lag (>10-20ms) or when creating stable object references passed to memoized children.

#### What happens if you remove `useMemo` from your implementation?
If removed, the expensive function executes on **every single render** of the component. If the component re-renders due to parent updates, user keystrokes in an input, or unrelated state toggles, the user will experience UI lag, sluggish typing, and frozen animations.

---

## 3. Preventing Unnecessary Renders with `useCallback` (Issue #68)

### What is `useCallback`?
In JavaScript, functions are first-class objects. Every time a component re-renders, any function defined inside it is recreated with a **new memory reference** (`functionA !== functionA`).

`useCallback` caches a **function definition** between renders, maintaining the same referential identity as long as its dependencies have not changed.

```jsx
import React, { useState, useCallback } from 'react';

// Memoized child component
const ActionButton = React.memo(({ onAction, label }) => {
  console.log(`Rendered button: ${label}`);
  return (
    <button onClick={onAction} className="px-3 py-1 bg-blue-600 text-white rounded">
      {label}
    </button>
  );
});

export default function ParentComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoized callback maintains referential equality
  const handleAction = useCallback(() => {
    console.log("Action performed!");
  }, []); // Stable reference across renders

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type here..." />
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
      {/* ActionButton will NOT re-render when `text` or `count` changes! */}
      <ActionButton onAction={handleAction} label="Submit Action" />
    </div>
  );
}
```

### Reflection Questions & Answers

#### What problem does `useCallback` solve?
When a parent component re-renders, it creates brand new function instances for its inline handlers. If these handlers are passed as props to child components that are optimized with `React.memo`, the child detects a new prop reference (`props.onAction !== prevProps.onAction`) and is forced to re-render, defeating the purpose of `React.memo`.
`useCallback` ensures referential stability, allowing `React.memo` child components to skip re-renders.

#### How does `useCallback` work differently from `useMemo`?
- **`useMemo`:** Calls the provided function and returns the **computed value** (`useMemo(() => computeValue(a, b), [a, b])`).
- **`useCallback`:** Does not call the function; it returns the **function definition itself** (`useCallback(fn, deps)` is syntactic sugar for `useMemo(() => fn, deps)`).

#### When would `useCallback` not be useful?
1. **When passing functions to regular DOM elements:** Passing a callback to `<button onClick={cb}>` provides zero performance benefit because standard HTML DOM elements do not use `React.memo`.
2. **When child components are not wrapped in `React.memo`:** If the child component re-renders anyway on every parent render, memoizing the passed callback wastes memory without preventing any renders.
3. **When dependencies change on every render:** If the dependency array contains frequently mutating values, `useCallback` will regenerate the function on every render anyway.
