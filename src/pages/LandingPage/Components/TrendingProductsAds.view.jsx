import React, { useEffect, useState } from 'react';

import SpecialOrganicAdsImage from "../../../assets/LandingPageImages/SpecialOrganicAds.jpg";
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';


const TrendingProductsAds = () => {

  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URI}product/`;
    axios.get(apiUrl)
      .then((response) => setTrendingProducts(response?.data?.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box>
      <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}>TRENDING PRODUCTS</Typography>
      <Box sx={root}>
        {trendingProducts.slice(2, 7).map((product) => (
          <Box sx={productBox} key={product._id}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ ...priceContainer, justifyContent: "center", pt: 1.5 }}>
                  <img
                    src={product.productPicture[0]}
                    alt={product.productName}
                    style={productImage}
                  />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  variant="h6"
                  // component={Link}
                  color="textPrimary"
                  sx={productName}
                // to={`/products/${product.id}`} // Replace with your route
                >
                  {product.productName}
                </Typography>
                <Box sx={priceContainer}>
                  <Typography sx={normalPrice}>
                    ${product.price}
                  </Typography>
                  <Typography sx={discountPrice}>
                    ${product.price - (product.discount < 1 ? 5 : product.discount)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrendingProductsAds;

const root = {
  backgroundColor: '#F5F5F5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid lightgrey',
  borderRadius: '6px',
};
const productBox = {
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: "6px"
};
const productName = {
  fontSize: '16px',
  color: "black",
  fontWeight: 550,
  '&:hover': {
    color: '#DD2C00',
    cursor: 'pointer',
    fontWeight: 550,
  },
};
const productImage = {
  width: '50px',
  height: '50px',
  borderRadius: "8px"
};
const priceContainer = {
  display: 'flex',
  alignItems: 'center',
};
const normalPrice = {
  color: 'gray',
  fontSize: '16px',
  marginRight: '10px',
  textDecoration: "line-through",
  fontWeight: 600,
};
const discountPrice = {
  color: '#DD2C00',
  fontSize: '16px',
  fontWeight: 600,
};

const trendingProducts = [
  {
    id: 1,
    name: 'Deluxe Chocolate Cake',
    normalPrice: '$39.99',
    discountPrice: '$29.99',
    image: 'path/to/product-image1.jpg',
  },
  {
    id: 2,
    name: 'Organic Fruit Basket',
    normalPrice: '$49.99',
    discountPrice: '$39.99',
    image: 'path/to/product-image2.jpg',
  },
  {
    id: 3,
    name: 'Premium Coffee Blend',
    normalPrice: '$12.99',
    discountPrice: '$9.99',
    image: 'path/to/product-image3.jpg',
  },
  {
    id: 4,
    name: 'Gourmet Cheese Selection',
    normalPrice: '$24.99',
    discountPrice: '$19.99',
    image: 'path/to/product-image4.jpg',
  },
  {
    id: 5,
    name: 'Artisan Bread Collection',
    normalPrice: '$8.99',
    discountPrice: '$6.99',
    image: 'path/to/product-image5.jpg',
  },
];
