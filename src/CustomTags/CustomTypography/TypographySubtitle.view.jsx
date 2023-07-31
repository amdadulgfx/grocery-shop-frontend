import { Typography } from '@mui/material';
import React from 'react';

const TypographySubtitle = (props) => {
  return (
    <Typography
      variant="subtilte1"
      component="h5"
      style={{
        // fontSize: "1rem", 
        fontWeight: "600",
      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
};

export default TypographySubtitle;