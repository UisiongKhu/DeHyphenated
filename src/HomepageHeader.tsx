import React from 'react';
import LanguageSelector from './components/languageSelector';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';


function HomepageHeader() {
  const {t, i18n} = useTranslation()
  return (
    <div>
      <Stack direction='horizontal' className='bg-success py-3 ps-1'>
        <h1 className="homepage-title fs-1 text-white">{t('Title')}</h1> 
        <div className='ms-auto align-buttom'>
          <LanguageSelector />
        </div>
      </Stack>
    </div>
  );
}

export default HomepageHeader;
