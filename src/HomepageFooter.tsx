import React from "react";
import './css/Homepage.css'
import { useTranslation } from "react-i18next";

function HomepageFooter() {
    const date = new Date();
    const {t, i18n} = useTranslation();
    return(
        <div className="homepage-footer-container">
            <div className="homepage-footer" id="footer-1" >
                <p/>
                <p className="copyrights">© 2025 Khu Ûi-siông.</p>
                <p className="date">{date.getFullYear()} {t('Datetime.year')} {date.getMonth()+1} {t('Datetime.month')} {date.getDate()<=11 ? "chhe":""} {date.getDate()}</p>
            </div>
        </div>
    )
}

export default HomepageFooter;