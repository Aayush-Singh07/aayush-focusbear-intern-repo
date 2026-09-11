import React from 'react';
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';

export default function App() {
  const activeClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70">
      {/* Global Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-2xl">🐻</span>
            <div>
              <span className="font-black text-slate-800 text-lg tracking-tight">Focus Bear</span>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider ml-2 bg-indigo-50 px-2 py-0.5 rounded-full">
                React Lab
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/" className={activeClass} end>
              Home Demos
            </NavLink>
            <NavLink to="/profile" className={activeClass}>
              Profile Page
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-800">404 - Page Not Found</h2>
                <Link to="/" className="mt-4 inline-block text-indigo-600 font-semibold underline">
                  Return to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Focus Bear Internship • React Fundamentals, Hooks & Axios Architecture Playground
        </div>
      </footer>
    </div>
  );
}
