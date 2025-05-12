import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import HomepageHeader from './HomepageHeader';
import HomepageContent from './HomepageContent';
import HomepageFooter from './HomepageFooter';
import './locale/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Stack, Col } from 'react-bootstrap';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <div className='d-flex flex-column vh-100'>
      <div className='flex-fill flex-grow-1 mb-auto vh-90'>
        <HomepageHeader />
        <div className='pt-5'>
          <HomepageContent />
        </div>
      </div>
      <div className='mt-auto vh-10'>
        <HomepageFooter />
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
