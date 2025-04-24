import i18next from "i18next";
import { useTranslation } from "react-i18next";

const t = i18next.getFixedT(null, null, '');

const replaceSpaces = (originalText: string, khinsiannhu?:string, choanoannhongsek?: string) => {
    var _t : string = originalText;

    if(khinsiannhu !== undefined || khinsiannhu === "tiam"){
        _t = _t.replaceAll("--", " ‧" );
    }else if(khinsiannhu === "khoainn"){}
    else{
        return Error(t('Error.DeHyphened.NotALegalKhinsiannhu'));
    }

    if(choanoannhongsek !== undefined || choanoannhongsek === "langphang"){
        _t = _t.replaceAll("-"," ");
    }else if(choanoannhongsek === "kapji"){
        _t = _t.replaceAll("-","");
    }else{
        return Error(t('Error.DeHyphened.NotALegalConvertMethod'))
    }

    return _t;
}

function DeHyphened(text:string, khinsiannhu?:string, choanoannhongsek?:string){
    var convertedText: any;
    try{
        convertedText = replaceSpaces(text, khinsiannhu, choanoannhongsek);
    }catch(e){
        if(e instanceof Error){
            return e;
        }
    }
    return convertedText;
}

export default DeHyphened;