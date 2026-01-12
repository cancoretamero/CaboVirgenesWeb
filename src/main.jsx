import React from 'react';
import ReactDOM from 'react-dom/client';
import CaboVirgenesHome from './CaboVirgenesHome.jsx';

// Entrypoint for the application. It mounts the primary page component
// into the DOM element with id="root" defined in index.html.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CaboVirgenesHome />
  </React.StrictMode>
);
