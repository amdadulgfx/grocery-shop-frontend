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
    Container
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import HandshakeIcon from '@mui/icons-material/Handshake';
import HeaderLogo from "../../assets/Logos/header_logo.png"
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import MenuIcon from '@mui/icons-material/Menu';
import { ResponsiveHeader } from "./HeaderMenus.view";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../reduxMine/features/authApi';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useGetCartListQuery } from "../../reduxMine/features/cart/cartAPIs";
import { useKeywords } from "../../context/searchContext";
import { useSearchProductsListMutation } from "../../reduxMine/features/searchProducts/searchProductsAPI";

const InfoRoutes = [
    { label: "About Us", path: "/about-us" },
    { label: "My Account", path: "/my-account" },
    { label: "Wishlist", path: "/wishlists" },
    { label: "FAQ", path: "/faq" },
];

const MainNavigation = [
    { label: "Products", path: "/products" },
    // { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact-us" },
    // { label: "More", path: "/saved" },
];

{/**** Don't Remove ****/ }
/* const options = [
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
]; 

   // const [anchorEl, setAnchorEl] = useState(null);
    // const open = Boolean(anchorEl);
*/

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const tabMode = useMediaQuery(theme.breakpoints.down('lg'));
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchKeyword, setSearchKeyword, handleSearchProductLists } = useKeywords();
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const pathname = window.location.pathname;
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const { data } = useGetCartListQuery();

    useEffect(() => {
        pathname === "/products" ? setShowSearchBar(true) : setShowSearchBar(false);
    }, [pathname]);

    const handleShowSearchBar = (event) => {
        event.preventDefault();
        if (searchKeyword === "") {
            setShowSearchBar((prev) => !prev);
        } else {
            sessionStorage.setItem("searchKeyword", JSON.stringify({ searchKeyword }));
            if (pathname === "/products") {
                const searchProductQueries = JSON.parse(sessionStorage.getItem("searchProductQueries")) || {};
                const searchQueries = JSON.parse(sessionStorage.getItem("searchQueries")) || {};
                setSearchParams({ ...searchProductQueries, keywords: searchKeyword });
                handleSearchProductLists({ ...searchQueries, keyword: searchKeyword?.replace("&", "%26")?.replace(/ /g, "+") || "" });
                window.scrollTo(0, 0);
            } else {
                navigate("/products");
            }
        }
    }

    useEffect(() => {
        if (location.pathname !== "/products") {
            setSearchKeyword("");
            setShowSearchBar(false);
        }
    }, [location]);

    const handleChange = (event) => {
        setSearchKeyword(event.target.value);
    }

    const handleClose = () => {
        setOpenDrawer(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('accessToken');
        matches && handleClose();
    };

    const headerProps = {
        openDrawer,
        setOpenDrawer,
        user,
        handleLogout,
        handleClose,
    }

    return (
        <AppBar
            position="sticky"
            sx={{ backgroundColor: "#ffffff", color: "var(--clr-gray-1)" }}
        >
            {matches ? (
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
                        <Link to="/">
                            <img
                                height="35px"
                                width="100%"
                                src={HeaderLogo}
                                alt="Main_logo"
                            />
                        </Link>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <ResponsiveHeader {...headerProps} />
                        <IconButton
                            onClick={() => setOpenDrawer(true)}
                        >
                            <MenuIcon fontSize="medium" />
                        </IconButton>
                    </Box>
                </Box>
            ) : (
                <>
                    <Container maxWidth="lg" sx={{ py: 0.5 }}>
                        <Box
                            sx={{
                                mx: -3,
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
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "#121212",
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
                                    <span style={{ color: "#2BBEF9", fontWeight: "600" }}>+8801000000000</span>
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                    <Divider />
                    <Container maxWidth="lg" sx={{ py: 0.2, }}>
                        <Box
                            sx={{
                                mx: -3,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            <Box>
                                <Link to="/">
                                    <img
                                        height="40px"
                                        width="100%"
                                        style={{ /* marginLeft: "8px", */ marginTop: "-6px" }}
                                        src={HeaderLogo}
                                        alt="Main_logo"
                                    />
                                </Link>

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
                                            py: 2, px: 1.2,
                                            cursor: "pointer",
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
                                        <Input
                                            sx={{
                                                borderRadius: 16,
                                                padding: "5px 0px 5px 27px  !important",
                                                backgroundColor: "#F3F4F7",
                                                width: tabMode ? 195 : 300,
                                            }}
                                            disableUnderline
                                            placeholder="Search Product"
                                            onChange={handleChange}
                                            value={searchKeyword}
                                            id="lock-button"
                                            aria-haspopup="listbox"
                                            aria-controls="lock-menu"
                                            aria-label="when device is locked"
                                            // aria-expanded={open ? 'true' : undefined}
                                            endAdornment={
                                                <InputAdornment position="end" style={{ outline: "none" }}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{ border: "2px solid #2BBEF9" }}
                                                        onClick={handleShowSearchBar}
                                                    >
                                                        <SearchSharpIcon sx={{ color: "#2BBEF9" }} />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                        {/**** Don't Remove ****/}
                                        {/* <Menu
                                            id="lock-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            sx={{ marginLeft: -29 }}
                                        >
                                            {options.map((option, index) => (
                                                <MenuItem
                                                    key={option}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </Menu> */}
                                    </Box>
                                ) : (
                                    <IconButton
                                        size="small"
                                        sx={{ border: "2px solid #2BBEF9" }}
                                        onClick={handleShowSearchBar}

                                    >
                                        <SearchSharpIcon sx={{ color: "#2BBEF9" }} />
                                    </IconButton>
                                )}

                                {user?.email ? (
                                    <>
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            sx={{
                                                borderRadius: 16,
                                                px: 3,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                textTransform: "none",
                                                fontWeight: "600",
                                            }}
                                            onClick={() => navigate("/carts")}
                                        >

                                            <LocalMallIcon /> <span style={{ marginBottom: "-3px" }}>Cart {data?.data?.length > 0 && <>({data?.data?.length})</>} </span>
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                borderRadius: 16,
                                                px: 3
                                            }}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
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
                                )}
                            </Box>
                        </Box>
                    </Container>
                </>
            )}
        </AppBar >
    );
};


export default Header;