import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container sx={{ textAlign: 'center', my: {xs: "10vh", md: "30vh"} }}>
      <Typography sx={{fontSize:{xs: "28px", md: "36px"}, fontWeight:{xs: 800, md: 800}, color: "red", my:{xs: 1, md: 2}}} >
        404 - Page Not Found
      </Typography>
      <Typography sx={{fontSize:{xs: "18px", md: "28px"}, fontWeight:{xs: 500, md: 500}, color: "red", mb:{xs: 1, md: 2}}} >
        The page you are looking for does not exist.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem' }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
