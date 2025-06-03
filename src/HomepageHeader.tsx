import React, { useState } from 'react';
import LanguageSelector from './components/languageSelector';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import './css/Homepage.css';


function HomepageHeader() {
  const {t, i18n} = useTranslation()
  var titleClass = '';
  if(i18n.language==='tg_POJ' || i18n.language==='en'){
    titleClass = 'homepage-title-latin';
  }else if(i18n.language==='tg_HL' || i18n.language === 'tg_HJ'){
    titleClass = 'homepage-title-hanji';
  }
  return (
    <div>
      <Stack direction='horizontal' className='bg-success py-3 ps-1'>
        <h1 className={`${titleClass} fs-1 text-white`} >{t('Title')}</h1> 
        <div className='ms-auto align-buttom'>
          <LanguageSelector />
        </div>
      </Stack>
    </div>
  );
}

export default HomepageHeader;
