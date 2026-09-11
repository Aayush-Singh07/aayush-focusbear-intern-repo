# React Playground: Focus Bear Onboarding Lab

Welcome to the **React Playground**, a modern React application built with **Vite**, **Tailwind CSS**, **React Router**, **Redux Toolkit**, and **Axios**.

This project implements and demonstrates the complete set of onboarding milestones for:
- 🚀 **Issue #59:** Setting Up React + Tailwind CSS
- 🧩 **Issue #60:** Understanding Components & Dynamic Props (`HelloWorld.jsx`)
- 🔄 **Issue #61:** State Management & User Input with `useState` (`Counter.jsx`)
- 📋 **Issue #62:** Working with Lists & Unique Keys (`ListForm.jsx`)
- 📦 **Issue #63 & #64:** Global State with Redux Toolkit & Selectors (`ReduxCounterDemo.jsx`)
- 🗺️ **Issue #65:** Client-Side Routing with React Router (`Home.jsx` & `Profile.jsx`)
- ⚡ **Issue #66:** Managing Side Effects with `useEffect` (`UseEffectDemo.jsx`)
- 🧠 **Issue #67:** Performance Optimization with `useMemo` (`UseMemoDemo.jsx`)
- 🎯 **Issue #68:** Referential Equality & Optimization with `useCallback` (`UseCallbackDemo.jsx`)
- 🌐 **Issue #73:** Enterprise Networking with Axios & Interceptors (`axiosInstance.js` & `ApiDemo.jsx`)

---

## 🛠️ Environment Setup & Installation Guide (Issue #59)

### 1. Prerequisites
- **Node.js**: v18 or later (v24 recommended)
- **npm**: v9 or later

### 2. How the Environment was Scaffolding
We opted for **Vite** over Create-React-App because Vite offers instantaneous hot-reloading via native ES Modules and fast esbuild bundling:

```bash
# 1. Initialize Vite project with React template
npm create vite@latest react-playground -- --template react

# 2. Install core application dependencies
npm install react-router-dom axios @reduxjs/toolkit react-redux

# 3. Install and configure Tailwind CSS & PostCSS
npm install -D tailwindcss postcss autoprefixer
```

### 3. Configuring Tailwind CSS
`tailwind.config.js` was configured to parse templates and components across `index.html` and `src/**/*.{js,ts,jsx,tsx}`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

And `src/index.css` imports the core Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🚀 Running the Project Locally

To run this application on your local workstation:

```bash
# 1. Navigate to the playground directory
cd react-playground

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the Vite local development server
npm run dev
```

The Vite dev server will print a local URL (typically `http://localhost:5173/`). Open this URL in your web browser to test all interactive learning modules.

---

## 📁 Architecture & File Hierarchy

```
react-playground/
├── src/
│   ├── components/
│   │   ├── HelloWorld.jsx        # Issue #60: Props and greeting demo
│   │   ├── Counter.jsx           # Issue #61: useState & immutability demo
│   │   ├── ListForm.jsx          # Issue #62: List rendering & unique keys
│   │   ├── ReduxCounterDemo.jsx  # Issue #63/#64: RTK useSelector/useDispatch
│   │   ├── UseEffectDemo.jsx     # Issue #66: Mount/unmount lifecycle & cleanup
│   │   ├── UseMemoDemo.jsx       # Issue #67: Expensive prime calculations
│   │   ├── UseCallbackDemo.jsx   # Issue #68: React.memo & referential equality
│   │   └── ApiDemo.jsx           # Issue #73: GET/POST, abort signal & tokens
│   ├── pages/
│   │   ├── Home.jsx              # Issue #65: Main dashboard page
│   │   └── Profile.jsx           # Issue #65: Sub-page demonstrating CSR
│   ├── redux/
│   │   ├── store.js              # Issue #63: Central Redux store configuration
│   │   └── counterSlice.js       # Issue #63/#64: Slice reducers & selectors
│   ├── services/
│   │   └── axiosInstance.js      # Issue #73: Axios client with interceptors
│   ├── App.jsx                   # React Router layout & header navigation
│   ├── index.css                 # Tailwind CSS styles
│   └── main.jsx                  # Root entry point with Redux Provider
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 📚 Accompanying Reflection Documentation
Detailed theoretical analyses and deep-dive answers to each issue's reflection prompts are documented in the root repository files:
- 📖 [`react_fundamentals.md`](../react_fundamentals.md)
- 📖 [`react_hooks.md`](../react_hooks.md)
- 📖 [`redux_fundamentals.md`](../redux_fundamentals.md)
- 📖 [`api_calls.md`](../api_calls.md)
