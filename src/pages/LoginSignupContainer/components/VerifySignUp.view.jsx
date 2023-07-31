import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    InputLabel,
    TextField,
    Typography,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Snackbar from "@mui/material/Snackbar";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function VerifySignUp(props) {
    const { matches, navigate, userEmail, setRecievedCode, confirmEmailCode, focusChangeKeyDown, handleConfirmationCode, handleFocusSignUpVerificationCode, onlyNumbers, code1Ref, code2Ref, code3Ref, code4Ref, code5Ref, code6Ref, error, fullConfirmationCode, handleClose, focusedSignUpVerificationCode, progress, loader, handleConfirmEmailSubmit, confirmBtnFocus, Alert, open, } = props;
    return (
        <Box sx={{
            height: props.source !== "signup" ? "550px" : "370px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            pt: props.source !== "signup" ? 8 : 2,
        }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: !matches ? 2.5 : 0, mt: !matches ? 0 : -8, mb: !matches ? 0 : 6 }}>
                {props.source !== "signup" && (!matches ? <ChevronLeftIcon onClick={() => navigate(-1)} sx={{ cursor: "pointer" }} /> : (
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIosIcon
                            fontSize="small"
                            sx={{ color: "var(--clr-btn-primary)" }}
                        />
                    </IconButton>
                ))}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontSize: !matches ? "24px" : "18px", fontWeight: "600", color: "var(--clr-blue-footer)", textAlign: "center", mt: 0, mb: 0, ml: !matches ? "" : "0px" }}
                >
                    Verify Email
                </Typography>
            </Box>
            <Box sx={{ mt: !matches ? 0 : -4, mx: "auto" }}>
                <InputLabel sx={{ py: 0.5 }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 400 }}>
                        A six digit OTP has been sent to
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "", alignItems: "center", gap: 1.5 }}>
                        <Typography sx={{ color: "#395987", fontWeight: 600, textDecoration: "underline" }}>
                            {userEmail}
                        </Typography>
                        <ModeEditIcon onClick={() => setRecievedCode(null)} sx={{ fontSize: 15, color: "#395987", cursor: "pointer" }} />
                    </Box>
                </InputLabel>
                <Box sx={{ display: "flex", textAlign: "center", gap: 1, mt: 3 }}>
                    <TextField
                        sx={{ width: 50, display: "inline-block", borderRadius: 1 }}
                        variant="outlined"
                        disableUnderline
                        InputProps={{
                            sx: {
                                ".MuiOutlinedInput-input": {
                                    padding: '10.5px 14px',
                                    textAlign: "center",
                                },
                            }
                        }}
                        onChange={handleConfirmationCode("code1")}
                        onKeyDown={focusChangeKeyDown("code1")}
                        value={confirmEmailCode.code1}
                        inputRef={code1Ref}
                        onInput={(e) => onlyNumbers(e)}
                        inputProps={{ inputMode: 'numeric' }}
                        onBlur={handleFocusSignUpVerificationCode}
                        size="small"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                    />
                    <TextField
                        sx={{ width: 50, display: "inline-block", borderRadius: 1 }}
                        variant="outlined"
                        disableUnderline
                        InputProps={{
                            sx: {
                                ".MuiOutlinedInput-input": {
                                    padding: '10.5px 14px',
                                    textAlign: "center",
                                },
                            }
                        }}
                        onInput={(e) => onlyNumbers(e)}
                        onChange={handleConfirmationCode("code2")}
                        onKeyDown={focusChangeKeyDown("code2")}
                        value={confirmEmailCode.code2}
                        inputRef={code2Ref}
                        inputProps={{ inputMode: 'numeric' }}
                        onBlur={handleFocusSignUpVerificationCode}
                        size="small"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                    />
                    <TextField
                        sx={{ width: 50, display: "inline-block", borderRadius: 1 }}
                        variant="outlined"
                        disableUnderline
                        InputProps={{
                            sx: {
                                ".MuiOutlinedInput-input": {
                                    padding: '10.5px 14px',
                                    textAlign: "center",
                                },
                            }
                        }}
                        onInput={(e) => onlyNumbers(e)}
                        onChange={handleConfirmationCode("code3")}
                        onKeyDown={focusChangeKeyDown("code3")}
                        value={confirmEmailCode.code3}
                        inputRef={code3Ref}
                        inputProps={{ inputMode: 'numeric' }}
                        onBlur={handleFocusSignUpVerificationCode}
                        size="small"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                    />
                    <TextField
                        sx={{ width: 50, display: "inline-block", borderRadius: 1 }}
                        variant="outlined"
                        disableUnderline
                        InputProps={{
                            sx: {
                                ".MuiOutlinedInput-input": {
                                    padding: '10.5px 14px',
                                    textAlign: "center",
                                },
                            }
                        }}
                        onInput={(e) => onlyNumbers(e)}
                        onChange={handleConfirmationCode("code4")}
                        onKeyDown={focusChangeKeyDown("code4")}
                        value={confirmEmailCode.code4}
                        inputRef={code4Ref}
                        inputProps={{ inputMode: 'numeric' }}
                        onBlur={handleFocusSignUpVerificationCode}
                        size="small"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                    />
                    <TextField
                        sx={{ width: 50, display: "inline-block", borderRadius: 1 }}
                        variant="outlined"
                        disableUnderline
                        InputProps={{
                            sx: {
                                ".MuiOutlinedInput-input": {
                                    padding: '10.5px 14px',
                                    textAlign: "center",
                                },
                            }
                        }}
                        onInput={(e) => onlyNumbers(e)}
                        onChange={handleConfirmationCode("code5")}
                        onKeyDown={focusChangeKeyDown("code5")}
                        value={confirmEmailCode.code5}
                        inputRef={code5Ref}
                        inputProps={{ inputMode: 'numeric' }}
                        onBlur={handleFocusSignUpVerificationCode}
                        size="small"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                    />
                    <TextField
                        sx={{ width: 50, display: "inline-block", borderRadius: 1, }}
                        variant="outlined"
                        disableUnderline
                        InputProps={{
                            sx: {
                                ".MuiOutlinedInput-input": {
                                    padding: '10.5px 14px',
                                    textAlign: "center",
                                },
                            }
                        }}
                        onInput={(e) => onlyNumbers(e)}
                        onChange={handleConfirmationCode("code6")}
                        onKeyDown={focusChangeKeyDown("code6")}
                        value={confirmEmailCode.code6}
                        inputRef={code6Ref}
                        inputProps={{ inputMode: 'numeric' }}
                        onBlur={handleFocusSignUpVerificationCode}
                        size="small"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                    />
                </Box>
            </Box>
            {((fullConfirmationCode === "" || fullConfirmationCode === undefined)) && (
                <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                    {error}
                </FormHelperText>
            )}
            {(((fullConfirmationCode !== "") && (fullConfirmationCode?.length < 6))) && (
                <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                    {error}
                </FormHelperText>
            )}
            {((fullConfirmationCode === "" || fullConfirmationCode === undefined || confirmEmailCode?.code?.length < 6) && (focusedSignUpVerificationCode !== true)) && (
                <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                    {error}
                </FormHelperText>
            )}
            {(sessionStorage.getItem("comingFrom") === "fromForgotPassword") && (
                <FormHelperText sx={{ color: "red", mt: -2.5 }}>
                    ** Please verify your email to reset the password.
                </FormHelperText>
            )}
            {error && (
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Invalid verification code provided, please try again.
                    </Alert>
                </Snackbar>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "space-between", flexGrow: !matches ? 0 : 1, }}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 0.5 }}>
                    <Typography sx={{ fontSize: 15, color: "#6F7482", fontWeight: 400 }}>
                        Didn't receive code?
                    </Typography>
                    <Typography sx={{ fontSize: 16, color: "#395987", fontWeight: 600, textDecoration: "underline", cursor: "pointer", }}>
                        Request Again
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    type="submit"
                    ref={confirmBtnFocus}
                    onClick={(event) => handleConfirmEmailSubmit(event, "onClick")}
                    sx={{ p: 1, mt: 2, borderRadius: 16, width: 350, m: "auto" }}
                >
                    {loader ? (
                        <CircularProgress size={25} sx={{ color: "white" }} variant="determinate" value={progress} />
                    ) : (
                        "Confirm Email"
                    )}
                </Button>
            </Box>
        </Box>
    )
}

export default VerifySignUp;