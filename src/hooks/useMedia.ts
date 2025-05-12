// From: https://medium.com/@iga00257/如何寫一隻判斷-rwd-斷點的-hook-f737571881d8
// Ēng render ê resolution lâi hun pia̍t iōng chiá ēng ê siat pī

import { useState, useEffect } from 'react';
export const LAYOUT = {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop'
}

export const MAX_MOBILE_WIDTH = 710;
export const MAX_TABLET_WIDTH = 1024;

function useMedia(){
    const [currentLayout, setCurrentLayout] = useState(LAYOUT.DESKTOP);
    useEffect(()=>{
        const handleWindowWidth = () => {
            if(window.innerWidth < MAX_MOBILE_WIDTH){
                setCurrentLayout(LAYOUT.MOBILE);
            }else if(window.innerWidth >= MAX_MOBILE_WIDTH && window.innerWidth < MAX_TABLET_WIDTH){
                setCurrentLayout(LAYOUT.TABLET);
            }else{
                setCurrentLayout(LAYOUT.DESKTOP);
            }
        }

        handleWindowWidth();

        window.addEventListener('resize', handleWindowWidth);
        
        return () => {
            window.removeEventListener('resize', handleWindowWidth);
        }
    }, [])

    return{
        isMobile: currentLayout === LAYOUT.MOBILE,
        isTablet: currentLayout === LAYOUT.TABLET,
        isDesktop: currentLayout === LAYOUT.DESKTOP,
    }
}

export default useMedia;