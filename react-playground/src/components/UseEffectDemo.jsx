import React, { useState, useEffect } from 'react';

/**
 * UseEffectDemo Component (Issue #66)
 * 
 * Demonstrates:
 * 1. Mount & Unmount Lifecycle: Runs once when component mounts and returns a cleanup function on unmount.
 * 2. Cleanup Function: Cancels active intervals/listeners to prevent memory leaks.
 * 3. On-Demand Fetching: Triggering API requests safely without infinite render loops.
 * 4. Dependency Synchronization: Reacting only when specific dependencies change.
 */
export default function UseEffectDemo() {
  const [secondsActive, setSecondsActive] = useState(0);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logMessages, setLogMessages] = useState([]);

  const addLog = (msg) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogMessages((prev) => [`[${timestamp}] ${msg}`, ...prev.slice(0, 4)]);
  };

  // 1. Lifecycle Effect with Cleanup (Mount & Unmount)
  useEffect(() => {
    console.log('[UseEffectDemo] Mounted');
    addLog('Component MOUNTED: Initializing active seconds timer');

    // Set up a timer to track seconds active
    const interval = setInterval(() => {
      setSecondsActive((s) => s + 1);
    }, 1000);

    // CLEANUP FUNCTION: Crucial! Executes when component unmounts or before re-running effect
    return () => {
      console.log('[UseEffectDemo] Unmounted - Cleaning up timer');
      clearInterval(interval);
    };
  }, []); // Empty dependency array = runs only on mount/unmount

  // 2. Fetching Data Handler (Event-driven API call)
  const fetchSampleData = async () => {
    setLoading(true);
    addLog('Fetching sample advice from public API...');
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      const data = await res.json();
      setQuote(data.slip.advice);
      addLog('Advice fetched successfully!');
    } catch (err) {
      setQuote('Focus on what truly matters today.');
      addLog('Error fetching; fallback applied.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Hook: useEffect</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-violet-50 text-violet-700 rounded-full">
          Side Effects & Cleanup
        </span>
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-600">Active Timer (with cleanup):</span>
          <span className="font-mono text-sm font-bold text-violet-600 bg-violet-100 px-2.5 py-0.5 rounded">
            {secondsActive}s
          </span>
        </div>
      </div>

      <div className="mb-4">
        <button
          onClick={fetchSampleData}
          disabled={loading}
          className="w-full px-4 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm active:scale-95"
        >
          {loading ? 'Fetching...' : 'Fetch Dynamic Data'}
        </button>

        {quote && (
          <div className="mt-3 p-3 bg-violet-50 border border-violet-200 rounded-lg">
            <p className="text-xs font-semibold text-violet-800 uppercase tracking-wider mb-1">Advice Slip:</p>
            <p className="text-sm italic text-slate-700">"{quote}"</p>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Hook Execution Logs
        </h4>
        <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs text-emerald-400 space-y-1">
          {logMessages.map((log, i) => (
            <div key={i} className="truncate">{log}</div>
          ))}
        </div>
      </div>

      <div className="mt-4 p-3 bg-violet-50 rounded-md border border-violet-200 text-xs text-violet-900">
        💡 <strong>Cleanup Guard:</strong> The returned <code className="font-mono">clearInterval(interval)</code> guarantees no zombie timers run in the background after this component is removed.
      </div>
    </div>
  );
}
