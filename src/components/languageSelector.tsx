import React from "react";


type _props = {
    language: string;
}


function LanguageSelector(){
    return(
        <div className="language-selector-container">
            <p className="languageOption">Pe̍h Ōe Jī</p>
            <p className="languageOption">漢羅 lām</p>
            <p className="languageOption">漢字</p>
            <p className="languageOption">English</p>
        </div>
    )
}

export default LanguageSelector;