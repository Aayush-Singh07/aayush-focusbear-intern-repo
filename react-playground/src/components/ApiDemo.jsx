import React, { useState, useRef } from 'react';
import api from '../services/axiosInstance';
import axios from 'axios';

/**
 * ApiDemo Component (Issue #73)
 * 
 * Demonstrates:
 * 1. Making GET and POST requests using the configured Axios instance.
 * 2. Dynamic token injection via Request Interceptor.
 * 3. Request cancellation using AbortController (`controller.abort()`).
 * 4. Error and timeout handling.
 * 5. Handling response and simulating redirect/navigation on success.
 */
export default function ApiDemo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postStatus, setPostStatus] = useState(null);
  const [hasAuthToken, setHasAuthToken] = useState(
    Boolean(localStorage.getItem('focusbear_auth_token'))
  );
  const [redirectNotice, setRedirectNotice] = useState(null);

  // Reference to hold active AbortController
  const abortControllerRef = useRef(null);

  // Toggle Auth Token in localStorage
  const toggleAuthToken = () => {
    if (hasAuthToken) {
      localStorage.removeItem('focusbear_auth_token');
      setHasAuthToken(false);
    } else {
      localStorage.setItem('focusbear_auth_token', 'mock-focusbear-jwt-token-12345');
      setHasAuthToken(true);
    }
  };

  // GET Request with Cancellation Support
  const fetchPosts = async () => {
    // If a previous request is active, cancel it before firing a new one
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setRedirectNotice(null);

    try {
      const response = await api.get('/posts?_limit=3', {
        signal: controller.signal,
      });
      setPosts(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Fetch request was safely aborted.');
      } else {
        console.error('Fetch failed:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // POST Request with Parameters (Issue #73 requirement)
  const createSamplePost = async () => {
    setLoading(true);
    setPostStatus(null);
    setRedirectNotice(null);

    const payload = {
      title: 'Morning Habit Routine',
      body: 'Drink 500ml water, 5 minute stretching, review daily milestones.',
      userId: 1,
    };

    try {
      // POST request to /posts with parameters
      const response = await api.post('/posts', payload);
      setPostStatus({
        status: 'success',
        data: response.data,
      });

      // Handle response and simulate redirect if necessary
      if (response.status === 201) {
        setRedirectNotice('Post created successfully! Simulated redirect to /profile...');
        setTimeout(() => {
          setRedirectNotice('Redirect completed (stayed on page for demo).');
        }, 2000);
      }
    } catch (err) {
      setPostStatus({
        status: 'error',
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">Networking: Axios Instance</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-700 rounded-full">
          Axios & Interceptors
        </span>
      </div>

      {/* Auth Token Interceptor Demo */}
      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 mb-4 flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-600 block">Interceptor Auth Token:</span>
          <span className="text-xs font-mono font-bold text-teal-600">
            {hasAuthToken ? 'Bearer mock-focusbear-jwt-token-12345' : 'None (Unauthenticated)'}
          </span>
        </div>
        <button
          onClick={toggleAuthToken}
          className="px-2.5 py-1 text-xs font-medium bg-white border border-slate-300 hover:bg-slate-100 rounded text-slate-700 transition-colors"
        >
          {hasAuthToken ? 'Remove Token' : 'Attach Token'}
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={fetchPosts}
          disabled={loading}
          className="flex-1 px-3 py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
        >
          {loading ? 'Requesting...' : 'GET 3 Posts'}
        </button>
        <button
          onClick={createSamplePost}
          disabled={loading}
          className="flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors active:scale-95"
        >
          POST Sample Post
        </button>
      </div>

      {redirectNotice && (
        <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 font-medium">
          {redirectNotice}
        </div>
      )}

      {postStatus && postStatus.status === 'success' && (
        <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs">
          <span className="font-bold text-teal-800 block mb-1">Server Response (201 Created):</span>
          <pre className="text-slate-700 font-mono text-[11px] overflow-x-auto">
            {JSON.stringify(postStatus.data, null, 2)}
          </pre>
        </div>
      )}

      {posts.length > 0 && (
        <div className="space-y-2 border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            GET Response Data
          </span>
          <div className="space-y-2">
            {posts.map((post) => (
              <div key={post.id} className="p-2.5 bg-slate-50 rounded border border-slate-100 text-xs">
                <span className="font-semibold text-slate-800 line-clamp-1">
                  #{post.id}: {post.title}
                </span>
                <p className="text-slate-500 line-clamp-2 mt-0.5">{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-teal-50 rounded-md border border-teal-200 text-xs text-teal-900">
        💡 <strong>Enterprise Best Practice:</strong> Check DevTools Network tab: every request automatically includes <code className="font-mono">X-Request-ID</code> and the <code className="font-mono">Authorization</code> header if set!
      </div>
    </div>
  );
}
