import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SettingsIcon from '@mui/icons-material/Settings';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const FooterTitles = (props) => {
    const { mobileView } = props;

    return (
        <Box>
            <Box sx={boxStyle}>
                <Grid container spacing={1}>
                    {footerDatas.map((footerData, index) => (
                        <Grid item xs={12} sm={6} md={3} key={footerData?.id} sx={{ borderRight: !mobileView && index !== 3 && "0.5px solid #E4E5EE" }} >
                            <Box sx={{ display: "flex", alignItems: !mobileView && "center", justifyContent: !mobileView && "center" }}>
                                <footerData.icon sx={iconStyle} />
                                <Typography sx={textStyle}>{footerData?.title}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {!mobileView && <Divider sx={{ mt: 5 }} />}
            </Box>
            {mobileView && <Divider sx={{ mt: 0 }} />}
        </Box>
    );
};

export default FooterTitles;

const footerDatas = [
    { id: 1, title: "Everyday fresh products", icon: ProductionQuantityLimitsIcon },
    { id: 2, title: "Free delivery for order over $70", icon: LocalShippingIcon },
    { id: 3, title: "Daily Mega Discounts", icon: SettingsIcon },
    { id: 4, title: "Best price on the market", icon: MonetizationOnIcon },
];

const boxStyle = {
    px: { xs: 2, sm: 2, md: 4 },
    py: { xs: 2, sm: 2, md: 4 }, 
    backgroundColor:"#F7F8FD"
};

const iconStyle = {
    color: "#000000",
    fontSize: "22px"
};

const textStyle = {
    ml: "8px",
    color: "#000000",
    fontSize: ".8125rem",
    fontWeight: 500
};