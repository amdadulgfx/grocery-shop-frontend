import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputLabel,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import VerifySignUp from "./VerifySignUp.view";
import axios from "axios";

const SignupGrid = styled(Grid)(() => ({
    backgroundColor: "var(--clr-white)",
    // boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
    borderRadius: "6px",
    // padding: "20px 39px 40px",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

var __currentUserEmail = "";

// rendering continuously in hospital flow and job seekers flow

const UseFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
};

const SingupForm = (props) => {
    const navigate = useNavigate(false);
    const location = useLocation();
    const [loader, setLoader] = useState();
    const [error, setError] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");
    const [errorInvalidEmail, setErrorInvalidEmail] = useState("");
    const [strongPassword, setStrongPassword] = useState("");
    const [weakPassword, setWeakPassword] = useState("");
    const [failure, setFailure] = useState(false);
    const [isLogin, setisLogin] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        forgotPasswordCode: "",
    });
    const [recievedCode, setRecievedCode] = useState(null);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [success, setSuccess] = useState("");
    const [successForgetPassword, setSuccessForgetPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [failureLogin, setFailureLogin] = useState(false);
    const [registerSuccess, setRegisterSuccess] = useState(false);
    const [confirmEmailCode, setConfirmEmailCode] = useState({
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: "",
    });
    const [forgotPassword, setForgotPassword] = useState("");
    const [emailByLink, setEmaiBylLink] = useState([]);
    const [emailCode, setEmailCode] = useState("");
    const [progress, setProgress] = useState(0);
    const [userExists, setUserExists] = useState(false);
    const [userExistsData, setUserExistsData] = useState();
    const { loginCode } = useParams();
    const [signupResendCode, setSignupResendCode] = useState(false);
    const [verificationCodeSent, setVerificationCodeSent] = useState(false);
    const [progressLoading, setProgressLoading] = useState(false);
    const [focusedEmail, setFocusedEmail] = useState(false);
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);
    const [focusedSignUpVerificationCode, setFocusedSignUpVerificationCode] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [code1Ref, setCode1Focus] = UseFocus();
    const [code2Ref, setCode2Focus] = UseFocus();
    const [code3Ref, setCode3Focus] = UseFocus();
    const [code4Ref, setCode4Focus] = UseFocus();
    const [code5Ref, setCode5Focus] = UseFocus();
    const [code6Ref, setCode6Focus] = UseFocus();
    const [confirmBtnFocus, setConfirmBtnFocus] = UseFocus();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const token = localStorage.getItem("accessToken");
    const onlyNumbers = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "");
    };

    useEffect(() => {
        window?.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (((location?.state?.history === "/post-jobs") || (location?.state?.history === "/search-candidate") || (location?.state?.history === "/staffing-solutions") || (location?.state?.history === "/branding-solutions"))) {
            setOpen1(true);
        };
    }, [location?.state?.history])

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setValues({
            ...values,
            showConfirmPassword: !values.showConfirmPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleConfirmationCode = (prop) => (event) => {
        const val = event.target.value;
        if (val.length === 6) {
            setConfirmEmailCode({
                ...confirmEmailCode,
                code1: val?.slice(0, 1),
                code2: val?.slice(1, 2),
                code3: val?.slice(2, 3),
                code4: val?.slice(3, 4),
                code5: val?.slice(4, 5),
                code6: val?.slice(5, 6),
            });
        } else {
            setConfirmEmailCode({
                ...confirmEmailCode,
                [prop]: val?.slice(val.length - 1, val.length),
            });
        }

        switch (prop) {
            case "code1":
                // if(!val) setCode2Focus();
                if (val) setCode2Focus();
                break;
            case "code2":
                if (!val) setCode1Focus();
                if (val) setCode3Focus();
                break;
            case "code3":
                if (!val) setCode2Focus();
                if (val) setCode4Focus();
                break;
            case "code4":
                if (!val) setCode3Focus();
                if (val) setCode5Focus();
                break;
            case "code5":
                if (!val) setCode4Focus();
                if (val) setCode6Focus();
                break;
            case "code6":
                if (!val) setCode5Focus();
                if (val) setCode5Focus();
                break;
            default:
                setConfirmBtnFocus();
        }
    };

    const focusChangeKeyDown = (prop) => (event) => {
        var key = event.keyCode;
        if (key === 8) {
            switch (prop) {
                case "code1":
                    if (confirmEmailCode.code1 === "") {
                        return setCode1Focus();
                    } else {
                        return setCode2Focus();
                    }
                    break;
                case "code2":
                    if (confirmEmailCode.code2 === "") {
                        return setCode1Focus();
                    } else {
                        return setCode2Focus();
                    }
                    break;
                case "code3":
                    if (confirmEmailCode.code3 === "") {
                        return setCode2Focus();
                    } else {
                        return setCode3Focus();
                    }
                    break;
                case "code4":
                    if (confirmEmailCode.code4 === "") {
                        return setCode3Focus();
                    } else {
                        return setCode4Focus();
                    }
                    break;
                case "code5":
                    if (confirmEmailCode.code5 === "") {
                        return setCode4Focus();
                    } else {
                        return setCode5Focus();
                    }
                    break;
                case "code6":
                    if (confirmEmailCode.code6 === "") {
                        return setCode5Focus();
                    } else {
                        return setCode6Focus();
                    }
                    break;
                default:
                    setConfirmBtnFocus();
            }
        }
    };

    const checkEmailAlreadyExists = () => {

    };

    useEffect(() => {
        if (recievedCode) {
            if (!confirmEmailCode.code1) return setCode1Focus();
            if (
                confirmEmailCode.code1 &&
                confirmEmailCode.code2 &&
                confirmEmailCode.code3 &&
                confirmEmailCode.code4 &&
                confirmEmailCode.code5 &&
                confirmEmailCode.code6
            ) {
                setConfirmBtnFocus();
            }
        }
    }, [recievedCode, confirmEmailCode]);

    const fullConfirmationCode =
        confirmEmailCode.code1 +
        confirmEmailCode.code2 +
        confirmEmailCode.code3 +
        confirmEmailCode.code4 +
        confirmEmailCode.code5 +
        confirmEmailCode.code6;

    // email validaton
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //password validation
    let passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    const handleSubmit = async (event, from) => {
        setOpen(false);
        if (event.key === "Enter" || from === "onClick") {
            if (emailByLink?.email) {
                __currentUserEmail = emailByLink?.email;
                setUserEmail(emailByLink?.email);
            } else {
                __currentUserEmail = values.email;
                setUserEmail(values.email);
                setEmailCode(__currentUserEmail);
            }

            setError("");
            setStrongPassword("");
            setWeakPassword("");
            let finalpassword;
            if (
                values.email === "" ||
                values.password === "" ||
                values.confirmpassword === "" ||
                re.test(values.email) === false
            ) {
                setError("Email is mandatory!");
                setErrorPassword("Password is mandatory!");
                setErrorConfirmPassword("Confirm Password is mandatory!");
                setErrorInvalidEmail("Email address is invalid.");
                return;
            }

            if (values.password === values.confirmpassword) {
                finalpassword = values.password;
                setMatchPassword("");
            } else {
                setOpen(true);
                setMatchPassword("Confirm password - passwords do not match.");
                return;
            }

            let regex =
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
            if (regex.test(finalpassword)) {
                setStrongPassword("Password is strong.");
            } else {
                setWeakPassword(
                    "Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter."
                );
                return;
            }

            setLoader(true);
            setProgressLoading(true);
            let userExists;

            if (!userExistsData) {
                userExists = "continue signup"
                setUserExistsData(userExists);
                if (userExists === "continue signup") {
                    try {

                        setLoader(false);
                        setProgressLoading(false);
                        setProgress(0);
                        setVerificationCodeSent(true);
                        setOpen(true);
                        setRecievedCode(true);
                    } catch (err) {
                        setLoader(false);
                        setProgressLoading(false);
                        setProgress(0);
                        setError(err?.message);
                        setOpen(true);
                        setUserExistsData('')
                    }
                } else {
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                    setError(userExists);
                    setOpen(true);
                    setUserExistsData('')
                }
            } else {
                if (
                    userExistsData === "continue signup"
                ) {
                    try {

                        setLoader(false);
                        setProgressLoading(false);
                        setProgress(0);
                        setVerificationCodeSent(true);
                        setOpen(true);
                        setRecievedCode(true);
                        setUserExistsData('')
                    } catch (err) {
                        setLoader(false);
                        setProgressLoading(false);
                        setProgress(0);
                        setError(err?.message);
                        setOpen(true);
                        setUserExistsData('')
                    }
                } else {
                    setLoader(false);
                    setProgressLoading(false);
                    setProgress(0);
                    setError(userExistsData);
                    setOpen(true);
                    setUserExistsData('')
                }
            }
        }
        setErrorPassword("");
        setErrorConfirmPassword("");
        setErrorInvalidEmail("");
        setUserExists(false);
        return;
    };

    const handleConfirmEmailSubmit = async (event, from) => {
        if (event.key === "Enter" || from === "onClick") {
            if (fullConfirmationCode === "" || fullConfirmationCode === undefined) {
                setError("Verification code can't be empty.");
                return;
            } else {
                setError("");
            }

            if (fullConfirmationCode?.length < 6) {
                setError("Verification Code must be 6 digits long.");
                return;
            } else {
                setError("");
            }

            setLoader(true);
            setProgressLoading(true);
            try {
                if (emailByLink?.email) {
                    __currentUserEmail = emailByLink?.email;
                    handleChange("email");
                } else {
                    __currentUserEmail = emailCode;
                    handleChange("email");
                }

                if (__currentUserEmail === "") {
                    __currentUserEmail = values.email ? values.email : currentEmail;
                }

                try {

                } catch (error) {
                    setProgress(0);
                    setLoader(false);
                    setProgressLoading(false);
                    setOpen(true);
                    setError(error.message);
                    return;
                }
            } catch (err) {
                setProgress(0);
                setLoader(false);
                setProgressLoading(false);
                setOpen(true);
                setError(err.message);
                return;
            }
            setError("");
        }
    };

    const deviceTokenVerify = async () => {

    };

    const handleLogIn = async (event, from) => {
        if (event.key === "Enter" || from === "onClick") {
            if (
                values.email === "" ||
                values.password === "" ||
                re.test(values.email) === false
            ) {
                setError("Email is mandatory!");
                setErrorPassword("Password is mandatory!");
                setErrorInvalidEmail("Email address is invalid.");
                return;
            }

            setLoader(true);
            setProgressLoading(true);

            try {
                let access_token;
                axios.post(
                    `${process.env.REACT_APP_API_URI}auth/signin/`,
                    { email: values.email, password: values.password }
                )
                    .then(res => {
                        access_token = res?.data?.data?.token;
                        localStorage.setItem("accessToken", access_token);
                    })

                const user = "await Auth.signIn(values.email, values.password)";
                var idToken = user["signInUserSession"]["idToken"]["jwtToken"];
                var refresh_token = user["signInUserSession"]["refreshToken"]["token"];
                localStorage.setItem("idToken", idToken);
                localStorage.setItem("refreshToken", refresh_token);
                localStorage.setItem("flow", "hospital");
                setisLogin(true);
                setLoginSuccess(true);
                setFailureLogin(false);
                setOpen(true);
                setProgress(0);
                setLoader(false);
                setProgressLoading(false);
                deviceTokenVerify();
            } catch (error) {
                setFailureLogin(true);
                setLoginSuccess(false);
                setError(error.message);
                setProgress(0);
                setLoader(false);
                setProgressLoading(false);
                setOpen(true);
            }
            setError("");
            setErrorPassword("");
            setErrorInvalidEmail("");
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
        setOpen1(false);
        setSignupResendCode(false);
        setError("");
        setMatchPassword("");
        setSuccess("");
        setFailure(false);
        setUserExists(false);
        setFailureLogin(false);
        setLoginSuccess(false);
        setRegisterSuccess(false);
        setVerificationCodeSent(false);
    };

    useEffect(() => {
        let timer;
        const progressFunc = () => {
            timer = setInterval(() => {
                setProgress((prevProgress) =>
                    prevProgress >= 100 ? 0 : prevProgress + 5
                );
            }, 182.7);
        };

        if (progressLoading) {
            progressFunc();
        }

        return () => {
            clearInterval(timer);
        };
    }, [progressLoading]);

    const recoveryEmail = sessionStorage.getItem("recoveryEmail");
    const currentEmail = sessionStorage.getItem("email");
    const resetPassword = sessionStorage.getItem("finalpassword");

    const handleFocusEmail = async (params) => {
        if (params === "signup") {
            const res = await checkEmailAlreadyExists();
            setUserExistsData(res);
        }
        setFocusedEmail(true);
    };

    const handlePasswordFocus = (e) => {
        setFocusedPassword(true);
    };

    const handleConfirmPasswordFocus = (e) => {
        setFocusedConfirmPassword(true);
    };

    const handleFocusSignUpVerificationCode = (e) => {
        setFocusedSignUpVerificationCode(true);
    };

    return (
        <>
            {
                (!token || isLogin) ?
                    <SignupGrid style={{ padding: !matches ? "0px 39px 40px" : "20px 20px 40px" }} item className="doctor-signup">
                        {recievedCode ? (
                            <VerifySignUp matches={matches} navigate={navigate} userEmail={userEmail} setRecievedCode={setRecievedCode} confirmEmailCode={confirmEmailCode} focusChangeKeyDown={focusChangeKeyDown} handleConfirmationCode={handleConfirmationCode} handleFocusSignUpVerificationCode={handleFocusSignUpVerificationCode} onlyNumbers={onlyNumbers} code1Ref={code1Ref} code2Ref={code2Ref} code3Ref={code3Ref} code4Ref={code4Ref} code5Ref={code5Ref} code6Ref={code6Ref} error={error} fullConfirmationCode={fullConfirmationCode} handleClose={handleClose} focusedSignUpVerificationCode={focusedSignUpVerificationCode} progress={progress} loader={loader} handleConfirmEmailSubmit={handleConfirmEmailSubmit} confirmBtnFocus={confirmBtnFocus} Alert={Alert} open={open} />
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column" }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2.5,
                                        borderRadius: "6px",
                                        mt: !matches ? 5 : 2.5,
                                    }}
                                >
                                    <Box>
                                        <InputLabel sx={{ py: 0.5 }}>
                                            Email ID<span style={{ color: "red" }}>*</span>
                                        </InputLabel>
                                        <TextField
                                            sx={{
                                                borderRadius: 1,
                                                color: "var(--clr-blue-footer)",
                                                fontSize: "14px",
                                            }}
                                            InputProps={{
                                                sx: {
                                                    ".MuiOutlinedInput-input": {
                                                        padding: "10.5px 14px",
                                                    }
                                                },
                                            }}
                                            size="small"
                                            disableUnderline
                                            id="outlined-adornment-password"
                                            type="email"
                                            inputMode="email"
                                            autoComplete="off"
                                            // value={values.email}
                                            disabled={props.pageType === "Forgot Password"}
                                            defaultValue={
                                                location.state?.values?.email ||
                                                values.email ||
                                                (props.pageType !== "Register" &&
                                                    props.pageType !== "Login"
                                                    ? currentEmail
                                                    : "")
                                            }
                                            error={values.email === "" && error}
                                            onChange={handleChange("email")}
                                            onKeyDown={
                                                (props.pageType === "SignUp" && handleSubmit) ||
                                                (props.pageType === "LogIn" && handleLogIn)
                                            }
                                            placeholder="Email"
                                            fullWidth
                                            onBlur={() => {
                                                (props.pageType === "SignUp" && handleFocusEmail("signup")) ||
                                                    (props.pageType === "LogIn" && handleFocusEmail("login"))
                                            }}
                                        />
                                        {values.email === "" && focusedEmail === true && (
                                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                Email is mandatory!
                                            </FormHelperText>
                                        )}
                                        {values.email === "" && focusedEmail !== true && (
                                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                {error}
                                            </FormHelperText>
                                        )}
                                        {re.test(values.email) === false &&
                                            values.email !== "" &&
                                            focusedEmail === true && (
                                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                    Enter a valid Email Address.
                                                </FormHelperText>
                                            )}
                                        {re.test(values.email) === false &&
                                            values.email !== "" &&
                                            focusedEmail !== true && (
                                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                    {errorInvalidEmail}
                                                </FormHelperText>
                                            )}
                                    </Box>
                                    <Box>
                                        <InputLabel sx={{ py: 0.5 }}>
                                            Password <span style={{ color: "red" }}>*</span>
                                        </InputLabel>
                                        <TextField
                                            sx={{
                                                borderRadius: 1,
                                                color: "var(--clr-blue-footer)",
                                                fontSize: "14px",
                                            }}
                                            InputProps={{
                                                sx: {
                                                    ".MuiOutlinedInput-input": {
                                                        padding: "10.5px 14px",
                                                    }
                                                },
                                                endAdornment: (
                                                    <InputAdornment sx={{ mr: 0.5 }} position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword ? (
                                                                <VisibilityOff
                                                                    sx={{ color: "var(--clr-blue-footer)" }}
                                                                />
                                                            ) : (
                                                                <Visibility
                                                                    sx={{ color: "var(--clr-blue-footer)" }}
                                                                />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            size="small"
                                            disableUnderline
                                            fullWidth
                                            error={values.password === "" && errorPassword}
                                            defaultValue={
                                                resetPassword ? resetPassword : values.password
                                            }
                                            onChange={handleChange("password")}
                                            onKeyDown={
                                                (props.pageType === "SignUp" &&
                                                    handleSubmit) ||
                                                (props.pageType === "LogIn" && handleLogIn)
                                            }
                                            placeholder="Password"
                                            type={values.showPassword ? "text" : "password"}
                                            onBlur={handlePasswordFocus}
                                        />
                                        {values.password === "" && focusedPassword === true && (
                                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                Password is mandatory!
                                            </FormHelperText>
                                        )}
                                        {values.password === "" && focusedPassword !== true && (
                                            <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                {errorPassword}
                                            </FormHelperText>
                                        )}
                                        {props.pageType !== "LogIn" &&
                                            passwordRegex.test(values.password) === true && (
                                                <FormHelperText sx={{ color: "green", mt: 0 }}>
                                                    Password is strong.
                                                </FormHelperText>
                                            )}
                                        {props.pageType !== "LogIn" &&
                                            values.password !== "" &&
                                            focusedPassword === true &&
                                            passwordRegex.test(values.password) === false && (
                                                <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                    Password must be at least 8 characters with at least
                                                    1 special character 1 digit and 1 Capital Letter.
                                                </FormHelperText>
                                            )}

                                        {props.pageType === "LogIn" && (
                                            <Box
                                                sx={{
                                                    textAlign: "right",
                                                    textDecoration: "underline",
                                                    my: 1,
                                                }}
                                            >
                                                <Button variant="text">
                                                    <Typography
                                                        sx={{
                                                            color: "var(--clr-blue-footer)",
                                                            fontWeight: 600,
                                                        }}
                                                        variant="subtitle2"
                                                    >
                                                        Forgot Password?
                                                    </Typography>
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                    {props.pageType === "LogIn" || (
                                        <Box>
                                            <InputLabel sx={{ py: 0.5 }}>
                                                Confirm Password
                                                <span style={{ color: "red" }}>*</span>
                                            </InputLabel>
                                            <TextField
                                                sx={{ borderRadius: 1, fontSize: "14px" }}
                                                InputProps={{
                                                    sx: {
                                                        ".MuiOutlinedInput-input": {
                                                            padding: "10.5px 14px",
                                                        }
                                                    },
                                                    endAdornment: (
                                                        <InputAdornment sx={{ mr: 0.5 }} position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowConfirmPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {values.showConfirmPassword ? (
                                                                    <VisibilityOff
                                                                        sx={{ color: "var(--clr-blue-footer)" }}
                                                                    />
                                                                ) : (
                                                                    <Visibility
                                                                        sx={{ color: "var(--clr-blue-footer)" }}
                                                                    />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                size="small"
                                                disableUnderline
                                                fullWidth
                                                defaultValue={
                                                    resetPassword
                                                        ? resetPassword
                                                        : values.confirmpassword
                                                }
                                                error={
                                                    values.confirmpassword === "" &&
                                                    errorConfirmPassword
                                                }
                                                onChange={handleChange("confirmpassword")}
                                                onKeyDown={props.pageType === "SignUp" && handleSubmit}
                                                placeholder="Confirm Password"
                                                type={
                                                    values.showConfirmPassword ? "text" : "password"
                                                }
                                                endAdornment={
                                                    <InputAdornment sx={{ mr: 0.5 }} position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowConfirmPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showConfirmPassword ? (
                                                                <VisibilityOff
                                                                    sx={{ color: "var(--clr-blue-footer)" }}
                                                                />
                                                            ) : (
                                                                <Visibility
                                                                    sx={{ color: "var(--clr-blue-footer)" }}
                                                                />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                onBlur={handleConfirmPasswordFocus}
                                            />
                                            {values.confirmpassword === "" &&
                                                focusedConfirmPassword === true && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        Confirm Password is mandatory!
                                                    </FormHelperText>
                                                )}
                                            {values.confirmpassword === "" &&
                                                focusedConfirmPassword !== true && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        {errorConfirmPassword}
                                                    </FormHelperText>
                                                )}
                                            {values.confirmpassword !== "" &&
                                                values.confirmpassword !== "" &&
                                                values.password !== values.confirmpassword &&
                                                focusedConfirmPassword === true && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        Password & Confirm password didn't match
                                                    </FormHelperText>
                                                )}
                                            {passwordRegex.test(values.confirmpassword) ===
                                                true && (
                                                    <FormHelperText sx={{ color: "green", mt: 0 }}>
                                                        {values.confirmpassword !== "" &&
                                                            values.confirmpassword !== "" &&
                                                            values.password !== values.confirmpassword
                                                            ? ""
                                                            : "Password is strong."}
                                                    </FormHelperText>
                                                )}
                                            {values.confirmpassword !== "" &&
                                                passwordRegex.test(values.confirmpassword) ===
                                                false &&
                                                focusedConfirmPassword === true && (
                                                    <FormHelperText sx={{ color: "red", mt: 0 }}>
                                                        {values.confirmpassword !== "" &&
                                                            values.confirmpassword !== "" &&
                                                            focusedConfirmPassword === true &&
                                                            values.password !== values.confirmpassword
                                                            ? ""
                                                            : "Password must be at least 8 characters with at least 1 special character 1 digit and 1 Capital Letter."}
                                                    </FormHelperText>
                                                )}
                                        </Box>
                                    )
                                    }
                                    {props.pageType === "LogIn" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={(event) => handleLogIn(event, "onClick")}
                                            sx={{
                                                p: 1,
                                                my: 2,
                                                borderRadius: 16,
                                                width: { xs: 250, md: 350 },
                                                m: "auto",
                                            }}
                                        >
                                            {loader ? (
                                                <CircularProgress
                                                    size={25}
                                                    sx={{ color: "white" }}
                                                    variant="determinate"
                                                    value={progress}
                                                />
                                            ) : (
                                                "Log In"
                                            )}
                                        </Button>
                                    )}
                                    {props.pageType === "SignUp" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            onClick={(event) => handleSubmit(event, "onClick")}
                                            sx={{
                                                p: 1,
                                                my: 3,
                                                borderRadius: 16,
                                                width: { xs: 250, md: 350 },
                                                m: "auto",
                                            }}
                                        >
                                            {loader ? (
                                                <CircularProgress
                                                    size={25}
                                                    sx={{ color: "white" }}
                                                    variant="determinate"
                                                    value={progress}
                                                />
                                            ) : (
                                                "Sign Up"
                                            )}
                                        </Button>
                                    )}
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    {(props.pageType === "SignUp") && (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                component="p"
                                                sx={{ color: "#333333", fontSize: "1rem" }}
                                            >
                                                Already have an Account?
                                            </Typography>
                                            <Button
                                                variant="text"
                                                onClick={() => navigate("/login")}
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: "1rem",
                                                    textDecoration: "underline",
                                                }}
                                            >
                                                Sign In
                                            </Button>
                                        </Box>
                                    )}
                                    {(props.pageType === "LogIn") && (
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                                    )}
                                </Box>
                            </Box>
                        )}
                    </SignupGrid >
                    :
                    <Navigate to="/recruiters-login" />
            }
        </>

    );
};

export default SingupForm;