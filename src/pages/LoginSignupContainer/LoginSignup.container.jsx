import { Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../../reduxMine/features/authApi";
import Login from "./components/Login.view";
import Signup from "./components/Signup.view";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function LoginSignup() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const user = useSelector(selectUser);


    useEffect(() => {
        if (user.email) {
            console.log(user.email);
            navigate("/")
        }
        if (pathname === "/login") setValue(0);
        if (pathname === "/signup") setValue(1);
    }, [pathname, navigate, user.email])



    const tabStyle = { fontWeight: 700, width: "auto !important", fontSize: '16px' }

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate("/login");
        if (newValue === 1) navigate("/signup");
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ width: '34rem', mx: 2, background: '#FFFFFF', borderRadius: 2, border: "1px solid #e4e5ee" }}>
                <Box sx={{ borderBottom: 0, borderColor: "#395987", color: "var(--clr-blue-footer)", display: "flex", justifyContent: "center" }}>
                    <Tabs variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        scrollButtons="auto"
                        allowScrollButtonsMobile={true}
                        aria-label="basic tabs"
                        textColor="inherit"
                        TabIndicatorProps={{
                            sx: {
                                backgroundColor: "#395987",
                                height: "4px",
                                borderBottom: 0,
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                            },
                        }}
                        sx={{
                            ".MuiTabs-flexContainer": {
                                display: "flex",
                                justifyContent: "space-between",
                                color: '#395987'
                            }
                        }}
                    >
                        <Tab style={{ ...tabStyle }} label="Login" key="Login" />
                        <Tab style={{ ...tabStyle }} label="Sign Up" key="Sign Up" />
                    </Tabs>
                </Box>
                <Box sx={{ border: '1px solid #E4EEF5', width: '100%', mt: 1.3 }} />
                <TabPanel value={value} index={0} key={'Login'}>
                    {/* <SingupForm pageType="LogIn" source='signup' /> */}
                    <Login />
                </TabPanel>
                <TabPanel value={value} index={1} key={'Sign Up'}>
                    <Signup />
                </TabPanel>
            </Box>
        </Box>
    )
}

export default LoginSignup;