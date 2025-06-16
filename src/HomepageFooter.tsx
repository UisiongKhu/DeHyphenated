import LogoLinks from "components/logoLinks";
import React from "react";
import { Stack } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function HomepageFooter() {
    const {t, i18n} = useTranslation();
    //<p><img src="https://upload.wikimedia.org/wikipedia/commons/3/36/Flag_of_World_Taiwanese_Congress.svg" alt="台灣旗 世界台灣人大會（World Taiwanese Congress）首倡之台灣國旗" height="50" width="100" /></p>
    return(
        <>
            <div className='d-flex flex-row justify-content-between bg-success py-3 ps-1 fixed-buttom'>
                <LogoLinks/>
                <p className='text-white fs-6' id="copyrights">v0.9.3 © 2025 Khu Ûi-siông, some right reserved.</p>
            </div>
        </>
    )
}

export default HomepageFooter;