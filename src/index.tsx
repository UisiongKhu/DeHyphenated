import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import HomepageHeader from './HomepageHeader';
import HomepageContent from './HomepageContent';
import HomepageFooter from './HomepageFooter';
import './locale/i18n';
import credentials from './credentials/credentials.json';
import { getProperNounsSheet } from './tools/DeHyphenated';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HomepageHeader />
    <HomepageContent />
    <HomepageFooter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
