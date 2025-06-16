import '../css/Homepage.css'
import Notice from "./notice";
import { useTranslation } from "react-i18next";
import { Accordion } from "react-bootstrap";

type _props = {
    notices: Array<Array<string>>;
}

const getIndexes = (arr:Array<Array<string>>) => {
    var tArr = [];
    for(var i=0;i<arr.length;i++){
        tArr.push(i.toString());
    }
    return tArr;
}

function NoticeBoard(props : _props){
    const {t, i18n} = useTranslation();
    /*const noticeComponents = props.notices.map((notice)=>(
        <Notice title={notice.at(0)!} content={notice.at(1)!} datetime={notice.at(2)!} />
    ))
    return(
            <>
                <div className="border border-success border-2 rounded rounded-3">
                    <h1 className="ms-1 mt-1 justify-content-centers">{t('Component.NoticeBoard.Title')}</h1>
                    <hr/>
                    {
                        (props.notices.length===0)?
                            <p>{t('Component.NoticeBoard.NoNotice')}</p>
                        :
                            noticeComponents
                    }
                </div>
            </>
    )*/
   const noticeComponents = props.notices.map((notice)=>(
        <Accordion.Item eventKey={props.notices.indexOf(notice).toString()}>
            <Accordion.Header className="notice-board-header">{notice.at(0)}</Accordion.Header>
            <Accordion.Body>{notice.at(2)}<br/><hr/>{notice.at(1)}</Accordion.Body>
        </Accordion.Item>
   ))
   return(
    <>
        <div>
            <div className="border border-success border-2 rounded-top bg-success">
                <h1 className="ms-1 mt-1 text-center homepage-title-hanji text-white">{t('Component.NoticeBoard.Title')}</h1>
            </div>
            <div className="border border-success border-2 rounded-bottom bg-white">
                <Accordion className={'open'} title={t('Component.NoticeBoard.Title')} defaultActiveKey={getIndexes(props.notices)}>
                    {
                        (props.notices.length===0)?
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className="notice-board-header">{t('Component.NoticeBoard.NoNotice')}</Accordion.Header>
                                <Accordion.Body></Accordion.Body>
                            </Accordion.Item>
                        :
                            noticeComponents
                    }
                </Accordion> 
            </div>
            
        </div>
        
    </>
   )
}

export default NoticeBoard;