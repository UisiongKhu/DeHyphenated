import React from 'react';
import './css/Homepage.css';
import LanguageSelector from './components/languageSelector';
import { useTranslation } from 'react-i18next';


function HomepageHeader() {
  const {t, i18n} = useTranslation()
  return (
    <div>
      <header className="homepage-header">
        <p className="homepage-title">{t('Title')}</p> 
        <LanguageSelector />
      </header>
    </div>
  );
}

export default HomepageHeader;
