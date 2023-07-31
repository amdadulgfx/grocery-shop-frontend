import React from "react";
import TextField from "@mui/material/TextField";

const TextFieldOutLine = (props) => {
  return (
    <TextField
      disableUnderline
      type="text"
      inputMode="text"
      autoComplete="off"
      fullWidth
      sx={{
        color: "var(--clr-blue-footer)",
        borderRadius: 1,
      }}
      InputProps={{
        sx: {
          ".MuiOutlinedInput-input": {
            padding: "12.5px 14px",
          },
        },
      }}
      {...props}
    />
  );
};

export default TextFieldOutLine;
