import React from 'react';
import ReactDOM from 'react-dom/client';
import CaboVirgenesHome from './CaboVirgenesHome.jsx';
import AboutCaboVirgenes from './AboutCaboVirgenes.jsx';

// Determine which page to render based on the current path. If the URL
// contains "quienes-somos" we load the About page; otherwise we show
// the home page. This approach keeps routing simple without
// introducing a full router dependency.
const currentPath = window.location.pathname.toLowerCase();
const isAboutPage = currentPath.includes('quienes-somos');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isAboutPage ? <AboutCaboVirgenes /> : <CaboVirgenesHome />}
  </React.StrictMode>
);
