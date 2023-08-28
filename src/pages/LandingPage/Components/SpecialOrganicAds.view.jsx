import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
} from '@material-ui/core';
import SpecialOrganicAdsImage from "../../../assets/LandingPageImages/SpecialOrganicAds.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${SpecialOrganicAdsImage})`, // Use backticks here
        backgroundSize: 'cover', // Adjust the background size if needed
        backgroundPosition: 'center',
        height: '80vh', // Adjust the height if needed
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: '10px',
        textAlign: 'center',
        color: 'white',
    },
    organicTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px', // Set font size to 16px
    },
    price: {
        color: '#E20000', // Deep red color
        fontSize: '16px', // Set font size to 16px
    },
}));

const SpecialOrganicAds = () => {
    const classes = useStyles();

    return (
        <Box>
            <Box className={classes.root}>
                <Box className={classes.content}>
                    <Typography variant="h4" gutterBottom className={classes.organicTitle}>
                        Bacola Natural Foods
                    </Typography>
                    <Typography variant="h5" gutterBottom className={classes.organicTitle}>
                        Special Organic
                    </Typography>
                    <Typography variant="h4" gutterBottom className={classes.organicTitle}>
                        Roats Burger
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.organicTitle}>
                        only-from
                    </Typography>
                    <Typography variant="h4" gutterBottom className={classes.price}>
                        $14.99
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SpecialOrganicAds;
