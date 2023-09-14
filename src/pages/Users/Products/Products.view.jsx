import { Box, Breadcrumbs, Grid, Typography } from '@mui/material';
import React from 'react';
import { ProductCard } from '../../../components';
import { groceryItems } from './ProducsArray';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Define the URL of the API
    const apiUrl = 'http://localhost:5000/api/v1/product/';

    // Use Axios to fetch data from the API
    axios.get(apiUrl)
        .then((response) => {
            // Set the fetched data in the state
            setProducts(response?.data?.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}, []);
// console.log('Products:', products);


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
              {products.map((item) => (
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



