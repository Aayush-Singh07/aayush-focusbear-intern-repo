# Understanding React Native Components vs. React Web Components (Issue #29)

This document analyzes the fundamental architectural differences between React Web components and React Native mobile components, covering native rendering pipelines, layout engines, and styling models.

---

## 1. Architectural Differences: Web DOM vs Native UI

In React Web, components return JSX that maps to standard **HTML Document Object Model (DOM)** nodes (such as `<div>`, `<span>`, `<p>`, `<button>`), which are styled with CSS rules and interpreted by a web browser engine (Chromium, WebKit, Gecko).

In **React Native**, there is **no browser** and **no HTML DOM**. Instead, React Native components act as JavaScript wrappers around platform-native UI widgets:
- An iOS application renders genuine UIKit views (`UIView`, `UILabel`, `UIImageView`, `UITableView`).
- An Android application renders genuine Android views (`android.view.ViewGroup`, `android.widget.TextView`, `android.widget.ImageView`, `androidx.recyclerview.widget.RecyclerView`).

```
React Component (JS) ──> React Native Bridge / JSI ──> Native Platform Widget (iOS / Android)
```

---

## 2. Core Primitive Mapping

| React Web (HTML) | React Native Component | Native iOS Counterpart | Native Android Counterpart | Key Behavior / Notes |
| :--- | :--- | :--- | :--- | :--- |
| `<div>`, `<section>` | `<View>` | `UIView` | `android.view.ViewGroup` | Container layout element; defaults to `flexDirection: 'column'`. |
| `<p>`, `<span>`, `<h1>` | `<Text>` | `UILabel` / `UITextView` | `android.widget.TextView` | All text MUST be wrapped in `<Text>`. Raw strings in `<View>` crash the app. |
| `<img>` | `<Image>` | `UIImageView` | `android.widget.ImageView` | Requires explicit `width` and `height` dimensions for remote network images. |
| `<div style="overflow:scroll">` | `<ScrollView>` | `UIScrollView` | `android.widget.ScrollView` | Renders all children at once; ideal for small, finite content. |
| Paginated list / table | `<FlatList>` | `UITableView` | `androidx.recyclerview.widget.RecyclerView` | Virtualized list; renders only currently visible items for high memory efficiency. |
| `<button>` | `<TouchableOpacity>` / `<Pressable>` | `UIControl` | `android.view.View` | Handles touch feedback, active opacities, and gestures. |

---

## 3. Reflection Questions & Deep-Dive Answers

### What are the key differences between `<View>` and `<div>`?
1. **Target Rendering Target:** `<div>` outputs an HTML DOM element parsed by a browser. `<View>` compiles down to native platform views (`UIView` on iOS, `ViewGroup` on Android).
2. **Default Layout Engine:**
   - In web CSS, `<div>` has `display: block` by default.
   - In React Native, `<View>` is powered by **Yoga** (Meta’s C++ cross-platform flexbox layout engine). It has `display: flex` by default, with `flexDirection: 'column'` (unlike web flexbox, which defaults to `row`).
3. **Text Containment:** In HTML, you can put raw text strings directly inside a `<div>Hello</div>`. In React Native, placing text directly inside a `<View>` triggers a fatal runtime red-screen error (`Invariant Violation: Text strings must be rendered within a <Text> component`).
4. **CSS Features:** `<div>` supports the entire CSS specification (grid, float, CSS animations, media queries). `<View>` supports a strict, performance-optimized subset of flexbox and transform styling properties.

---

### How does `StyleSheet.create()` improve performance compared to inline styles?
1. **Object Identity & Garbage Collection:**
   - When using inline styles (`style={{ padding: 16, backgroundColor: '#fff' }}`), a brand new JavaScript object is allocated in memory on **every single render cycle**.
   - With `StyleSheet.create()`, style definitions are parsed and frozen once when the module loads, eliminating garbage collection churn.
2. **Native Bridge Optimization (Style IDs):**
   - Historically and under optimized bridge pipelines, `StyleSheet.create()` registers style objects in an internal registry and sends numeric references (IDs) across the JavaScript-to-Native bridge. The native side caches the layout properties and references them by ID, avoiding the overhead of serializing and deserializing large JSON objects across threads on every frame.
3. **Compile-Time Validation:** `StyleSheet.create()` validates style rules at bundle time, immediately catching invalid properties or typos (e.g., alert if you use `background-color` instead of `backgroundColor`).

---

### Why doesn’t React Native use `className` like React Web?
1. **Absence of a CSS Cascade Engine:**
   - Browsers have highly sophisticated CSS layout and cascading engines that calculate specificity, inherited styles, pseudo-classes (`:hover`, `:active`), and media queries against a global style tree.
   - Mobile operating systems have no concept of CSS or class-based rule cascades. Implementing a full CSS cascading parser in JavaScript on mobile would significantly degrade runtime performance and frame rates.
2. **Predictability & Scoping:**
   - Global CSS class names often suffer from namespace collisions, unexpected style leaks, and unpredictable specificity wars.
   - React Native enforces explicit, scoped style objects that map directly to native properties, ensuring that components look identical regardless of where they are mounted in the view hierarchy.
3. **Ahead-of-Time Optimization:**
   - Direct style objects allow React Native's underlying C++ layout engine (Yoga) to compute flex dimensions directly without computing intermediate CSS rules.
