import { Typography } from '@mui/material';
import React from 'react';

const TypographyHeadingOne = (props) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      style={{

      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
};

export default TypographyHeadingOne;