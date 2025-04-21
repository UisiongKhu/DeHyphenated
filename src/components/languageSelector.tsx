import React, { useState } from "react";
import { useTranslation } from "react-i18next";


type _props = {
    language: string;
}


function LanguageSelector(){
    const {i18n} = useTranslation(); 
    const handleLanguageSelected = (localeCode: string) => {
        return(event: React.MouseEvent) => {
            i18n.changeLanguage(localeCode);
            event.preventDefault();
        };
    }

    return(
        <div className="language-selector-container">
            <p className="language-option" onClick={handleLanguageSelected('tg_POJ')}>Pe̍h Ōe Jī</p>
            <p className="language-option" onClick={handleLanguageSelected('tg_HL')}>漢羅 lām</p>
            <p className="language-option" onClick={handleLanguageSelected('tg_HJ')}>漢字</p>
            <p className="language-option" onClick={handleLanguageSelected('en')}>English</p>
        </div>
    )
}

export default LanguageSelector;