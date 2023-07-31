import { Typography } from '@mui/material';
import React from 'react';

const TypographyParagraph = (props) => {
  return (
    <Typography
      variant="body1"
      component="p"
      style={{

      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
};

export default TypographyParagraph;