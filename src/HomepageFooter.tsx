import React from "react";
import './css/Homepage.css'

function HomepageFooter() {
    const date = new Date();
    return(
        <div className="homepage-footer-container">
            <div className="homepage-footer" id="footer-1" >
                <p/>
                <p className="copyrights">© 2025 Khu Ûi-siông.</p>
                <p className="date">{date.getFullYear()} nî {date.getMonth()+1} goe̍h {date.getDate()<=11 ? "chhe":""} {date.getDay()}</p>
            </div>
        </div>
    )
}

export default HomepageFooter;