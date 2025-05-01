import { specialCharMap } from "@testing-library/user-event/dist/keyboard";
import i18next, { init } from "i18next";
import { useTranslation } from "react-i18next";
import credentials from '../credentials/credentials.json';

const t = i18next.getFixedT(null, null, '');
const rData= { data:'', processed: false, continue: false};
const isUppercase = (str: String) => {
    return str[0] === str.toUpperCase()[0];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const Dehyphenate = (data : Array<string>, word : string) => {
    if(data[3]!==''){
        word = data[3];
        console.log(`Has translation, word=${word}`);
        return {processed:true, continue: false, data:word};
    }else return {processed: false, continue: false, data:word};

}

const processWord = (list: Array< Array<string> > , word : string) => {
    var returnData = rData;
    for(var i = 0; i < list.length ; i++){
        console.log(`comparing word= ${word} to sheet.values[${i}][2]= ${list[i][2]}`)
        if(word === list[i][2]){
            console.log(`Processing word = ${word} with data = ${list[i][2]}.`)
            returnData = Dehyphenate(list[i], word)
            if(returnData.processed){
                return returnData;
            }
        }else if(list[i][2].includes(word)){
            console.log(`Data= ${list[i][2]} including word= ${word} `)
            returnData = {data: word, continue:true, processed: false};
            return returnData;
        } 
    }

    try {
        word = replaceSpaces(word, 'tiam', 'langphang') as string;
        var wordArray = word.split(' ');
        wordArray.forEach(syllable => {
            wordArray[wordArray.indexOf(syllable)] = syllable[0].toUpperCase()+syllable.slice(1,syllable.length);
        });
        word = wordArray.join(' ');
        console.log(`No translation, word= ${word}.`);
        returnData.data = word;
    } catch (e) {
        throw e;
    }
    return returnData;
}

function replaceProperNouns(originalText: string, sheet : any){
    var textArray : Array<String> = originalText.split(' ');
    var ProperWordsCompoundFlag= {'front':-1, 'end':-1};
    var tempStr : string = "";
    var processedText : String = '';
    var returnData = rData;
    //console.log(`In replaceProperNouns(), \n textArray: ${textArray}`)
    for(var i=0; i<textArray.length; i++){
        //console.log(`Dealing with textArray[${i}] = ${textArray[i]}`)
        //console.log(`front=${ProperWordsCompoundFlag.front}, end=${ProperWordsCompoundFlag.end}`)
        if(isUppercase(textArray[i])){ // Nā sī Tōa siá.
            if(ProperWordsCompoundFlag.front===-1){ // Khòaⁿ kam í keng ū tng teh phiau kì sû cho͘.
                ProperWordsCompoundFlag.front = i; // Nā bô tio̍h kā chit ê chò thâu.
                ProperWordsCompoundFlag.end = i;
            }else{
                ProperWordsCompoundFlag.end = i; // Nā ū tio̍h siat tēng chit ê chò bóe.
            }
        }
        //console.log(`front=${ProperWordsCompoundFlag.front}, end=${ProperWordsCompoundFlag.end}`)
        if (ProperWordsCompoundFlag.front !== -1 && ProperWordsCompoundFlag.end !== -1 && ProperWordsCompoundFlag.front <= ProperWordsCompoundFlag.end){ // Nā sī í keng tn̄g tio̍h sió siá seng chhú lí thâu chêng ê sû cho͘.
            tempStr = '';
            for(var j=ProperWordsCompoundFlag.front; j<=ProperWordsCompoundFlag.end; j++){ // Kā sû cho͘ ê sû tàu chò chi̍t ê string.
                if(j!==ProperWordsCompoundFlag.front && ProperWordsCompoundFlag.front !== ProperWordsCompoundFlag.end)
                    tempStr = tempStr.toString() + ' ';  // Thâu chi̍t ê mài thiⁿ làng phāng.
                tempStr = tempStr.toString()+textArray[j];
            }
            //console.log(`Processing tempStr from ${ProperWordsCompoundFlag.front} to ${ProperWordsCompoundFlag.end} = ${tempStr}`)
            returnData = processWord(sheet.values,tempStr);
            if(returnData.continue){
                continue;
            }
            ProperWordsCompoundFlag.front=-1;
            ProperWordsCompoundFlag.end=-1;
            if(i>0) processedText = processedText.toString() + ' ';
            processedText = processedText + returnData.data;
        }else{
            if(i>0) processedText = processedText.toString() + ' ';
            processedText = processedText.toString() + textArray[i];
        }
    }
    if (processedText.charAt(0)===' ') processedText = processedText.substring(1,processedText.length);
    return processedText;
}

const replaceSpaces = (originalText: string, natureToneMark?:string, ConvertMethod?: string) => {
    var _t = originalText;
    
    if(natureToneMark !== undefined || natureToneMark === "tiam"){
        _t = _t.replaceAll("--", " ‧");
    }else if(natureToneMark === "khoainn"){}
    else{
        return Error(t('Error.DeHyphened.NotALegalNatureToneMark'));
    }

    if(ConvertMethod !== undefined || ConvertMethod === "langphang"){
        _t = _t.replaceAll("-"," ");
    }else if(ConvertMethod === "kapji"){
        _t = _t.replaceAll("-","");
    }else{
        return Error(t('Error.DeHyphened.NotALegalConvertMethod'))
    }

    return _t;
}

function DeHyphenated(text:string, sheet: Object, natureToneMark?:string, ConvertMethod?:string){
    var convertedText: any;
    try{
        convertedText = replaceProperNouns(text, sheet);
        convertedText = replaceSpaces(convertedText, natureToneMark, ConvertMethod);
    }catch(e){
        if(e instanceof Error){
            return e;
        }
    }
    return convertedText;
}

export default DeHyphenated;