import React, { useState } from "react";
import { CardMedia, Typography, IconButton, Box, Rating, Button, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import demo from "./product-image.jpg"
import { makeStyles } from "@material-ui/styles";
import { CustomSnackbar } from "../../CustomTags";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation, useGetCartListQuery, useUpdateCartItemQuantityMutation } from "../../reduxMine/features/cart/cartAPIs";
import { useAddToWishListMutation, useDeleteFromWishListMutation, useGetWishListQuery } from "../../reduxMine/features/wishList/wishListSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../../reduxMine/features/authApi";

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();
  const { data } = useGetCartListQuery(undefined);
  const [addToCart] = useAddToCartMutation();
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
  const [addToWishList] = useAddToWishListMutation();
  const [deleteFromWishList] = useDeleteFromWishListMutation();
  const { data: wishList } = useGetWishListQuery(undefined);
  const user = useSelector(selectUser);

  const handleAddToCart = (productID) => {
    if(user?.email){
    const existingProduct = data?.data?.find((product) => product?.productId?._id === productID);
    const option = {
      productId: productID,
      quantity: 1
    };

    let optionUpdate = {
      productId: existingProduct?._id,
      quantity: existingProduct?.quantity
    };

    if (existingProduct) {
      optionUpdate.quantity = optionUpdate?.quantity + 1;
      updateCartItemQuantity(optionUpdate);
    } else {
      addToCart(option);
    }
  } else {
    navigate("/login")
  }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleAddToWishlist = (productId) => {
    const existingWishList = wishList?.data?.find((product) => product?.productId?._id === productId);
    if (existingWishList) {
      deleteFromWishList(existingWishList?._id);
    } else {
      addToWishList(productId);
    }
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
            {(wishList?.data?.find((wishList) => wishList?.productId?._id === product?._id)) ? (
              <IconButton
                sx={{
                  border: "1px solid #00000000",
                  color: "red",
                  "&:hover": {
                    color: "#233A95",
                    border: "1px solid #233A95",
                  }
                }}
                onClick={() => handleAddToWishlist(product?._id)}
              >
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton
                sx={{
                  border: "1px solid #00000000",
                  // color:  ? "red" : "",
                  "&:hover": {
                    color: "#233A95",
                    border: "1px solid #233A95",
                  }
                }}
                onClick={() => handleAddToWishlist(product?._id)}
              >
                <FavoriteIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box>
          <CardMedia
            className={classes.media}
            image={product.productPicture[0] || `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXa2tpVVVXd3d1MTExSUlK2trZvb29LS0tTU1Ph4eGNjY2cnJzU1NRaWlpgYGBPT0+np6fGxsavr6/AwMCGhoZqamrOzs51dXWUlJSioqJ+fn7IyMhkZGTBwcG0tLREREQ0AqeBAAAClklEQVR4nO3b63KqMBRAYUiiSbyhKIqXtu//lgcUBRTOFGGm42Z9/5oK06wyQFCDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwCmpAfz2X96hjMh2O/+vpvEXNrTNDcZ/aIAqHQwMa0EBCA2O1fZeOtBPQIEonfWxXAhro2Pe5N/IrJ6DButefL6RBr/tcEQ2ijg2elgbja6DUVxzvqxuMroHaTLMLqdlVhsbWQJ2duZ5CDuXY6BocijtLW24ztgb7+821m461gZro++pgKbrB/4J8PR`}
            title={"Demo_Image"}
          />
        </Box>
        <Box sx={{ pb: 2 }}>
          <Tooltip title={product.productName}>
            <Typography
              variant="subtitle1"
              component="h2"
              className={classes.title}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              {product.productName}
            </Typography>
          </Tooltip>
          <Box className={classes.priceContainer} sx={{ justifyContent: "space-between !important", alignItems: "center !important" }}>
            <Tooltip title={product?.reviewPoint?.toFixed(1)}>
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
                ${(product?.price * (1 - product.discountPercentage / 100))?.toFixed(2)}
              </Typography>
              <Typography
                variant="body1"
                className={classes.primaryPrice}
              >
                ${product?.price?.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                className={classes.rate}
                gutterBottom
              >
                {product.discountPercentage > 0 ? `${product?.discountPercentage}% off` : "No discount"}
              </Typography>
            </Box>
          ) : (
            <Typography variant="h6" className={classes.price}>
              ${product?.price?.toFixed(2)}
            </Typography>
          )}
        </Box>
        <Box className={classes.addToCartBox}>
          <Button
            onClick={() => handleAddToCart(product?._id)}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 0.6, px: 4, borderRadius: 16, textTransform: "none", width: "100%" }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
      {/* Snackbar component */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default ProductCard;

const useStyles = makeStyles((theme) => ({
  main: {
    position: "relative",
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
  title: {
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#4D4D4D",
    "&:hover": {
      color: "#2BBEF9",
    },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
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
    margin: "-7px 5px 13px",
    top: "98%",
    bottom: "10px",
  },
}));