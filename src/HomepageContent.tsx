'use client';
import React, { useEffect, useState } from "react";
import CustomTextarea from "./components/customTextarea";
import { useTranslation } from "react-i18next";
import DeHyphenated from "./tools/DeHyphenated";
import credentials from './credentials/credentials.json';
import { Button, Container, Row, Col, Stack, Form } from "react-bootstrap";



function HomepageContent(/*props : props*/) {
    const {t, i18n} = useTranslation();
    const [textAreaContent, setTextAreaContent] = useState("");
    const [sheet, setSheet] = useState({});
    const [divisionSheet, setDivisionSheet] = useState({});
    const [roadSheet, setRoadSheet] = useState({});
    const [mountainSheet, setMountainSheet] = useState({});
    const [riverSheet, setRiverSheet] = useState({});
    const [sheetsLoaded, setSheetsLoaded] = useState({main: false, division: false, road: false, mountain: false, river: false });
    const [divisionChecked, setDivisionChecked] = useState(false);
    const [roadChecked, setRoadChecked] = useState(false);
    const [mountainChecked, setMountainChecked] = useState(false);
    const [riverChecked, setRiverChecked] = useState(false);
    const getUrlBySheetName = (sheetName : string) => {
        return `https://sheets.googleapis.com/v4/spreadsheets/${credentials.spreadsheetID}/values/${sheetName}${'!A2:E3000'}?key=${credentials.apiKey}`;
    }
    var sheets = [] as Object[];
    const sheetNames = {
        main: 'Main List',
        division: 'Administration Division Name List (TK)',
        road: 'Road Name List (R)',
        //street: 'Street Name List(RK)',
        mountain: 'Mountain Name List (S)',
        riverAndWaterFacility: 'River, Dam Name List (CK, CL)',
        //tourismSpot: 'Tourism Spot Name List (KK)',
    }
    var fetchUrl = getUrlBySheetName(sheetNames.main);

    useEffect(()=>{ // Query the sheet after HomepageContent rendered.
        if(!sheetsLoaded.main){ // If main sheet not fetched, fetch it.
            var tObj = sheetsLoaded;
            tObj.main = false;
            setSheetsLoaded(tObj);
            fetch(fetchUrl).then((res)=>res.json()).then(setSheet).catch((err)=>{return;});
            tObj.main = true;
            setSheetsLoaded(tObj);
        }
        if(divisionChecked && !sheetsLoaded.division){ // If division sheet not fetched and the checkbox of devision sheet has been checked, fetch it.
            var tObj = sheetsLoaded;
            tObj.division = false;
            setSheetsLoaded(tObj);
            fetch(getUrlBySheetName(sheetNames.division)).then((res)=>res.json()).then(setDivisionSheet).catch((err)=>{return;});
            tObj.division = true;
            setSheetsLoaded(tObj);
        }
        if(roadChecked && !sheetsLoaded.road){ 
            var tObj = sheetsLoaded;
            tObj.road = false;
            setSheetsLoaded(tObj);
            fetch(getUrlBySheetName(sheetNames.road)).then((res)=>res.json()).then(setRoadSheet).catch((err)=>{return;});
            tObj.road = true;
            setSheetsLoaded(tObj);
        }
        if(mountainChecked && !sheetsLoaded.mountain){
            var tObj = sheetsLoaded;
            tObj.mountain = false;
            setSheetsLoaded(tObj);
            fetch(getUrlBySheetName(sheetNames.mountain)).then((res)=>res.json()).then(setMountainSheet).catch((err)=>{return;});
            tObj.mountain = true;
            setSheetsLoaded(tObj);
        }
        if(riverChecked && !sheetsLoaded.river){
            var tObj = sheetsLoaded;
            tObj.river = false;
            setSheetsLoaded(tObj);
            fetch(getUrlBySheetName(sheetNames.riverAndWaterFacility)).then((res)=>res.json()).then(setRiverSheet).catch((err)=>{return;});
            tObj.river = true;
            setSheetsLoaded(tObj);
        }
    },[divisionChecked, roadChecked, mountainChecked, riverChecked]);

    const handleConvertButtonClicked = () => {
        var _t : string = "";
        try{
            sheets = [];
            if(sheetsLoaded.main){
                sheets.push(sheet);
            }
            if(divisionChecked && sheetsLoaded.division){
                sheets.push(divisionSheet);
            }
            if(roadChecked && sheetsLoaded.road){
                sheets.push(roadSheet);
            }
            if(mountainChecked && sheetsLoaded.mountain){
                sheets.push(mountainSheet);
            }
            if(riverChecked && sheetsLoaded.river){
                sheets.push(riverSheet);
            }
            console.log(sheets.length);
            _t = DeHyphenated(textAreaContent, sheets,"tiam","langphang");
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
    const handleDivisionChecked = () => {
        setDivisionChecked(!divisionChecked);
    };
    const handleRoadChecked = () => {
        setRoadChecked(!roadChecked);
    };
    const handleMountainChecked = () => {
        setMountainChecked(!mountainChecked);
    };
    const handleRiverChecked = () => {
        setRiverChecked(!riverChecked);
    };

    return(
        <Container className="homepage-inputarea-container">
            <Row>
                <Col className="w-70 h-100 me-1">
                    <CustomTextarea value={textAreaContent} placeholder={t('Component.CustomTextAreaPlaceholder')} onChange={handleTextareaChanged} style={{
                        width: '100%',
                        height: '50vh',
                        resize: 'none',
                    }}/>
                </Col>
                <Col className="w-30 h-30">
                    <Stack direction="vertical" gap={2} className="vw-10">
                        <Form className="border border-success rounded rounded-3 mb-2" >
                            <Form.Check className="ms-1" disabled checked type='checkbox' id='divisionCheckbox' label={`${t('Component.ExtraSheetSelector.Main')} ${sheetsLoaded.main ? `(${t('Workflow.Loaded')})`:`(${t('Workflow.Loading')})`}`}/>
                            <Form.Check className="ms-1" checked={divisionChecked} onChange={handleDivisionChecked}  type='checkbox' id='divisionCheckbox' label={`${t('Component.ExtraSheetSelector.Division')} ${divisionChecked ? (sheetsLoaded.division ? `(${t('Workflow.Loaded')})`:`(${t('Workflow.Loading')})`):''}`}/>
                            <Form.Check className="ms-1" checked={mountainChecked} onChange={handleMountainChecked} type='checkbox' id='mountainCheckbox' label={`${t('Component.ExtraSheetSelector.Mountain')} ${mountainChecked ? (sheetsLoaded.mountain ? `(${t('Workflow.Loaded')})`:`(${t('Workflow.Loading')})`):''}`}/>
                            <Form.Check className="ms-1" checked={roadChecked} onChange={handleRoadChecked} type='checkbox' id='roadCheckbox' label={`${t('Component.ExtraSheetSelector.Road')} ${roadChecked ? (sheetsLoaded.road ? `(${t('Workflow.Loaded')})`:`(${t('Workflow.Loading')})`):''}`}/>
                            <Form.Check className="ms-1" checked={riverChecked} onChange={handleRiverChecked} type='checkbox' id='riverCheckbox' label={`${t('Component.ExtraSheetSelector.RiverAndWaterFacility')} ${riverChecked ? (sheetsLoaded.river ? `(${t('Workflow.Loaded')})`:`(${t('Workflow.Loading')})`):''}`}/>
                        </Form>
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