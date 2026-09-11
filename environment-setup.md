# Setting Up a React Native Development Environment (Issue #30)

This document reflects on setting up a cross-platform mobile development environment using **Expo** and the **Metro Bundler**, detailing their architecture, developer workflows, and troubleshooting strategies.

---

## 1. Overview of the Setup

For this milestone, we set up an Expo-managed React Native project (`react-native-playground`). Expo provides a streamlined toolchain that abstracts the complex native compilation pipelines (Xcode for iOS and Android Studio/Gradle for Android), allowing developers to build universal applications using JavaScript/TypeScript and React Native.

### Core Workflow Commands:
- **Initialization:** `npx create-expo-app react-native-playground`
- **Starting Metro Bundler:** `npx expo start`
- **Running on Web:** `npx expo start --web`
- **Running on Mobile Devices:** Scanning the terminal QR code using the **Expo Go** application on physical iOS or Android devices.

---

## 2. Reflection: The Role of Metro in React Native Development

### What is Metro?
Metro is the dedicated JavaScript bundler developed specifically for React Native by Meta. Just as Webpack, Vite, or Rollup bundle assets for web browsers, Metro bundles all JavaScript code, assets, and third-party NPM packages into a single JavaScript payload that the mobile native runtime can execute.

### Core Responsibilities of Metro:
1. **Fast Compilation & Resolution:** Metro analyzes the dependency graph starting from the entry point (`index.js` or `App.js`) and converts modern JSX and ES-Next syntax into standard JavaScript via Babel.
2. **Asset Resolution:** Metro handles static assets (images, fonts, audio) with density-aware suffixes (e.g., `@2x.png`, `@3x.png`), automatically serving the appropriate resolution depending on the device's screen pixel density.
3. **Hot Module Replacement (Fast Refresh):** When code is modified, Metro calculates a surgical diff and pushes only the changed modules to the connected device via a WebSocket connection. React Native preserves component state while swapping out the updated component implementation in real time without a full app reload.
4. **Source Maps & Debugging:** Metro serves accurate source maps to the Chrome V8 debugger or Flipper, mapping native crash call-stacks directly back to original JSX source files.

---

## 3. Reflection: How Expo Simplifies React Native Development

Building pure "bare" React Native applications traditionally requires installing:
- Android SDK, Android Studio, NDK, JDK, and configuring complex environment variables (`ANDROID_HOME`, `JAVA_HOME`).
- macOS with Xcode, CocoaPods, and Apple Developer certificates for iOS.

### Key Advantages of the Expo Ecosystem:
1. **Zero Native Configuration Out-of-the-Box:** Developers can start writing and testing mobile code immediately with only Node.js installed.
2. **Instant Device Testing via Expo Go:** Instead of compiling a native APK or IPA binary for every test (which can take 5–15 minutes), the pre-compiled **Expo Go** app running on your physical device downloads the JavaScript bundle from Metro over local Wi-Fi in seconds.
3. **Managed Native Modules:** Expo provides curated, battle-tested native APIs (`expo-camera`, `expo-location`, `expo-notifications`, `expo-secure-store`) that guarantee compatibility across React Native versions without dealing with manual CocoaPod link errors or Gradle version collisions.
4. **Cloud Builds via EAS (Expo Application Services):** When production binaries are needed, EAS compiles native `.apk` and `.ipa` binaries in the cloud, removing the strict requirement for local Mac hardware to build iOS applications.

---

## 4. Reflection: Issues Encountered & Resolution Strategies

During mobile environment setup and Metro bundling, several common issues frequently arise:

| Challenge / Issue | Root Cause | Resolution Strategy |
| :--- | :--- | :--- |
| **Metro Port Conflict (`8081` in use)** | Another process (or previous Metro instance) occupied port `8081`. | Start Metro on an alternate port with `npx expo start --port 8082` or terminate the lingering Node process. |
| **Expo Go Connection Timeout / Network Mismatch** | The mobile device and workstation were on separate Wi-Fi subnets or blocked by firewalls. | Run Metro with the tunnel flag (`npx expo start --tunnel`), which proxies connections through a secure ngrok tunnel accessible across any network. |
| **Stale Cache / Dependency Resolution Errors** | Metro cached an older version of a package or an unlinked module after npm install. | Clear Metro's cache on startup using `npx expo start -c` (clear cache) or clean the temp directory (`npx react-native start --reset-cache`). |
| **Babel Configuration Conflicts** | Missing preset plugins for decorators or Reanimated worklets. | Ensure `babel.config.js` properly configures `babel-preset-expo` and places `react-native-reanimated/plugin` as the last item in the plugins array. |
