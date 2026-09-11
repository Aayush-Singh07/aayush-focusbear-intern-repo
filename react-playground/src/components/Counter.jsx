import React, { useState } from 'react';

/**
 * Counter Component (Issue #61)
 * 
 * Demonstrates:
 * 1. `useState` Hook: Declares a piece of reactive state (`count`) and its setter function (`setCount`).
 * 2. Immutable State Updates: NEVER do `count = count + 1`. Always call `setCount(...)` so React knows to trigger a re-render.
 * 3. Functional Updates (`setCount(prev => prev + 1)`): Ensures we are working with the latest pending state during concurrent renders or batching.
 * 4. User Inputs: Provides controls for incrementing, decrementing, and resetting state.
 */
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Functional update ensures correct state even if multiple updates are queued
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Local State: Counter</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
          useState
        </span>
      </div>

      <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-100 mb-6">
        <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Current Count</span>
        <div className="text-5xl font-black text-indigo-600 mt-1">
          {count}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={decrement}
          className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors active:scale-95"
        >
          - Decrement
        </button>
        <button
          onClick={reset}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-500 font-medium rounded-lg transition-colors active:scale-95"
        >
          Reset
        </button>
        <button
          onClick={increment}
          className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
        >
          + Increment
        </button>
      </div>

      <div className="mt-4 p-3 bg-amber-50 rounded-md border border-amber-200 text-xs text-amber-800">
        💡 <strong>State Mutation Rule:</strong> Modifying <code className="font-mono">count</code> directly (e.g. <code className="font-mono">count++</code>) fails to notify React, skipping the virtual DOM diffing and leaving the UI stuck!
      </div>
    </div>
  );
}
