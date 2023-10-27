import React, { useEffect } from "react";
import {
    Box,
    Breadcrumbs,
    Grid,
    Typography,
    useMediaQuery,
} from "@mui/material";
import aboutUsImage from "../../../assets/Images/aboutUs.jpg";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AboutUs = () => {
    const matches = useMediaQuery("(max-width: 900px)");
    document.title = "About Us | Grocery Heaven"

    useEffect(() => {
        window?.scrollTo(0, 0);
    }, []);

    return (
        <Box sx={{ backgroundColor: "#FAFAFA", my: -10, py: 10 }}>
            <Box sx={{ px: matches ? "12px" : "60px" }}>
                <Box sx={{ py: 1 }}>
                    <Breadcrumbs
                        separator={
                            <NavigateNextIcon fontSize="small" sx={{ color: "#395987" }} />
                        }
                        aria-label="breadcrumb"
                    >
                        <Link
                            underline="hover"
                            style={{ color: "#395987", fontSize: "14px" }}
                            to="/"
                        >
                            Home
                        </Link>
                        <Typography sx={{ color: "#395987", fontSize: "14px" }}>
                            About Us
                        </Typography>
                    </Breadcrumbs>
                </Box>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: matches ? "22px" : "24px",
                        color: "#395987",
                        fontWeight: "600",
                        mt: matches ? 1.2 : 2,
                    }}
                >
                    About Us
                </Typography>
                <Box
                    sx={{
                        boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
                        borderRadius: "6px",
                        mt: "24px",
                        mb: matches ? "40px" : "65px",
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <Box
                        sx={{
                            pl: matches ? "17px" : "70px",
                            pr: "12px",
                            pt: matches ? "18px" : "63px",
                            mb: matches ? "34px" : "0px",
                        }}
                    >
                        <Grid container spacing={matches ? 0 : 2}>
                            {matches && (
                                <Grid item xs={12} md={5}>
                                    <Box sx={{ paddingLeft: "27px", paddingRight: "27px", paddingTop: "4px" }}>
                                        <img
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                borderRadius:"10px"
                                            }}
                                            src={aboutUsImage}
                                            alt="About Us"
                                        />
                                    </Box>
                                </Grid>
                            )}
                            <Grid item xs={12} md={6.5}>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        color: "#395987",
                                        fontWeight: "600",
                                        mt: "32px",
                                    }}
                                >
                                    Organization Name
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        color: "#4F4F4F",
                                        fontWeight: "400",
                                        pt: "19px",
                                    }}
                                >
                                    What began little, with a solitary idea of a store that provides a rebate and the basic thought of moving more for less, has become in the course of the last 40 years into the biggest retailer in this whole country. Every week, about 265 million clients and individuals visit our in excess of 13,200 stores under 55 standards in 27 nations and eCommerce sites in 10 nations.
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        color: "#4F4F4F",
                                        fontWeight: "400",
                                        pt: "19px",
                                    }}
                                >
                                    With the financial year 2018 income of $500.3 billion, ‘Organization Name’ utilizes over 2.2 million partners around the world. ‘Organization Name’ keeps on being an innovator in supportability, corporate magnanimity, and work opportunity. It’s everything part of our relentless promise to make openings and convey an incentive to clients and networks the world over.
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "18px", color: "#395987", fontWeight: "600", mt: "30px" }}
                                >
                                    Our Vision & Mission:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        color: "#4F4F4F",
                                        fontWeight: "400",
                                        pt: "19px",
                                    }}
                                >
                                    To satisfy our partners and customers with a unique shopping experience offering quality, variety, price and service, based on the attention and commitment of our employees. “Committed workers, satisfied customers.” A vision statement is future oriented, meant to inspire. It often describes a future where the firm redefines the industry and benefits society overall.
                                </Typography>

                            </Grid>
                            {!matches && (
                                <Grid item xs={12} md={5.5}>
                                    <Box sx={{ paddingLeft: "30px", marginTop: "80px", paddingRight: "20px" }}>
                                        <img
                                            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                            src={aboutUsImage}
                                            alt="About Us"
                                        />
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            pl: matches ? "15px" : "70px",
                            pr: matches ? "15px" : "5px",
                            pt: matches ? "0px" : "63px",
                            pb: matches ? "16px" : "76px",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <Typography
                                        sx={{ fontSize: "18px", color: "#395987", fontWeight: "600" }}
                                    >
                                        Corporate Office:
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            color: "#4F4F4F",
                                            fontWeight: "400",
                                            pt: "5px",
                                        }}
                                    >
                                        Team Hexa Pvt Ltd,
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            color: "#4F4F4F",
                                            fontWeight: "400",
                                            pt: "5px",
                                        }}
                                    >
                                        2st Floor, Rajbari, Dhaka, Bangladesh
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            color: "#4F4F4F",
                                            fontWeight: "400",
                                            pt: "5px",
                                        }}
                                    >
                                        Pangsha - 7720
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            color: "#4F4F4F",
                                            fontWeight: "400",
                                            pt: "5px",
                                        }}
                                    >
                                        info@teamHexa.com
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: "14px",
                                            color: "#4F4F4F",
                                            fontWeight: "400",
                                            pt: "5px",
                                        }}
                                    >
                                        +88 01122 999999
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutUs;