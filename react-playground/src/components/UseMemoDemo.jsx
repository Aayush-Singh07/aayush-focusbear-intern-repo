import React, { useState, useMemo } from 'react';

/**
 * UseMemoDemo Component (Issue #67)
 * 
 * Demonstrates:
 * 1. Expensive Calculation: Simulates high-cost iteration across a large dataset.
 * 2. `useMemo` Optimization: Caches the calculation result and only re-runs it when `targetNumber` changes.
 * 3. Unrelated State Changes: Typing in the input field or toggling the UI theme re-renders
 *    the component WITHOUT re-triggering the expensive calculation.
 */
export default function UseMemoDemo() {
  const [targetNumber, setTargetNumber] = useState(25);
  const [darkTheme, setDarkTheme] = useState(false);
  const [keystrokes, setKeystrokes] = useState('');
  const [calcTime, setCalcTime] = useState(0);

  // Expensive calculation: Finds nth prime or heavy factorial summation
  const calculatePrimes = (max) => {
    const startTime = performance.now();
    let primes = [];
    for (let i = 2; i <= max * 1000; i++) {
      let isPrime = true;
      for (let j = 2; j * j <= i; j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
    }
    const endTime = performance.now();
    return { count: primes.length, duration: (endTime - startTime).toFixed(2) };
  };

  // MEMOIZED CALCULATION:
  // Only re-runs when `targetNumber` changes!
  const primeResult = useMemo(() => {
    const res = calculatePrimes(targetNumber);
    setCalcTime(res.duration);
    return res;
  }, [targetNumber]);

  return (
    <div className={`rounded-xl shadow-sm border p-6 max-w-md transition-colors ${
      darkTheme ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">Hook: useMemo</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full">
          Expensive Calculation Cache
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Computation Multiplier (Modifies Memo Dependency):
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="5"
              max="50"
              value={targetNumber}
              onChange={(e) => setTargetNumber(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
            <span className="font-mono text-sm font-bold w-10 text-right">{targetNumber}</span>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${
          darkTheme ? 'bg-slate-800 border-slate-700' : 'bg-amber-50/60 border-amber-200'
        }`}>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
            Memoized Result:
          </div>
          <div className="text-2xl font-black text-amber-600">
            {primeResult.count.toLocaleString()} Primes Found
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Calculation Execution Time: <span className="font-mono font-bold text-amber-500">{primeResult.duration} ms</span>
          </div>
        </div>

        {/* Unrelated state inputs to demonstrate that typing does NOT trigger recalculation */}
        <div className="pt-2 border-t border-slate-200/40">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Test Re-render Responsiveness (Type freely):
          </label>
          <input
            type="text"
            value={keystrokes}
            onChange={(e) => setKeystrokes(e.target.value)}
            placeholder="Notice zero typing lag..."
            className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              darkTheme ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300'
            }`}
          />
        </div>

        <button
          onClick={() => setDarkTheme(!darkTheme)}
          className="w-full px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-medium text-xs rounded-lg transition-colors"
        >
          Toggle Theme (Forces Re-render without Recalculation)
        </button>
      </div>

      <div className="mt-4 p-3 bg-amber-50 dark:bg-slate-800/80 rounded-md border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300">
        💡 <strong>useMemo in Action:</strong> Typing in the test box re-renders this component on every keystroke, but the heavy prime calculation is SKIPPED thanks to <code className="font-mono">useMemo</code>!
      </div>
    </div>
  );
}
