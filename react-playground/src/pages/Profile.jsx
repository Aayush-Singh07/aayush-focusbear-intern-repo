import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

/**
 * Profile Page Component (Issue #65)
 * 
 * Demonstrates:
 * 1. Client-Side Routing: Instantly renders without full page reloads.
 * 2. `useNavigate` hook: Programmatic navigation to transition between views.
 * 3. `Link` component: Accessible declarative hyperlink navigation.
 */
export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
            AS
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Aayush Kumar Singh</h1>
            <p className="text-sm text-slate-500 font-medium">Software Engineering Intern • Focus Bear</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 space-y-4">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Active Milestone Focus
            </span>
            <p className="text-sm font-medium text-slate-700">
              React Fundamentals, State Management, Custom Hooks & Networking (Issues #59 - #73)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Environment</span>
              <p className="text-sm font-bold text-slate-800 mt-1">Vite + React + Tailwind CSS</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Global Store</span>
              <p className="text-sm font-bold text-indigo-600 mt-1">Redux Toolkit Enabled</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
          >
            ← Back to Home (useNavigate)
          </button>
          <Link
            to="/"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors inline-flex items-center justify-center"
          >
            Home (Declarative Link)
          </Link>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs text-amber-900 leading-relaxed">
        💡 <strong>Client-Side Routing Demo:</strong> Clicking the navigation links above alters the browser URL and swaps the DOM elements instantly without triggering a full page reload or downloading assets again from the web server!
      </div>
    </div>
  );
}
