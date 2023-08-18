import {
    AppBar,
    Box,
    Button,
    Container,
    List,
    ListItem,
    Typography,
    useMediaQuery,
    Paper,
    Divider,
    useTheme,
    IconButton,
    Input,
    InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useLocation, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Slide from '@mui/material/Slide';
import CircleIcon from '@mui/icons-material/Circle';
import TypographySubtitle from "../../CustomTags/CustomTypography/TypographySubtitle.view";
import HandshakeIcon from '@mui/icons-material/Handshake';
import HeaderLogo from "../../assets/Logos/header_logo.png"
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { TurnedInOutlined } from "@mui/icons-material";
import styled from "@emotion/styled";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const SearchButton = styled(Button)(() => ({
    border: "none !important",
}));

const inactiveRouteStyle = { px: "1rem !important", py: "0rem !important" };
const activeRouteStyle = {
    ...inactiveRouteStyle,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.2rem",
    pt: "0.6rem"
};
const optionStyle = {
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1rem",
    lineHeight: 1.5
};


const InfoRoutes = [
    { label: "About Us", path: "/about" },
    { label: "My Account", path: "/profile" },
    { label: "Wishlist", path: "/saved" },
    { label: "Order Tracking", path: "/tracking" },
]

const MainNavigation = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/recomanded" },
    { label: "Blog", path: "/blog" },
    { label: "Conact", path: "/contact-us" },
    { label: "More", path: "/saved" },
]



const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [showSearchBar, setShowSearchBar] = useState(false);

    return (
        <AppBar
            position="sticky"
            sx={{ backgroundColor: "#ffffff", color: "var(--clr-gray-1)" }}
        >
            {matches ? (<>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 1,
                        p: 2
                    }}
                >
                    <Box>
                        <img
                            height="35px"
                            width="100%"
                            src={HeaderLogo}
                            alt="Main_logo"
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <HandshakeIcon />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >

                    </Box>
                </Box>
            </>) : (
                <>
                    <Box maxWidth="lg" sx={{ mx: 5, py: 0.5, }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Box>
                                {InfoRoutes.map((route) => (
                                    <Typography
                                        variant="body2"
                                        key={route.path}
                                        onClick={() => navigate(route.path)}
                                        sx={{
                                            display: "inline-block",
                                            color: "#757575",
                                            fontSize: "12px",
                                            px: 1,
                                            pb: 0.6,
                                        }}
                                    >
                                        {route.label}
                                    </Typography>
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <HandshakeIcon />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "#757575",
                                        fontSize: "12px",
                                    }}
                                >
                                    100% Secure delivery without contacting the courier
                                </Typography>

                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: "inline-flex",
                                        color: "#757575",
                                        fontSize: "12px",
                                        alignItems: "center",
                                    }}
                                >
                                    <span>Need help? Call Us:</span>
                                    <span style={{ color: "#2BBEF9", fontWeight: "600" }}>+0020 500</span>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box maxWidth="lg" sx={{ mx: 5, }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Box>
                                <img
                                    height="40px"
                                    width="100%"
                                    style={{ marginLeft: "8px", marginTop: "-6px" }}
                                    src={HeaderLogo}
                                    alt="Main_logo"
                                />
                            </Box>
                            <Box>
                                {MainNavigation.map((route) => (
                                    <Typography
                                        variant="subtitle1"
                                        key={route.path}
                                        onClick={() => navigate(route.path)}
                                        sx={{
                                            display: "inline-block",
                                            color: "#757575",
                                            fontSize: "1rem",
                                            fontWeight: "600",
                                            p: 2,
                                            "&:hover": {
                                                color: "#2BBEF9"
                                            }
                                        }}
                                    >
                                        {route.label}
                                    </Typography>
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                {showSearchBar ? (
                                    <Box maxWidth="md" sx={{ mx: "auto", px: matches ? "16px" : "" }}>
                                        <form /* onSubmit={handleJobsSearch} */>
                                            <Input
                                                sx={{
                                                    borderRadius: 16,
                                                    padding: "5px 0px 5px 27px  !important",
                                                    backgroundColor: "#F3F4F7"
                                                }}
                                                disableUnderline
                                                fullWidth
                                                placeholder="Search Product"
                                                endAdornment={
                                                    <InputAdornment position="end" style={{ outline: "none" }}>
                                                        <IconButton
                                                            size="small"
                                                            sx={{ border: "2px solid #2BBEF9" }}
                                                            onClick={() => setShowSearchBar(false)}
                                                        >
                                                            <SearchSharpIcon sx={{ color: "#2BBEF9" }} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </form>
                                    </Box>
                                ) : (
                                    <IconButton
                                        size="small"
                                        sx={{ border: "2px solid #2BBEF9" }}
                                        onClick={() => setShowSearchBar(true)}
                                    >
                                        <SearchSharpIcon sx={{ color: "#2BBEF9" }} />
                                    </IconButton>
                                )}

                                <Button
                                    variant="contained"
                                    sx={{
                                        borderRadius: 16,
                                        px: 3
                                    }}
                                >
                                    SignUp
                                </Button>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        border: "2px solid !important",
                                        borderRadius: 16,
                                        px: 3
                                    }}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </>
            )}
        </AppBar >
    );
};


export default Header;