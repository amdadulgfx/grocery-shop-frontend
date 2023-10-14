import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import React, { useState } from 'react';
import newslatterImage from "../../../assets/FooterImage/newsLatterImage.png";
import CustomTextField from "../../../CustomTags/CustomTextField.view"
import EmailIcon from '@mui/icons-material/Email';


const NewsLetter = (props) => {
    const { mobileView } = props;
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleSubscribe = () => {
        if (email === '') {
            setEmailError("This field cannot be empty.");
            return;
        } else {
            setEmailError("Thank you, your sign-up request was successful! Please check your email inbox to confirm.")
        }
    };



    return (
        <Box sx={{ bgcolor: "#233A95", px: mobileView ? "16px" : "40px" }}>
            <Grid container rowSpacing={1} columnSpacing={3} >
                <Grid item xs={12} sm={12} md={5.5} >
                    <Box>
                        <Typography sx={discountTypoColor} >$20 discount for your first order</Typography>
                        <Typography sx={joinTypoColor} >Join our newsletter and get...</Typography>
                        <Typography sx={subscriptionTypoColor} >Join our email subscription now to get updates</Typography>
                        <Typography sx={subscriptionTypoColor} >on promotions and coupons.</Typography>

                        <Box sx={{ position: 'relative', mt: mobileView ? 2 : 3.6 }}>
                            <CustomTextField
                                type="email"
                                sx={{ bgcolor: "white", borderRadius: "6px" }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email Address"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="#C2C2DB" />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        '.MuiOutlinedInput-input': {
                                            padding: '20.5px 19px',
                                        },
                                    },
                                }} />
                            <Button
                                onClick={handleSubscribe}
                                sx={{
                                    position: 'absolute',
                                    top: 13,
                                    right: 12,
                                    backgroundColor: '#233A95',
                                    borderRadius: 1,
                                    color: "#FFFFFF",
                                    py: 1,
                                    '&:hover': {
                                        backgroundColor: '#233A95',
                                    },
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                        <Typography sx={sucessTypoColor} >{emailError}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={1} ></Grid>
                <Grid item xs={12} sm={12} md={5.5} >
                    <img src={newslatterImage} alt='NewsletterImage' style={{ width: mobileView && "100%", height: mobileView && "100%", marginTop: !mobileView && "74px" }} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default NewsLetter;

const discountTypoColor = {
    color: "#FFFFEE",
    fontSize: { xs: "14px", sm: "17px", md: "20px" },
    mt: { xs: 1.5, sm: 3, md: 6.3 }
};

const joinTypoColor = {
    color: "#FFFFFF",
    fontSize: { xs: "17px", sm: "21px", md: "26px" },
    fontWeight: "700"
};

const subscriptionTypoColor = {
    color: "#919CCA",
    fontSize: { xs: "12px", sm: "14px", md: "16px" },
};

const sucessTypoColor = {
    color: "#FFFFEE",
    fontSize: { xs: "12px", sm: "14px", md: "16px" },
    mb: {xs: 1, sm: 1, md: 6}
};