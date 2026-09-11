# Navigation in React Native using React Navigation (Issue #27)

This document explores screen transitions, navigation patterns, and deep linking architectures in React Native applications powered by **React Navigation**.

---

## 1. Navigators in React Navigation

Unlike web applications where navigation revolves around browser URL paths, mobile applications utilize hierarchical container navigators that mirror native platform paradigms:

```
NavigationContainer
 └── Tab.Navigator (Bottom Tabs for high-level domains)
      ├── Screen 1 (Home)
      ├── Screen 2 (Habits)
      └── Stack.Navigator (Drill-down screen hierarchy)
           ├── Screen: List
           └── Screen: Item Details (Pushed on top)
```

---

## 2. Reflection Questions & Deep-Dive Answers

### What are the key differences between stack, tab, and drawer navigation?

| Navigator Type | Navigation Pattern | User Experience / Mental Model | Common Use Cases |
| :--- | :--- | :--- | :--- |
| **Stack Navigator** (`@react-navigation/native-stack`) | **LIFO (Last-In, First-Out) Stack** | Screens are pushed onto the top of the visual stack. The user pops back to previous screens via a back button or swipe gesture. | Drill-down flows (e.g., Product List ➔ Product Detail ➔ Checkout flow). |
| **Bottom Tab Navigator** (`@react-navigation/bottom-tabs`) | **Parallel Peer Destinations** | Persistent navigation bar pinned at the bottom of the viewport. Switching tabs maintains independent state for each tab branch. | Primary high-level application modules (e.g., Home, Search, Activity, Profile). |
| **Drawer Navigator** (`@react-navigation/drawer`) | **Off-Canvas Side Menu** | A menu panel that slides in from the screen edge upon swiping or tapping a hamburger icon. | Secondary tools, account switching, settings, or applications with 6+ major sections. |

---

### How does React Navigation handle screen transitions?

1. **Native Platform Drivers (`react-native-screens`):**
   - `@react-navigation/native-stack` delegates screen transitions directly to native platform primitives: `UINavigationController` on iOS and Android Fragment transactions on Android.
   - This ensures that page transitions (e.g., standard iOS horizontal slide-in, Android fade-up) execute at a full 60/120 FPS on the native UI thread, completely isolated from any JavaScript thread lag.
2. **Gesture Interaction & Interactive Pop:**
   - On iOS, native stack navigation automatically enables the native edge-swipe-to-go-back gesture. If the user starts swiping back and releases midway, the native engine animates smoothly back without needing JavaScript state calculations.
3. **Screen Lifecycle & Mounting Behavior:**
   - When Screen B is pushed over Screen A in a Stack, Screen A **remains mounted** in memory so that when the user pops back, the scroll position and form inputs in Screen A are completely preserved.
   - Screen focus is managed via hooks like `useFocusEffect` and `useIsFocused`, allowing developers to trigger data refreshes when a screen comes into view.

---

### How would you implement deep linking in a React Native app?

Deep linking enables external URLs (such as `focusbear://habit/123` or `https://focusbear.io/habit/123`) to open the mobile application and navigate directly to a specific nested screen.

#### Step 1: Configure URL Schemes & Universal Links
In `app.json` (for Expo):
```json
{
  "expo": {
    "scheme": "focusbear"
  }
}
```

#### Step 2: Define Linking Configuration in React Navigation
```javascript
import { NavigationContainer } from '@react-navigation/native';

const linking = {
  prefixes: ['focusbear://', 'https://focusbear.io'],
  config: {
    screens: {
      Home: 'home',
      HabitsTab: {
        screens: {
          HabitList: 'habits',
          HabitDetails: 'habits/:habitId', // URL param mapping
        },
      },
      Settings: 'settings',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* Navigator Hierarchy */}
    </NavigationContainer>
  );
}
```

#### Step 3: Handling Incoming Parameters
Inside `HabitDetailsScreen`, incoming URL route parameters (e.g., `habitId`) are accessed via `route.params.habitId`, allowing the screen to fetch and display the target item seamlessly.
