import React from "react";


type _props = {
    language: string;
}


function LanguageSelector(){
    return(
        <div className="language-selector-container">
            <p className="language-option">Pe̍h Ōe Jī</p>
            <p className="language-option">漢羅 lām</p>
            <p className="language-option">漢字</p>
            <p className="language-option">English</p>
        </div>
    )
}

export default LanguageSelector;