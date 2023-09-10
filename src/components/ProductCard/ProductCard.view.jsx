import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, IconButton, Box, Rating, Button, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

import demo from "./product-image.jpg"
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

const ProductCard = ({ product }) => {
  const classes = useStyles();

  const handleAddToCart = () => {
    // Implement your add to cart functionality here
    console.log("Adding to cart:", product.productName);
  };

  const handleAddToWishlist = () => {
    // Implement your add to wishlist functionality here
    console.log("Adding to wishlist:", product.productName);
  };

  return (
    <Box className={classes.main}>
      <Box className={classes.root}>
        <Box className={classes.mediaContainer}>
          <Box>
            {product.countInStock > 0 && (
              <Typography
                variant="caption"
                sx={{
                  backgroundColor: "#2BBEF9",
                  color: "#FFFFFF",
                  padding: "0.2rem 0.8rem",
                  borderRadius: 2,
                  fontSize: "14px",
                }}
              >
                {product.countInStock}
              </Typography>
            )}
            {product.productPlan.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  backgroundColor: "#71778E",
                  color: "#FFFFFF",
                  padding: "0.2rem 0.8rem",
                  borderRadius: 2,
                  mt: 0.5,
                  mb: -2
                }}
              >
                {product.productPlan}
              </Typography>
            )}

          </Box>
          <Box>
            <IconButton
              sx={{
                border: "1px solid #00000000",
                "&:hover": {
                  color: "#233A95",
                  border: "1px solid #233A95",
                }
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <CardMedia
            className={classes.media}
            image={demo}
            title={"Demo_Image"}
          />
        </Box>
        <Box sx={{ pb: 2 }}>
          <Typography
            variant="subtitle1"
            component="h2"
            className={classes.title}
          >
            {product.productName}
          </Typography>
          <Box className={classes.priceContainer} sx={{justifyContent: "space-between !important", alignItems: "center !important"}}>
            <Tooltip title={product.reviewPoint.toFixed(1)}>
              <Rating
                value={parseInt(product.reviewPoint)}
                readOnly
                sx={{
                  fontSize: '16px',
                }}
              />
            </Tooltip>
            <Typography
              variant="body2"
              className={classes.status}
            >
              {product.status}
            </Typography>
          </Box>
          {product.discountPercentage > 0 ? (
            <Box className={classes.priceContainer}>
              <Typography variant="h6" className={classes.price}>
                ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
              </Typography>
              <Typography
                variant="body1"
                className={classes.primaryPrice}
              >
                ${product.price.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                className={classes.rate}
                gutterBottom
              >
                {product.discountPercentage > 0 ? `${product.discountPercentage}% off` : "No discount"}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" className={classes.price}>
              ${product.price.toFixed(2)}
            </Typography>
          )}
        </Box>
        <Box className={classes.addToCartBox}>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 0.6, borderRadius: 16,  textTransform: "none", }}

          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
