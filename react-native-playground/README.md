# Focus Bear React Native Playground

Welcome to the **Focus Bear React Native Playground**, a mobile application built with **React Native**, **Expo**, and **React Navigation**.

This application implements and demonstrates the complete set of onboarding tasks for **Milestone 8: React Native Fundamentals**:
- 📱 **Issue #30:** Setting up a React Native Environment (Expo & Metro Server)
- 🧩 **Issue #29:** Understanding React Native Components vs. React Web (`CoreComponentsScreen.js`)
- 🎨 **Issue #28:** React Native Stylesheets vs CSS-in-JS (`StylingScreen.js`)
- 🧭 **Issue #27:** Navigation in React Native using React Navigation (`NavigationScreen.js` & `DetailsScreen.js`)
- ⚡ **Issue #26:** Handling Gestures & Animations (`GesturesAnimationsScreen.js`)

---

## 🛠️ Environment Setup & Installation Guide (Issue #30)

### 1. Prerequisites
- **Node.js**: v18+ (v20+ recommended)
- **npm**: v9+
- **Expo Go App**: Installed on your iOS (App Store) or Android (Google Play) device for physical device testing.

### 2. How the Environment was Scaffolding
The application leverages the managed Expo workflow, avoiding the need for local Xcode or Android Studio installations:

```bash
# 1. Install dependencies
npm install

# 2. Start the Metro Development Server
npx expo start
```

### 3. Testing on Devices
- **Physical Device:** Open the **Expo Go** app on your phone and scan the QR code generated in the terminal.
- **Web Browser:** Press `w` in the terminal to launch the application in your desktop browser.
- **Android Emulator:** Press `a` in the terminal (requires Android Studio emulator).
- **iOS Simulator:** Press `i` in the terminal (macOS only).

---

## 📁 Architecture & File Structure

```
react-native-playground/
├── src/
│   └── screens/
│       ├── CoreComponentsScreen.js       # Issue #29: View, Text, Image, FlatList
│       ├── StylingScreen.js              # Issue #28: StyleSheet.create, flexbox, dimensions
│       ├── NavigationScreen.js           # Issue #27: Stack navigation list
│       ├── DetailsScreen.js              # Issue #27: Route parameters and goBack
│       └── GesturesAnimationsScreen.js   # Issue #26: Animated API, gestures, InteractionManager
├── App.js                                # NavigationContainer with Tab & Stack Navigators
├── app.json                              # Expo configuration
├── package.json                          # Dependencies
└── README.md                             # Setup guide
```

---

## 📚 Accompanying Reflection Documentation
Comprehensive written reflections detailing the theoretical foundations and answers to the milestone questions can be found in the root repository:
- 📖 [`environment-setup.md`](../environment-setup.md)
- 📖 [`rn-components.md`](../rn-components.md)
- 📖 [`rn-styling.md`](../rn-styling.md)
- 📖 [`rn-navigation.md`](../rn-navigation.md)
- 📖 [`rn-gestures-animations.md`](../rn-gestures-animations.md)
