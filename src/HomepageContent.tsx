import React, { useState } from "react";
import './css/Homepage.css'
import { render } from "@testing-library/react"
import CustomTextarea from "./components/customTextarea";


function HomepageContent() {
    const [textAreaContent, setTextAreaContent] = useState("");
    const handleClearButtonClicked = () => {
        console.log('clearButton clicked.');
        setTextAreaContent("");
    }
    const handleTextareaChanged = (newContent : string) => {
        setTextAreaContent(newContent);
    }

    return(
        <div className="homepage-inputarea-container">
            <CustomTextarea rows={10} cols={20} value={textAreaContent} placeholder="Chhiáⁿ tī chia su ji̍p beh ài ê bûn jī." onChange={handleTextareaChanged}/>
            <div className="content-button-container">
                <button className="content-button" id="convertButton" >Choán ōaⁿ</button>
                <button className="content-button" id="clearButton" onClick={handleClearButtonClicked} >Chheng tû lōe iông</button>
                <button className="content-button" id="copyButton" >Kha pih khí lâi</button>
            </div>
        </div>
    )
}

export default HomepageContent;