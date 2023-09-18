import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomBreadcumbs() {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="text.primary" href="/" onClick={handleClick} fontSize="14px">
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="text.primary"
      href="/checkout/"
      onClick={handleClick}
      fontSize="14px"
    >
      Checkout
    </Link>,
    <Typography key="3" color="inherit" fontSize="14px">
      ORDER RECEIVED
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
