import React, { useState } from 'react';

/**
 * ListForm Component (Issue #62)
 * 
 * Demonstrates:
 * 1. Handling User Input: Controlled input component with `value` and `onChange`.
 * 2. Immutable Array Updates: Using spread operator `[...items, newItem]` instead of `items.push()`.
 * 3. Dynamic Rendering with `.map()`: Generating JSX dynamically from an array.
 * 4. Importance of Keys: Using unique stable IDs (`item.id`) instead of array index (`index`)
 *    to prevent reconciliation and input-state mixing bugs during deletion.
 */
export default function ListForm() {
  const [items, setItems] = useState([
    { id: '1', text: 'Learn React Props & Components' },
    { id: '2', text: 'Master useState & Immutability' },
    { id: '3', text: 'Build Focus Bear Habits Tracker' },
  ]);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputText.trim()) {
      setError('Please enter a valid habit or task.');
      return;
    }

    const newItem = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      text: inputText.trim(),
    };

    // Immutable update: create a new array with the new item appended
    setItems((prevItems) => [...prevItems, newItem]);
    setInputText('');
    setError('');
  };

  const handleRemoveItem = (idToRemove) => {
    // Immutable removal using filter
    setItems((prevItems) => prevItems.filter((item) => item.id !== idToRemove));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Lists & Forms</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">
          Lists & Keys
        </span>
      </div>

      <form onSubmit={handleAddItem} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              if (error) setError('');
            }}
            placeholder="Add new habit / task..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
          >
            Add
          </button>
        </div>
        {error && <p className="text-xs text-rose-500 mt-1.5">{error}</p>}
      </form>

      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Task List ({items.length})
        </h4>
        {items.length === 0 ? (
          <p className="text-sm text-slate-400 italic py-4 text-center">No tasks added yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="py-2.5 flex items-center justify-between group hover:bg-slate-50 px-2 rounded-md transition-colors"
              >
                <span className="text-sm text-slate-700">{item.text}</span>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove Item"
                  className="text-slate-400 hover:text-rose-600 text-xs px-2 py-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                >
                  ✕ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 p-3 bg-emerald-50 rounded-md border border-emerald-200 text-xs text-emerald-900">
        💡 <strong>Key Prop Best Practice:</strong> Each item uses <code className="font-mono">key={`{item.id}`}</code> instead of array indices. This ensures React tracks the identity of each item even when items are deleted or rearranged.
      </div>
    </div>
  );
}
