import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import axios from 'axios';
import demo from "../../../components/ProductCard/product-image.jpg";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  hotProductBox: {
    border: "1px solid transparent",
    borderImage: "linear-gradient(45deg, #D61343, #FFC704)",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(45deg, #D61343, #FFC704)",
    borderRadius: 16,
    p: 2,
  },
  priceContainer: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    gap: "5px",
  },
  title: {
    fontSize: "1.2rem !important",
    fontWeight: "600 !important",
    color: "333435",
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
  gradientLine: {
    width: "80%",
    height: '10px',
    background: "linear-gradient(45deg, #D61343, #FFC704)",
    borderRadius: "10px",
  },
  rate: {
    fontSize: "0.9rem",
    color: "#4D4D4D",
    fontWeight: "600",
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
  const [singleHotProduct, setSingleHotProduct] = useState({
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
  },);

  useEffect(() => {
    axios.get("http://localhost:5000/api/v1/product/hotProduct/")
      .then((response) => {
        setHotProducts([...response?.data?.data,]);
      })
      .catch((error) => {
        console.error('Error fetching Hot Products', error);
      });
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
      <Box className={classes.hotProductBox}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box>
              <img width="100%" src={demo} alt="demo" />
            </Box>

          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{p: 2}}>
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
              <Typography
                variant="h6"
                component="h2"
                className={classes.title}
                onClick={() => navigate(`/products/${singleHotProduct?._id}`)}
              >
                {singleHotProduct.productName}
              </Typography>
              <Typography
                variant="body2"
                className={classes.status}
              >
                {singleHotProduct.status}
              </Typography>
              <Box sx={{my: 1.5}} className={classes.gradientLine}></Box>
              <Typography
                variant="caption"
                sx={{ color: "#7F7C7C" }}
              >
                Offer remains till today!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

    </Box>
  );
};

export default HotProducts;