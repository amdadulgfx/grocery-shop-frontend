import React from 'react';
import FreshestProductsAdsImage from "../../../assets/LandingPageImages/FreshestProductsAds.jpg";
import { Box, Typography } from '@mui/material';

const FreshestProductsAds = () => {

    return (
        <Box sx={{ mt: 2 }} >
            <Box sx={root}>
                <Box sx={content}>
                    <Typography sx={freshTitle}>
                        Best Bakery Products
                    </Typography>
                    <Typography sx={freshSpecial}>
                        Freshest Products
                    </Typography>
                    <Typography sx={freshEveryHour}>
                        every hour.
                    </Typography>
                    <Typography sx={freshOnly}>
                        only-from
                    </Typography>
                    <Typography sx={price}>
                        $14.99
                    </Typography>
                    <button style={buttonStyle} >Shop Now</button>

                </Box>
            </Box>
        </Box>
    );
};

export default FreshestProductsAds;


const root = {
    backgroundImage: `url(${FreshestProductsAdsImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: { xs: "50vh", md: '80vh' },
    width: "100%",
    borderRadius: "6px"
};

const content = {
    padding: '30px'
};

const freshTitle = {
    color: 'rgb(113, 119, 142)',
    fontWeight: 600,
    fontSize: '14px',
    mb: "8px"
};

const freshSpecial = {
    color: 'gray',
    fontWeight: 300,
    fontSize: '22px',
};

const freshEveryHour = {
    color: 'black',
    fontWeight: 600,
    fontSize: '1.5rem',
    mb: "10px"
};

const freshOnly = {
    color: 'black',
    fontWeight: '400',
    fontSize: '11px',
};

const price = {
    color: '#E20000',
    fontSize: '26px',
    fontWeight: 600,
    mb: 1
};

const buttonStyle = {
    borderRadius: "30px",
    padding: "8px 16px 8px 16px",
    backgroundColor:"rgb(43, 190, 249)",
    color:"white",
    border: "1px solid rgb(43, 190, 249)", 
    fontSize:"14px",
    cursor:"pointer"
}
