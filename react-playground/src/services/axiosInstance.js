import axios from 'axios';

/**
 * Centralized Axios Instance (Issue #73)
 * 
 * Configured with:
 * 1. Base URL for all endpoints
 * 2. Standardized default headers (Accept: wildcard, Content-Type)
 * 3. Dynamic Request ID generation on each outgoing request
 * 4. Request timeout to avoid hanging requests (8000ms)
 * 5. Request Interceptor: Injects Bearer auth token from localStorage
 * 6. Response Interceptor: Centralized error handling and logging
 */
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Generate dynamic unique request ID for tracing/observability
    const requestId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    config.headers['X-Request-ID'] = requestId;

    // Retrieve authentication token from localStorage
    const authToken = localStorage.getItem('focusbear_auth_token');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    console.log(`[HTTP Request] ${config.method?.toUpperCase()} ${config.url} | ID: ${requestId}`);
    return config;
  },
  (error) => {
    console.error('[HTTP Request Error]:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[HTTP Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.warn('[HTTP Cancelled]: Request was explicitly aborted by client controller.');
    } else if (error.code === 'ECONNABORTED') {
      console.error('[HTTP Timeout]: Server took longer than 8000ms to respond.');
    } else if (error.response) {
      console.error(`[HTTP Error ${error.response.status}]:`, error.response.data);
      if (error.response.status === 401) {
        console.warn('[Auth Expired]: User needs to re-authenticate.');
      }
    } else {
      console.error('[Network Error]: Server is unreachable or offline.');
    }
    return Promise.reject(error);
  }
);

export default api;
