import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const originalFetch = window.fetch;
window.fetch = (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const basePath = (window as any).__STUDIO_CONFIG__?.basePath || '';

  let url: string;
  if (typeof input === 'string') {
    url = input;
  } else if (input instanceof URL) {
    url = input.toString();
  } else if (input instanceof Request) {
    url = input.url;
  } else {
    url = '';
  }

  // For self-hosted studio (basePath is set), rewrite API URLs:
  // /api/stats → /api/studio/stats (strip /api prefix, add basePath)
  // For CLI studio (basePath is empty), keep URLs unchanged
  if (url.startsWith('/api/') && basePath && !url.startsWith(basePath)) {
    // Strip '/api' prefix and prepend basePath
    // /api/stats → /stats → /api/studio/stats
    url = basePath + url.slice(4);

    if (typeof input === 'string') {
      input = url;
    } else if (input instanceof URL) {
      input = new URL(url, window.location.origin);
    } else if (input instanceof Request) {
      input = new Request(url, input);
    }
  }

  return originalFetch.call(window, input, init);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
