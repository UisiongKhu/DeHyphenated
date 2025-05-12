import React from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function HomepageFooter() {
    const date = new Date();
    const {t, i18n} = useTranslation();
    return(
        <>
            <div className='d-flex flex-row justify-content-between bg-success py-3 ps-1 fixed-buttom'>
                <p />
                <p className='text-white fs-6' id="copyrights">© 2025 Khu Ûi-siông.</p>
                <p className='text-white fs-6' id="date">{date.getFullYear()} {t('Datetime.year')} {date.getMonth()+1} {t('Datetime.month')} {date.getDate()<=11 ? "chhe":""} {date.getDate()}</p>
            </div>
        </>
    )
}

export default HomepageFooter;