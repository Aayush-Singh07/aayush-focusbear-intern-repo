# React Native Stylesheets vs CSS-in-JS (Issue #28)

This document explores the styling architecture of React Native, detailing how styling differs from traditional CSS, the role of `StyleSheet.create()`, and practical strategies for responsive mobile layout design.

---

## 1. Core Architecture of React Native Styling

React Native does not use CSS files or stylesheet preprocessors (`.css`, `.scss`). Instead, styling is written in pure JavaScript objects that adhere to the CSS Flexbox specification as implemented by the cross-platform **Yoga** layout engine.

```javascript
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
});
```

---

## 2. Reflection Questions & Deep-Dive Answers

### Why does React Native use `camelCase` instead of traditional CSS properties?
1. **JavaScript Object Key Syntax:**
   - In traditional CSS, rules use hyphenated kebab-case syntax (`background-color`, `font-size`, `margin-bottom`).
   - In React Native, styles are defined as first-class JavaScript object literals. In JavaScript, hyphenated keys without quotes are interpreted as subtraction operators (`margin - bottom`).
   - Using `camelCase` (`backgroundColor`, `fontSize`, `marginBottom`) allows standard, unquoted JavaScript object keys that conform to idiomatic JavaScript and TypeScript definitions.
2. **Alignment with Native API Conventions:**
   - Both Apple's Swift/Objective-C frameworks and Google's Kotlin/Java Android SDKs use camelCase for property setters and view attributes (e.g., `backgroundColor`, `fontSize`).

---

### What are the benefits of using `StyleSheet.create()` over inline styles?

| Comparison Point | Inline Styles (`style={{ ... }}`) | `StyleSheet.create({ ... })` |
| :--- | :--- | :--- |
| **Memory Allocation** | Recreates a new object on every render frame. | Allocates object once at module initialization. |
| **Garbage Collection Pressure** | High; leads to frame drops on complex screens. | Negligible; objects remain stable in memory. |
| **Bridge / JSI Efficiency** | Sends full serialized objects over the bridge. | Re-uses cached style definitions / numeric IDs. |
| **Static Validation** | Catches errors only at runtime when rendered. | Validates property keys and value types early at compile time. |
| **Readability & Structure** | Clutters JSX hierarchy with styling logic. | Clean separation of UI structure and visual design. |

---

### How would you handle different screen sizes in React Native?

Mobile applications must adapt gracefully across compact phones (iPhone SE), modern flagships (iPhone 16 Pro Max), and tablets (iPad, Galaxy Tab). Three complementary strategies are used:

#### 1. Fluid Flexbox Layouts (Primary Approach)
Instead of hardcoding pixel coordinates (`width: 380`), rely on flex ratios:
- Use `flex: 1` to fill available parent containers.
- Use `flexDirection: 'row'` / `'column'` with `justifyContent: 'space-between'` or `alignItems: 'center'` to distribute space proportionally.
- Use percentage-based dimensions (`width: '90%'`).

#### 2. Responsive Screen Dimensions (`useWindowDimensions`)
React Native provides the `useWindowDimensions` hook, which automatically updates whenever the screen rotates or the viewport resizes:

```javascript
import { useWindowDimensions } from 'react-native';

export function ResponsiveCard() {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View style={{
      width: isTablet ? '48%' : '100%',
      padding: isTablet ? 24 : 16,
    }}>
      <Text>Responsive Card Content</Text>
    </View>
  );
}
```

#### 3. Platform & Density Specific Styling (`Platform` & `PixelRatio`)
- **`Platform.select()`**: Tailor shadow and elevation styling per OS:
  ```javascript
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }),
  ```
- **`SafeAreaView` / `useSafeAreaInsets`**: Prevent UI components from being obscured by modern device notches, status bars, and home indicator gestures.
