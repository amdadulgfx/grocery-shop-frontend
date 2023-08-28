import React from 'react';
import {
    Box,
    Typography,
    makeStyles,
} from '@material-ui/core';
import FreshestProductsAdsImage from "../../../assets/LandingPageImages/FreshestProductsAds.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${FreshestProductsAdsImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
    },
    content: {
        textAlign: 'center',
        color: 'white',
    },
    grayText: {
        color: 'gray',
        fontSize: '16px',
    },
    blackText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    price: {
        color: '#E20000', // Deep red color
        fontSize: '16px',
    },
}));

const FreshestProductsAds = () => {
    const classes = useStyles();

    return (
        <Box sx={{mt: 2}} >
            <Box className={classes.root}>
                <Box className={classes.content}>
                    <Typography variant="h4" gutterBottom className={classes.grayText}>
                        Best Bakery Products
                    </Typography>
                    <Typography variant="h4" gutterBottom className={classes.grayText}>
                        Freshest Products
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.blackText}>
                        every hour.
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.grayText}>
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

export default FreshestProductsAds;
