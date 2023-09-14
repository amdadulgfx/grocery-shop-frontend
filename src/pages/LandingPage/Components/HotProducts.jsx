import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from 'axios';
import demo from "../../../components/ProductCard/product-image.jpg";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    border: "1px solid #E3E3E3",
    borderRadius: "4px", padding: "1rem", height: "100%",
    marginBottom: "-50px",
    "&:hover": {
      border: "1px solid #B2B2B2 !important",
      borderRadius: "10px",
    },
  },
  mediaContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "5px",
  },
  media: {
    height: "180px",
    width: "auto",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  iconBox: {

  },
  title: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#4D4D4D",
    "&:hover": {
      color: "#2BBEF9",
    }
  },
  status: {
    fontSize: "0.8rem",
    margin: "0.4rem 0",
    color: "#00B853",
    fontWeight: "600",
  },
  rate: {
    fontSize: "0.9rem",
    color: "#4D4D4D",
    fontWeight: "600",
  },
  priceContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: "5px",
  },
  price: {
    fontSize: "1.3rem",
    color: "#D51243",
  },
  primaryPrice: {
    fontSize: "1rem",
    color: "#C4C4D4",
    fontWeight: "600",
    paddingBottom: "0.2rem",
    textDecoration: "line-through",
  },
  addToCartBox: {
    padding: "0 0rem 1rem",
    marginTop: "-5px"
  },
}));

const HotProducts = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [hotProducts, setHotProducts] = useState([]);
  const [singleHotProduct, setSingleHotProduct] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/product/hotProduct/")
    .then((response) => {
      setHotProducts([...response?.data?.data, ...Products], () => setSingleHotProduct(hotProducts[0]));
    })
    .catch((error) => {
      console.error('Error fetching Hot Products', error);
    });
    setSingleHotProduct(hotProducts[0]);
  }, []);

  return (
    <Box sx={{ my: 4 }}>
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
            HOT singleHotProduct FOR <span style={{ color: "#EE4246" }}>THIS WEEK</span>
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#7D888E" }}
          >
            Dont miss this opportunity at a special discount just for this week.
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={() => navigate("/shop")}
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
      <Box
        sx={{
          border: "1px solid transparent",
          borderImage: "linear-gradient(45deg, #D61343, #FFC704)",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(45deg, #D61343, #FFC704)",
          borderRadius: 16,
          p: 2,
        }}>
          <Grid container spacing={2}>
        <Grid item md={3}>
          <Box>
            <img width="100%" src={demo} alt="demo" />
          </Box>

        </Grid>
        <Grid item md={9}>
        {singleHotProduct?.discountPercentage > 0 ? (
            <Box className={classes.priceContainer}>
              <Typography variant="h6" className={classes.price}>
                ${(singleHotProduct?.price * (1 - singleHotProduct?.discountPercentage / 100))?.toFixed(2)}
              </Typography>
              <Typography
                variant="body1"
                className={classes.primaryPrice}
              >
                ${singleHotProduct?.price?.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                className={classes.rate}
                gutterBottom
              >
                {singleHotProduct?.discountPercentage > 0 ? `${singleHotProduct?.discountPercentage}% off` : "No discount"}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" className={classes.price}>
              ${singleHotProduct?.price?.toFixed(2)}
            </Typography>
          )}
        </Grid>
      </Grid>
      </Box>
      
    </Box>
  );
};

export default HotProducts;

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