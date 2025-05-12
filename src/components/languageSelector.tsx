import React, { useState } from "react";
import { Container, Dropdown, Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";


type _props = {
    language: string;
}


function LanguageSelector(){
    const {t, i18n} = useTranslation(); 
    const handleLanguageSelected = (localeCode: string) => {
        return(event: React.MouseEvent) => {
            i18n.changeLanguage(localeCode);
            event.preventDefault();
        };
    }

    return(
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" size="sm">
                    {t('Interactions.LanguageDropdownButton')}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLanguageSelected('tg_POJ')}>Pe̍h Ōe Jī</Dropdown.Item>
                    <Dropdown.Item onClick={handleLanguageSelected('tg_HL')}>漢羅 lām</Dropdown.Item>
                    <Dropdown.Item onClick={handleLanguageSelected('tg_HJ')}>漢字</Dropdown.Item>
                    <Dropdown.Item onClick={handleLanguageSelected('en')}>English</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Stack direction="horizontal" gap={5}>
            </Stack>
        </>
    )
}

export default LanguageSelector;