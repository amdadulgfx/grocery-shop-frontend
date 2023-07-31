import { TextField } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

const BorderlessTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderWidth: 0, // Remove the border
    },
    '&:hover fieldset': {
      borderWidth: 0, // Remove the border on hover
    },
    '&.Mui-focused fieldset': {
      borderWidth: 0, // Remove the border when focused
    },
  },
}));

const TextFiledBorderLess = (props) => {
  return (
    <BorderlessTextField
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

export default TextFiledBorderLess;