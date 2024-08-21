import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ResizeObserver from 'resize-observer-polyfill';

// نصب ResizeObserver Polyfill در صورت عدم وجود
if (typeof window !== "undefined" && !window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { install } from "resize-observer";

// if (typeof window !== "undefined") {
//     install();
// }
// /////////////////////////////
// Could not load content for chrome-extension://fmkadmapgofadopljbjfkapdkoienihi/react-devtools-shared/src/backend/console.js (System error: net::ERR_FILE_NOT_FOUND)
// /////////////////////////////
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);