import React from 'react';
import './css/Homepage.css';
import LanguageSelector from './components/languageSelector';

function HomepageHeader() {
  return (
    <div>
      <header className="homepage-header">
        <p className="homepage-title">DeHyphened - Kā liân oe̍h tàn hiat ka̍k.</p> 
        <LanguageSelector />
      </header>
    </div>
  );
}

export default HomepageHeader;
