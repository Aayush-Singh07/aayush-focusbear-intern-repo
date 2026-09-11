import React from 'react';

/**
 * HelloWorld Component (Issue #60)
 * 
 * Demonstrates:
 * 1. Functional Components: Pure JavaScript functions that take `props` as input and return JSX.
 * 2. Dynamic Props: The `name` prop allows parent components to configure this child dynamically.
 * 3. Default Props: If no name is passed, it falls back to 'Focus Bear'.
 * 4. Immutability of Props: Props must NEVER be mutated inside a component (props are read-only).
 */
export default function HelloWorld({ name = "Focus Bear" }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md transition-all hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
          🐻
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Components & Props Demo
          </h3>
          <h2 className="text-2xl font-bold text-slate-800">
            Hello, {name}!
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        This component accepts a <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-mono text-xs">name</code> prop 
        and renders it dynamically inside the greeting.
      </p>
    </div>
  );
}
