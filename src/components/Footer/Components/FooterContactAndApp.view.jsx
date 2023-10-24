import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import appStore from "../../../assets/FooterImage/AppStore.png";
import instagram from "../../../assets/FooterImage/Instragram.png";
import facebook from "../../../assets/FooterImage/facebook.png";
import playStore from "../../../assets/FooterImage/planStoreImage.png";


const FooterContactAndApp = (props) => {
    const { mobileView } = props;

    return (
        <Box sx={{ px: !mobileView && "2rem", py: "2rem" }}>
            <Grid container sx={{ pt: mobileView ? 1.5 : 2.5, pb: mobileView ? 3 : 4.5, px: mobileView && "16px" }}>
                <Grid item xs={12} sm={6} md={5.2} >
                    <Box sx={{ display: "flex", alignItems: "center", px: !mobileView && 2 }}>
                        <Box>
                            <PhoneInTalkIcon sx={{ border: "0.5px solid #395987", borderRadius: "50%", p: 1, color: "#395987" }} />
                        </Box>
                        <Box sx={{ ml: 2 }}>
                            <Typography sx={{ ...downloadAppStyle, fontSize: "1.25rem" }}>+8801401257859</Typography>
                            <Typography sx={CopyrightTextStyle}>Working 8:00 - 22:00</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6.8}>
                    <Box sx={{ display: !mobileView && "flex", alignItems: !mobileView && "center" }}>
                        <Box sx={{ mt: mobileView && 1.5 }}>
                            <Typography sx={{ ...downloadAppStyle, fontSize: ".875rem" }} >Download App on Mobile :</Typography>
                            <Typography sx={CopyrightTextStyle} >15% discount on your first purchase</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mt: mobileView && 2 }}>
                            <Box sx={{ ml: !mobileView && 2 }} >
                                <img src={playStore} alt='AndriodAPP' style={{ width: "116px", height: "38px" }} />
                            </Box>
                            <Box sx={{ ml: 1, mr: !mobileView && 2 }} >
                                <img src={appStore} alt='AndriodAPP' style={{ width: "116px", height: "38px" }} />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: mobileView ? "start" : "start",
                                alignItems: "center",
                                mt: mobileView ? "16px" : "8px",
                            }}
                        >
                            <a
                                href="https://www.facebook.com/profile.php?grocyer.haven"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={facebook} alt="fb_icon" />
                            </a>
                            <a
                                style={{ marginLeft: mobileView ? "37.75px" : "20px" }}
                                href="https://twitter.com/GroceryHeaven"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <TwitterIcon sx={{ color: "#395987" }} />
                            </a>
                            <a
                                style={{ marginLeft: mobileView ? "37.75px" : "20px" }}
                                href="https://www.instagram.com/grocery-heaven"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img src={instagram} alt="instagram_icon" />
                            </a>
                            <a
                                style={{ marginLeft: mobileView ? "37.75px" : "20px" }}
                                href="https://www.youtube.com/channel/UCTjqm_kIHBARGqHmat4KyDA"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <YouTubeIcon sx={{ color: "#395987" }} />
                            </a>
                            <a
                                style={{ marginLeft: mobileView ? "37.75px" : "20px" }}
                                href="https://www.linkedin.com/company/grocery-heaven/about"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <LinkedInIcon sx={{ color: "#395987" }} />
                            </a>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ px: mobileView && "16px" }}>
                <Grid item xs={12} sm={6} md={6}>
                    <Box sx={{ mt: mobileView ? 2 : 4 }}>
                        <Typography sx={CopyrightTextStyle} >Copyright 2023 © All rights reserved. Powered by Team Hexa.</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Box sx={{ display: "flex", alignItems: !mobileView && "center", justifyContent: !mobileView && "center", mt: mobileView ? 2 : 4 }}>
                        <Link style={linkStyle} to="/">Privacy Policy</Link>
                        <Link style={linkStyle} to="/terms-&-conditions">Terms and Conditions</Link>
                        <Link style={linkStyle} to="/">Cookie</Link>
                    </Box>
                </Grid>
            </Grid>

        </Box>
    );
};

export default FooterContactAndApp;

const linkStyle = {
    color: "#7177AA",
    textDecoration: "none",
    marginRight: "12px",
    fontSize: ".75rem"
};

const CopyrightTextStyle = {
    color: "#7177AA",
    fontSize: ".75rem",
    fontWeight: 500,
    textAlign: { xs: "start", sm: "start", md: "center" }
};

const downloadAppStyle = {
    fontWeight: 600,
    color: "#202435"
}