import React from 'react';
import SpecialOrganicAdsImage from "../../../assets/LandingPageImages/SpecialOrganicAds.jpg";
import { Box, Typography } from '@mui/material';


const SpecialOrganicAds = () => {

    return (
        <Box>
            <Box sx={root}>
                <Box sx={content}>
                    <Typography sx={organicTitle}>
                        Bacola Natural Foods
                    </Typography>
                    <Typography sx={organicSpecial}>
                        Special Organic
                    </Typography>
                    <Typography sx={organicRoatsBurger}>
                        Roats Burger
                    </Typography>
                    <Typography sx={organicOnly}>
                        only-from
                    </Typography>
                    <Typography sx={price}>
                        $14.99
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SpecialOrganicAds;

const root = {
    backgroundImage: `url(${SpecialOrganicAdsImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: {xs: "40vh", md: '80vh'},
    width: "100%",
    borderRadius: "6px"
};

const content = {
    padding: '30px'
};

const organicTitle = {
    color: 'White',
    fontWeight: '500px',
    fontSize: '14px',
    mb: "8px"
};

const organicSpecial = {
    color: 'black',
    fontWeight: 400,
    fontSize: '18px',
};

const organicRoatsBurger = {
    color: 'black',
    fontWeight: 600,
    fontSize: '1.5rem',
    mb: "10px"
};

const organicOnly = {
    color: 'black',
    fontWeight: '400',
    fontSize: '11px',
};

const price = {
    color: '#E20000',
    fontSize: '26px',
    fontWeight: 600
};