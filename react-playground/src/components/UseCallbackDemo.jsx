import React, { useState, useCallback, useRef } from 'react';

/**
 * Memoized Child Button Component
 * Wrapped in React.memo to ensure it only re-renders when its props change (shallow comparison)
 */
const ChildActionButton = React.memo(({ onAction, label, color = 'blue' }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    rose: 'bg-rose-600 hover:bg-rose-700',
  };

  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
      <div>
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <div className="text-xs text-slate-400 mt-0.5">
          Child Render Count:{' '}
          <span className="inline-block px-1.5 py-0.2 bg-slate-200 text-slate-700 font-mono font-bold rounded">
            {renderCount.current}
          </span>
        </div>
      </div>
      <button
        onClick={onAction}
        className={`px-3 py-1.5 text-xs text-white font-medium rounded-md shadow-sm transition-colors ${colorClasses[color]}`}
      >
        Trigger Action
      </button>
    </div>
  );
});

/**
 * UseCallbackDemo Component (Issue #68)
 * 
 * Demonstrates:
 * 1. Referential Equality of Functions: In JS, `() => {} !== () => {}`.
 * 2. Unmemoized Function: Recreated on every parent render -> forces `React.memo` child to re-render.
 * 3. Memoized with `useCallback`: Maintains same memory reference -> child skips unnecessary re-render!
 */
export default function UseCallbackDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [textInput, setTextInput] = useState('');
  const [lastAction, setLastAction] = useState('None');

  // 1. UNMEMOIZED FUNCTION: Recreated every time parent re-renders!
  const unmemoizedHandler = () => {
    setLastAction('Unmemoized Handler Triggered');
  };

  // 2. MEMOIZED FUNCTION WITH useCallback: Preserves exact reference across renders!
  const memoizedHandler = useCallback(() => {
    setLastAction('Memoized Handler Triggered');
  }, []); // Empty deps = stable reference forever

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Hook: useCallback</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-50 text-cyan-700 rounded-full">
          Referential Equality
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Trigger Parent Re-render (Type in input):
          </label>
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Type something to re-render parent..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center justify-between p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
          <span className="text-xs font-medium text-cyan-900">Parent Re-renders Triggered:</span>
          <button
            onClick={() => setParentCount((c) => c + 1)}
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs font-bold rounded"
          >
            Counter: {parentCount}
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {/* Child with UNMEMOIZED function - re-renders on EVERY parent keystroke */}
          <ChildActionButton
            onAction={unmemoizedHandler}
            label="Without useCallback (Unoptimized)"
            color="rose"
          />

          {/* Child with MEMOIZED function - SKIPS re-renders when parent types */}
          <ChildActionButton
            onAction={memoizedHandler}
            label="With useCallback (Optimized)"
            color="blue"
          />
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200">
          Last Action: <span className="font-semibold text-slate-800">{lastAction}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-cyan-50 rounded-md border border-cyan-200 text-xs text-cyan-950">
        💡 <strong>Notice the Render Counts:</strong> When you type above, the unoptimized child button increments its render counter repeatedly, while the <code className="font-mono">useCallback</code> child remains frozen!
      </div>
    </div>
  );
}
