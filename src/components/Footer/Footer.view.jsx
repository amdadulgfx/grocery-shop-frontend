import React from 'react';
import FooterTitles from './Components/FooterTitles.view';
import FooterContactAndApp from './Components/FooterContactAndApp.view';
import FooterRoutes from './Components/FooterRoutes.view';
import NewsLetter from './Components/NewsLetter.view';
import { useMediaQuery, useTheme } from '@mui/material';

const Footer = () => {
    const theme = useTheme();
    const mobileView = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div style={{marginTop:"33px"}}>
            <NewsLetter mobileView={mobileView} />
            <FooterTitles mobileView={mobileView} />
            <FooterRoutes mobileView={mobileView} />
            <FooterContactAndApp mobileView={mobileView} />
        </div>
    );
};

export default Footer;