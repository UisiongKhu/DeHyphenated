import React from 'react';
import LanguageSelector from './components/languageSelector';
import { useTranslation } from 'react-i18next';
import { Stack } from 'react-bootstrap';
import './css/Homepage.css';
import DeHyphenatedLogo from './media/DeHyphenated.jpg';


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
      <Stack direction='horizontal' className='bg-success mb-1 ps-1'>
        <img src={DeHyphenatedLogo} alt="DeHyphenated Logo" className='align-middle' style={{maxHeight: '50px', maxWidth: '50px'}} />
        <h1 className={`${titleClass} fs-1 text-white mt-3`} >{t('Title')}</h1> 
        <div className='ms-auto align-buttom'>
          <LanguageSelector />
        </div>
      </Stack>
    </div>
  );
}

export default HomepageHeader;
