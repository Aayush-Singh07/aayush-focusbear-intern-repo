import React from 'react';
import HelloWorld from '../components/HelloWorld';
import Counter from '../components/Counter';
import ListForm from '../components/ListForm';
import ReduxCounterDemo from '../components/ReduxCounterDemo';
import UseEffectDemo from '../components/UseEffectDemo';
import UseMemoDemo from '../components/UseMemoDemo';
import UseCallbackDemo from '../components/UseCallbackDemo';
import ApiDemo from '../components/ApiDemo';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md">
        <div className="max-w-3xl">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider">
            Focus Bear Onboarding Playground
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3 mb-2">
            React Fundamentals, Hooks & Axios Architecture
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            This interactive application showcases hands-on implementations for components & props, local state,
            list keys, global Redux Toolkit management, React hooks (<code className="font-mono bg-white/10 px-1 py-0.5 rounded">useEffect</code>, <code className="font-mono bg-white/10 px-1 py-0.5 rounded">useMemo</code>, <code className="font-mono bg-white/10 px-1 py-0.5 rounded">useCallback</code>), and enterprise Axios networking.
          </p>
        </div>
      </section>

      {/* Grid of Interactive Learning Demos */}
      <section className="space-y-4">
        <h2 className="text-xl font-black text-slate-800 tracking-tight">
          Module Demos & Live Previews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Issue #60 */}
          <HelloWorld name="Focus Bear Engineering Team" />

          {/* Issue #61 */}
          <Counter />

          {/* Issue #62 */}
          <ListForm />

          {/* Issue #63 & #64 */}
          <ReduxCounterDemo />

          {/* Issue #66 */}
          <UseEffectDemo />

          {/* Issue #67 */}
          <UseMemoDemo />

          {/* Issue #68 */}
          <UseCallbackDemo />

          {/* Issue #73 */}
          <ApiDemo />
        </div>
      </section>
    </div>
  );
}
