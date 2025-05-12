import i18next, { init } from "i18next";

const t = i18next.getFixedT(null, null, '');
const rData= { data:'', processed: false, continue: false, uppercaseMethod: '', hyphened: false};
const quatationMarkArray = [
    ',','.','!','?','@','#','$','%','^','&','*','(',')','\'','"',
    '/','\\','<','>','_','~','`',':',';'
];

class Prefix extends Object{
    marks : string;
    lastIndex: number;
    constructor(){
        super();
        this.marks = "";
        this.lastIndex = -1;
    }
}
class Postfix extends Object{
    marks : string;
    firstIndex: number;
    constructor(){
        super();
        this.marks = "";
        this.firstIndex = -1;
    }
}

const isUppercase = (str: String) => {
    return str[0] === str.toUpperCase()[0];
}

const splitMarks = (word: string) => {
    var prefix = new Prefix();
    var postfix = new Postfix();
    postfix.firstIndex = word.length;
    var flag = false;
    for(var i=0; i <= word.length; i++){
        if(!flag && quatationMarkArray.includes(word.charAt(i))){
            prefix.marks = prefix.marks + word.charAt(i);
            prefix.lastIndex = i;
        }
        if(!(quatationMarkArray.includes(word.charAt(i)))){
            flag = true;
        }
        if(flag && quatationMarkArray.includes(word.charAt(i))){
            postfix.marks = postfix.marks + word.charAt(i);
            if(postfix.firstIndex === word.length) postfix.firstIndex = i;
        }
    }
    return {prefix: prefix, postfix: postfix};
};

const Dehyphenate = (data: Array<string>, word: string) => {
    if (data[2] !== '') {
        word = data[2];
        console.log(`Has translation, word=${word}`);
        return { processed: true, continue: false, data: word, uppercaseMethod: 'A', hyphened: (data[2].includes('-')) };
    }else{
        if(data[3]==='B') return { processed: false, continue: false, data: word, uppercaseMethod: 'B', hyphened: false };
        else if (data[3]==='C') return { processed: false, continue: false, data: word, uppercaseMethod: 'C', hyphened: false};
        else if (data[3]==='D') return { processed: false, continue: false, data: word, uppercaseMethod: 'D', hyphened: false};
        else throw Error('Data Error: No Default Uppercase Method.');
    };
}

const processWord = (list: Array<Array<string>>, word: string) => {
    console.log(`In processWord(), word=${word}`);
    var returnData = rData;
    var obj = { prefix: new Prefix(), postfix: new Postfix() };
    var originalWord = word;
    obj = splitMarks(word);
    word = word.substring((obj.prefix.lastIndex===-1)? 0 :obj.prefix.lastIndex+1, obj.postfix.firstIndex);
    console.log(`Processing the word=${word}`);
    for (var i = 0; i < list.length; i++) {
        if(word===''){
            break;
        }
        console.log(`comparing word= ${word} to sheet.values[${i}][1]= ${list[i][1]}`);
        if (word === list[i][1]) {
            console.log(`Processing word = ${word} with data = ${list[i][1]}.`);
            returnData = Dehyphenate(list[i], word);
            if (returnData.processed) {
                returnData.data = obj.prefix.marks + returnData.data + obj.postfix.marks;
                return returnData;
            }
            if(returnData.uppercaseMethod === 'B' || returnData.uppercaseMethod === 'C' || returnData.uppercaseMethod === 'D'){
                break;
            }
        } else if (list[i][1].includes(word) && isUppercase(word)) {
            console.log(`Data= ${list[i][1]} including word= ${word} `);
            returnData = { data: word, continue: true, processed: false, uppercaseMethod: '', hyphened: false};
            returnData.data = originalWord;
            return returnData;
        }
    }

    if(returnData.uppercaseMethod === 'B' || returnData.uppercaseMethod === 'C' || returnData.uppercaseMethod === 'D' || returnData.uppercaseMethod === ''){
        try {
            originalWord = replaceSpaces(originalWord, 'tiam', 'langphang', false) as string;
            if(returnData.uppercaseMethod === 'B' || returnData.uppercaseMethod === 'D'){
                var wordArray = originalWord.split(' ');
                wordArray.forEach(syllable => {
                    wordArray[wordArray.indexOf(syllable)] = syllable[0].toUpperCase() + syllable.slice(1, syllable.length);
                });
                if(returnData.uppercaseMethod === 'D') wordArray[wordArray.length-1] = wordArray[wordArray.length-1].toLowerCase();
                console.log(`originalWord=${originalWord} wordArray=${wordArray}`);
                originalWord = wordArray.join(' ');
            }
            
            console.log(`No translation, UppercaseMethod= ${returnData.uppercaseMethod} word= ${originalWord}.`);
            returnData.data = originalWord;
        } catch (e) {
            throw e;
        }
    
    }
    
    return returnData;
}

const replaceProperNouns = (originalText: string, sheet : any) => {
    var textArray : Array<String> = originalText.split(' ');
    var ProperWordsCompoundFlag= {'front':-1, 'end':-1};
    var tempStr : string = "";
    var processedText : String = '';
    var returnData = rData;
    console.log(`In replaceProperNouns(), \n textArray: ${textArray}`)
    for(var i=0; i<textArray.length; i++){
        if(textArray[i]==='') continue;
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
    console.log(processedText);
    if (processedText.charAt(0)===' ') processedText = processedText.substring(1,processedText.length);
    return processedText;
}

const replaceAllExceptUppercase = (str : string, target: string, content: string) => {
    var strArray = str.split(" ");
    var processedStr = "";
    var obj = {prefix: new Prefix(), postfix: new Postfix()};
    var tStr : string = "";
    for(var i=0;i<strArray.length;i++){
        if(i>0) processedStr = processedStr + ' ';
        obj = splitMarks(strArray[i]);
        tStr = strArray[i].substring((obj.prefix.lastIndex===-1)? 0 :obj.prefix.lastIndex+1, obj.postfix.firstIndex);
        if(!isUppercase(tStr)){
            processedStr = processedStr + strArray[i].replaceAll(target, content);
        }else{
            processedStr = processedStr + strArray[i];
        }
    }
    return processedStr;
}

const replaceSpaces = (originalText: string, natureToneMark?:string, convertMethod?: string, exceptUppercase?: boolean) => {
    if(exceptUppercase === undefined){
        exceptUppercase = false;
    }
    var _t = originalText;
    
    if(natureToneMark !== undefined || natureToneMark === "tiam"){
        _t = _t.replaceAll("--", " ‧");
    }else if(natureToneMark === "khoainn"){}
    else{
        return Error(t('Error.DeHyphened.NotALegalNatureToneMark'));
    }

    if(convertMethod !== undefined || convertMethod === "langphang"){
        if(exceptUppercase){
            _t = replaceAllExceptUppercase(_t, "-", " ");
        }else{
            _t = _t.replaceAll('-',' ');
        }
    }else if(convertMethod === "kapji"){
        if(exceptUppercase){
            _t = replaceAllExceptUppercase(_t, "-", "");
        }else{
            _t = _t.replaceAll('-','');
        }

    }else{
        return Error(t('Error.DeHyphened.NotALegalConvertMethod'))
    }

    return _t;
}

const DeHyphenated = (text:string, sheet: Object, natureToneMark?:string, convertMethod?:string) => {
    var convertedText: any;
    try{
        convertedText = replaceProperNouns(text, sheet);
        convertedText = replaceSpaces(convertedText, natureToneMark, convertMethod, true);
    }catch(e){
        if(e instanceof Error){
            return e;
        }
    }
    return convertedText;
}

export default DeHyphenated;