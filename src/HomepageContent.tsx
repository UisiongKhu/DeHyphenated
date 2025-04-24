import React, { useState } from "react";
import './css/Homepage.css'
import { render } from "@testing-library/react"
import CustomTextarea from "./components/customTextarea";
import { useTranslation } from "react-i18next";
import DeHyphened from "./tools/DeHyphened";


function HomepageContent() {
    const {t, i18n} = useTranslation();
    const [textAreaContent, setTextAreaContent] = useState("");
    const handleConvertButtonClicked = () => {
        var _t : string = "";
        try{
            _t = DeHyphened(textAreaContent,"tiam","langphang");
        }catch(e){
            if(e instanceof Error){
                alert(e.message);
                return;
            }
        }
        setTextAreaContent(_t);
    }
    const handleClearButtonClicked = () => {
        console.log('clearButton clicked.');
        setTextAreaContent("");
    }
    const handleTextareaChanged = (newContent : string) => {
        setTextAreaContent(newContent);
    }

    return(
        <div className="homepage-inputarea-container">
            <CustomTextarea rows={10} cols={20} value={textAreaContent} placeholder={t('Component.CustomTextAreaPlaceholder')} onChange={handleTextareaChanged}/>
            <div className="content-button-container">
                <button className="content-button" id="convertButton" onClick={handleConvertButtonClicked} >{t('Interactions.ConvertButton')}</button>
                <button className="content-button" id="clearButton" onClick={handleClearButtonClicked} >{t('Interactions.ClearButton')}</button>
                <button className="content-button" id="copyButton" >{t('Interactions.CopyButton')}</button>
            </div>
        </div>
    )
}

export default HomepageContent;