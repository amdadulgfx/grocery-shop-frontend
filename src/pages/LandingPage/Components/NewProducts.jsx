import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../../components';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from 'react-router-dom';

const NewProducts = () => {
  const navigate = useNavigate();
  const [bestSelling, setBestSelling] = useState([]);

  useEffect(() => {
    setBestSelling(Products)
  }, [])

  return (
    <Box sx={{ mt: 4, mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2, mx: 0.4, my: 4,
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#343541",
              fontSize: "1.3rem",
              fontWeight: "600 !important",
              mb: -1.5,
            }}
          >
            NEW PRODUCTS
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#7D888E" }}
          >
            New products with updated stocks.
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={() => navigate("/products")}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 16,
            }}
          >
            View All&nbsp;
            <ArrowRightAltIcon />
          </Button>
        </Box>
      </Box>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={0}
        justifyContent="center"
        alignItems="stretch"
      >
        {bestSelling?.map((item) => (
          <Grid key={item.productCode} item xs={12} sm={6} md={3}>
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewProducts;

const Products = [
  {
    productName: 'Apple',
    price: 2.99,
    discountPercentage: 10,
    status: 'In stock',
    productDescription: 'Fresh and juicy apples.',
    type: 'Fruits',
    manufacturingDate: '2023-08-01',
    expireDate: '2023-08-15',
    category: 'Produce',
    countInStock: 50,
    productPicture: 'https://example.com/apple.jpg',
    brand: 'Fresh Farms',
    productCode: 'APL001',
    reviewPoint: 4.5,
    productPlan: 'Organic',
    weight: '1 kg',
  },
  {
    productName: 'Banana',
    price: 1.49,
    discountPercentage: 0,
    status: 'In stock',
    productDescription: 'Ripe and delicious bananas.',
    type: 'Fruits',
    manufacturingDate: '2023-08-01',
    expireDate: '2023-08-10',
    category: 'Produce',
    countInStock: 70,
    productPicture: 'https://example.com/banana.jpg',
    brand: 'Tropical Delight',
    productCode: 'BAN001',
    reviewPoint: 4.7,
    productPlan: 'Recommended',
    weight: '500 gm',
  },
  {
    productName: 'Orange',
    price: 3.29,
    discountPercentage: 5,
    status: 'In stock',
    productDescription: 'Sweet and tangy oranges.',
    type: 'Fruits',
    manufacturingDate: '2023-08-02',
    expireDate: '2023-08-18',
    category: 'Produce',
    countInStock: 30,
    productPicture: 'https://example.com/orange.jpg',
    brand: 'Citrus Farms',
    productCode: 'ORG001',
    reviewPoint: 4.3,
    productPlan: '',
    weight: '750 gm',
  },
  {
    productName: 'Carrot',
    price: 1.25,
    discountPercentage: 0,
    status: 'In stock',
    productDescription: 'Fresh and crunchy carrots.',
    type: 'Vegetables',
    manufacturingDate: '2023-08-03',
    expireDate: '2023-08-16',
    category: 'Produce',
    countInStock: 60,
    productPicture: 'https://example.com/carrot.jpg',
    brand: 'Green Fields',
    productCode: 'CRT001',
    reviewPoint: 4.1,
    productPlan: 'Recommended',
    weight: '500 gm',
  },
  {
    productName: 'Apple',
    price: 2.99,
    discountPercentage: 10,
    status: 'In stock',
    productDescription: 'Fresh and juicy apples.',
    type: 'Fruits',
    manufacturingDate: '2023-08-01',
    expireDate: '2023-08-15',
    category: 'Produce',
    countInStock: 50,
    productPicture: 'https://example.com/apple.jpg',
    brand: 'Fresh Farms',
    productCode: 'APL001',
    reviewPoint: 4.5,
    productPlan: 'Organic',
    weight: '1 kg',
  },
  {
    productName: 'Banana',
    price: 1.49,
    discountPercentage: 0,
    status: 'In stock',
    productDescription: 'Ripe and delicious bananas.',
    type: 'Fruits',
    manufacturingDate: '2023-08-01',
    expireDate: '2023-08-10',
    category: 'Produce',
    countInStock: 70,
    productPicture: 'https://example.com/banana.jpg',
    brand: 'Tropical Delight',
    productCode: 'BAN001',
    reviewPoint: 4.7,
    productPlan: 'Recommended',
    weight: '500 gm',
  },
  {
    productName: 'Orange',
    price: 3.29,
    discountPercentage: 5,
    status: 'In stock',
    productDescription: 'Sweet and tangy oranges.',
    type: 'Fruits',
    manufacturingDate: '2023-08-02',
    expireDate: '2023-08-18',
    category: 'Produce',
    countInStock: 30,
    productPicture: 'https://example.com/orange.jpg',
    brand: 'Citrus Farms',
    productCode: 'ORG001',
    reviewPoint: 4.3,
    productPlan: '',
    weight: '750 gm',
  },
  {
    productName: 'Carrot',
    price: 1.25,
    discountPercentage: 0,
    status: 'In stock',
    productDescription: 'Fresh and crunchy carrots.',
    type: 'Vegetables',
    manufacturingDate: '2023-08-03',
    expireDate: '2023-08-16',
    category: 'Produce',
    countInStock: 60,
    productPicture: 'https://example.com/carrot.jpg',
    brand: 'Green Fields',
    productCode: 'CRT001',
    reviewPoint: 4.1,
    productPlan: 'Recommended',
    weight: '500 gm',
  },
]