import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  resetCounter,
  selectCounterValue,
  selectCounterHistory,
  selectCounterStatus,
} from '../redux/counterSlice';

/**
 * ReduxCounterDemo Component (Issue #63 & #64)
 * 
 * Demonstrates:
 * 1. `useSelector`: Reading data from the Redux store via reusable selector functions.
 * 2. `useDispatch`: Dispatching Redux actions (`increment`, `decrement`, `incrementByAmount`).
 * 3. Selector Derivations: Dynamically computing status badges based on state without polluting reducers.
 */
export default function ReduxCounterDemo() {
  const dispatch = useDispatch();
  const count = useSelector(selectCounterValue);
  const history = useSelector(selectCounterHistory);
  const status = useSelector(selectCounterStatus);
  const [step, setStep] = useState(5);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Global State: Redux Toolkit</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
          RTK & Selectors
        </span>
      </div>

      <div className="text-center py-5 bg-purple-50/50 rounded-lg border border-purple-100 mb-4">
        <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
          Store Count (Global)
        </span>
        <div className="text-4xl font-black text-purple-700 mt-1">
          {count}
        </div>
        <div className="mt-2">
          <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${status.badge}`}>
            {status.message}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        <button
          onClick={() => dispatch(decrement())}
          className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors active:scale-95"
        >
          -1
        </button>
        <button
          onClick={() => dispatch(resetCounter())}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 text-sm font-medium rounded-lg transition-colors active:scale-95"
        >
          Reset
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
        >
          +1
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => dispatch(incrementByAmount(Number(step)))}
          className="flex-1 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold rounded-lg transition-colors"
        >
          +{step} Custom Step
        </button>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(e.target.value)}
          className="w-16 px-2 py-1.5 border border-slate-300 rounded-lg text-xs font-mono text-center"
        />
      </div>

      {history.length > 0 && (
        <div className="border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            Action History (Last 3)
          </span>
          <div className="space-y-1 text-xs text-slate-600 font-mono">
            {history.slice(-3).map((item, idx) => (
              <div key={idx} className="bg-slate-50 px-2 py-1 rounded">
                • {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-purple-50 rounded-md border border-purple-200 text-xs text-purple-900">
        💡 <strong>Selectors in Action:</strong> The status badge above is computed purely by <code className="font-mono">selectCounterStatus</code>, decoupling the presentation from the raw store schema!
      </div>
    </div>
  );
}
