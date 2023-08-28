import React from 'react';
import {
  Box,
  Typography,
  makeStyles,
  Grid,
} from '@material-ui/core';
import SpecialOrganicAdsImage from "../../../assets/LandingPageImages/SpecialOrganicAds.jpg";
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #DD2C00',
    borderRadius: '10px',
  },
  productBox: {
    padding: '20px',
    width: '80%',
    backgroundColor: 'white',
  },
  productName: {
    fontSize: '16px',
    '&:hover': {
      color: '#DD2C00',
      cursor: 'pointer',
    },
  },
  productImage: {
    width: '70px',
    height: '70px',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  normalPrice: {
    color: 'gray',
    fontSize: '16px',
    flex: 1,
    marginRight: '10px',
    textDecoration:"line-through"
  },
  discountPrice: {
    color: '#DD2C00',
    fontSize: '16px',
  },
}));

const TrendingProductsAds = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {trendingProducts.map((product) => (
        <Box className={classes.productBox} key={product.id}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img
                src={SpecialOrganicAdsImage}
                alt={product.name}
                className={classes.productImage}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="h6"
                // component={Link}
                color="textPrimary"
                className={classes.productName}
                // to={`/products/${product.id}`} // Replace with your route
              >
                {product.name}
              </Typography>
              <Box className={classes.priceContainer}>
                <Typography className={classes.normalPrice}>
                  {product.normalPrice}
                </Typography>
                <Typography className={classes.discountPrice}>
                  {product.discountPrice}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default TrendingProductsAds;

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
  