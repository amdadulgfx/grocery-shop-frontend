import {
    AppBar,
    Box,
    Button,
    Typography,
    useMediaQuery,
    Divider,
    useTheme,
    IconButton,
    Input,
    InputAdornment,
    Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import HandshakeIcon from '@mui/icons-material/Handshake';
import HeaderLogo from "../../assets/Logos/header_logo.png"
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { ResponsiveHeader } from "./HeaderMenus.view";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../reduxMine/features/authApi';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InfoRoutes = [
    { label: "About Us", path: "/about" },
    { label: "My Account", path: "/my-account" },
    { label: "Wishlist", path: "/saved" },
    { label: "Order Tracking", path: "/tracking" },
];

const MainNavigation = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact-us" },
    { label: "More", path: "/more" },
];



const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action
        localStorage.removeItem('accessToken');
    };

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
                        <ResponsiveHeader
                            openDrawer={openDrawer}
                            setOpenDrawer={setOpenDrawer}
                        />
                        <IconButton
                            onClick={() => setOpenDrawer(true)}                        >
                            <MenuIcon fontSize="medium" />
                        </IconButton>
                    </Box>
                </Box>
            </>) : (
                <>
                    <Container maxWidth="lg" sx={{ py: 0.5, }}>
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
                    </Container>
                    <Divider /*  sx={{mx: -100}} */ />
                    <Container maxWidth="lg" sx={{ py: 0.2, }}>
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
                                {
                                    user?.email ? <Button
                                        variant="contained"
                                        sx={{
                                            borderRadius: 16,
                                            px: 3
                                        }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button> : <>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 16,
                                                px: 3
                                            }}
                                            onClick={() => navigate('/signup')}
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
                                            onClick={() => navigate('/login')}
                                        >
                                            Login
                                        </Button>
                                    </>
                                }

                            </Box>
                        </Box>
                    </Container>
                </>
            )}
        </AppBar >
    );
};


export default Header;