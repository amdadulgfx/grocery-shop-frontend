import { Box, Breadcrumbs, Grid, Typography } from '@mui/material';
import React from 'react';
import { ProductCard } from '../../components';
import { groceryItems } from './ProducsArray';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Products = () => {
  return (
    <Box maxWidth="lg" sx={{ mx: 5, py: 0.5, }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Typography
          variant="body2"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "#4D4D4D",
          }}
        >
          Home
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textDecoration: "none",
            color: "#4D4D4D",
          }}
        >
          Products
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2} alignContent="stretch">
        <Grid item xs={12} md={3}>
          Filter will be here
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={0}
              justifyContent="center"
              alignItems="stretch"
            >
              {groceryItems.map((item) => (
                <Grid key={item.productCode} item xs={12} sm={6} md={3}>
                  <ProductCard product={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
};

export default Products;



