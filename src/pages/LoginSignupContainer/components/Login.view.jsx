import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GroceryAlert from "../../../components/GroceryAlert";
import { useDispatch } from "react-redux";
import { login } from "../../../reduxMine/features/authApi";
import jwtDecode from "jwt-decode";

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(3, 'Password must be at least 6 characters').required('Required'),
});

const accountDetails = {
    email: '',
    password: '',
};
const Login = () => {
    // const [initialValues, setinInitialValues] = useState(accountDetails);
    const [successAlert, setSuccessAlert] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (user) => {
        dispatch(login(user));
    };

    const formik = useFormik({
        initialValues: accountDetails,
        validationSchema,
        onSubmit: (values) => {
            axios.post(`${process.env.REACT_APP_API_URI}auth/signin/`, values)
                .then((res) => {
                    if (res.data.success) {
                        let access_token = res?.data?.data?.token;
                        localStorage.setItem("accessToken", access_token);
                        let user;
                        if (access_token) {
                            user = jwtDecode(access_token);
                        }
                        handleLogin(user);
                        setSuccessAlert(true);
                        navigate("/");
                    }
                })
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit} style={{ padding: "2.5rem", textAlign: "center" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Button sx={{ marginTop: "1rem", borderRadius: "2rem", padding: "0.5rem 2rem" }} variant="contained" type="submit">Login</Button>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Typography
                        variant="body1"
                        component="p"
                        sx={{ color: "#333333", fontSize: "1rem" }}
                    >
                        Don't have an account?
                    </Typography>
                    <Button
                        variant="text"
                        onClick={() => navigate("/signup")}
                        sx={{
                            fontWeight: 600,
                            fontSize: "1rem",
                            textDecoration: "underline",
                        }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </form>
            {
                successAlert &&
                // <Alert severity="success">Your account details updated successfully </Alert>
                <GroceryAlert enable={successAlert} msg="Your  have logged in successfully" severity="success"
                />
            }
        </div>
    )
}

export default Login;