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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const inactiveRouteStyle = { px: "1rem !important", py: "0rem !important" };
const activeRouteStyle = { ...inactiveRouteStyle, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.2rem", pt: "0.6rem" };
const optionStyle = { fontWeight: 600, cursor: "pointer", fontSize: "1rem", lineHeight: 1.5 };

const serviceOptions = [
    { name: "Post A Job", pathname: "/post-jobs" },
    { name: "Search Candidates", pathname: "/search-candidate" },
    { name: "Staffing", pathname: "/staffing-solutions" },
    { name: "Branding", pathname: "/branding-solutions" }
];

const navigations = [
    { label: "Dashboard", path: "/profile-home" },
    { label: "Profile", path: "/profile" }
];



const Header = () => {
    const navigate = useNavigate();





    return (
        <AppBar
            position="sticky"
            sx={{ backgroundColor: "#ffffff", color: "var(--clr-gray-1)" }}
        >
            
           
        </AppBar >
    );
};


export default Header;