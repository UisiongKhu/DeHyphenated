'use client';
import React, { useEffect, useState } from "react";
import CustomTextarea from "./components/customTextarea";
import { useTranslation } from "react-i18next";
import DeHyphenated from "./tools/DeHyphenated";
import credentials from './credentials/credentials.json';
import { Button, Container, Row, Col, Stack } from "react-bootstrap";



function HomepageContent(/*props : props*/) {
    const {t, i18n} = useTranslation();
    const [textAreaContent, setTextAreaContent] = useState("");
    const [sheet, setSheet] = useState({});
    var fetchUrl = `https://sheets.googleapis.com/v4/spreadsheets/${credentials.spreadsheetID}/values/${'A2:E100'}?key=${credentials.apiKey}`;

    useEffect(()=>{ // Query the sheet after HomepageContent rendered.
        fetch(fetchUrl).then((res)=>res.json()).then(setSheet);
    },[]);

    const handleConvertButtonClicked = () => {
        var _t : string = "";
        try{
            _t = DeHyphenated(textAreaContent, sheet,"tiam","langphang");
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
    async function handleCopyButtonClicked(){
        if(navigator.clipboard){ // Deploy kàu HTTPS chiah thang ēng Clipboard API
            await navigator.clipboard.writeText(textAreaContent);
        }else{ // Bô tio̍h ēng lāu hong hoat
            let _textArea = document.createElement('textarea');
            _textArea.value = textAreaContent;
            _textArea.style.position = 'absolute';
            _textArea.style.opacity = '0';
            _textArea.style.left = '-99999999px';
            _textArea.style.top = '-99999999px';
            document.body.appendChild(_textArea);
            _textArea.focus();
            _textArea.select();
            document.execCommand('copy');
            _textArea.remove();
        }
    }
    const handleTextareaChanged = (newContent : string) => {
        setTextAreaContent(newContent);
    }

    return(
        <Container className="homepage-inputarea-container">
            <Row>
                <Col className="w-70 h-100 me-1">
                    <CustomTextarea value={textAreaContent} placeholder={t('Component.CustomTextAreaPlaceholder')} onChange={handleTextareaChanged} style={{
                        width: '100%',
                        height: '30vh',
                        resize: 'none',
                    }}/>
                </Col>
                <Col className="w-30 h-30">
                    <Stack direction="vertical" gap={2} className="vw-10">
                        <Button variant="success" /*className="content-button"*/ id="convertButton" onClick={handleConvertButtonClicked} >{t('Interactions.ConvertButton')}</Button>
                        <Button variant="outline-danger" /*className="content-button"*/ id="clearButton" onClick={handleClearButtonClicked} >{t('Interactions.ClearButton')}</Button>
                        <Button variant="outline-success" /*className="content-button"*/ id="copyButton" onClick={handleCopyButtonClicked}>{t('Interactions.CopyButton')}</Button>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default HomepageContent;