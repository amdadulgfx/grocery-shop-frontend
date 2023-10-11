import React from 'react';
import { useDeleteFromWishListMutation, useGetWishListQuery } from '../../../reduxMine/features/wishList/wishListSlice';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, CardMedia, Grid, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import FavoriteIcon from "@mui/icons-material/Favorite";
import demo from "../../../components/ProductCard/product-image.jpg";
import { CustomSnackbar } from '../../../CustomTags';
import { useNavigate } from 'react-router-dom';
import { useAddToCartMutation, useGetCartListQuery, useUpdateCartItemQuantityMutation } from '../../../reduxMine/features/cart/cartAPIs';
import { useState } from 'react';


const WishLists = () => {
    const { data: wishList } = useGetWishListQuery(undefined);
    const [deleteFromWishList] = useDeleteFromWishListMutation();
    const classes = useStyles();
    const navigate = useNavigate();
    const { data } = useGetCartListQuery(undefined);
    const [addToCart] = useAddToCartMutation();
    const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleAddToCart = (productID) => {
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
    };

    const handleDeleteFromWishList = (productId) => {
        deleteFromWishList(productId);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <Box>
            <Typography variant='h5' textAlign={"center"} sx={{my: 2}}>Wishlists</Typography>
            <Grid
                container
                rowSpacing={4}
                columnSpacing={0}
                justifyContent="start"
                alignItems="stretch"
                sx={{px: 5, py: 3}}
            >
                {wishList?.data?.map((product) => (
                    <Grid key={product?._id} item xs={12} sm={6} md={3}>
                        <Box className={classes.main}>
                            <Box className={classes.root}>
                                <Box className={classes.mediaContainer}>
                                    <Box>
                                        {product?.productId?.countInStock > 0 && (
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
                                                {product?.productId?.countInStock}
                                            </Typography>
                                        )}
                                        {product?.productId?.productPlan.length > 0 && (
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
                                                {product?.productId?.productPlan}
                                            </Typography>
                                        )}

                                    </Box>
                                    <Box>
                                        {(product?._id) && (
                                            <IconButton
                                                sx={{
                                                    border: "1px solid #00000000",
                                                    color: "red",
                                                    "&:hover": {
                                                        color: "#233A95",
                                                        border: "1px solid #233A95",
                                                    }
                                                }}
                                                onClick={() => handleDeleteFromWishList(product?._id)}
                                            >
                                                <FavoriteIcon />
                                            </IconButton>)}
                                    </Box>
                                </Box>
                                <Box>
                                    <CardMedia
                                        className={classes.media}
                                        image={product?.productId?.productPicture.length > 35 ? product?.productId?.productPicture : demo}
                                        title={"Demo_Image"}
                                    />
                                </Box>
                                <Box sx={{ pb: 2 }}>
                                    <Typography
                                        variant="subtitle1"
                                        component="h2"
                                        className={classes.title}
                                        onClick={() => navigate(`/products/${product?.productId?._id}`)}
                                    >
                                        {product?.productId?.productName}
                                    </Typography>
                                    <Box className={classes.priceContainer} sx={{ justifyContent: "space-between !important", alignItems: "center !important" }}>
                                        <Tooltip title={product?.productId?.reviewPoint?.toFixed(1)}>
                                            <Rating
                                                value={parseInt(product?.productId?.reviewPoint)}
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
                                            {product?.productId?.status}
                                        </Typography>
                                    </Box>
                                    {product?.productId?.discountPercentage > 0 ? (
                                        <Box className={classes.priceContainer}>
                                            <Typography variant="h6" className={classes.price}>
                                                ${(product?.productId?.price * (1 - product?.productId?.discountPercentage / 100))?.toFixed(2)}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                className={classes.primaryPrice}
                                            >
                                                ${product?.productId?.price?.toFixed(2)}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className={classes.rate}
                                                gutterBottom
                                            >
                                                {product?.productId?.discountPercentage > 0 ? `${product?.productId?.discountPercentage}% off` : "No discount"}
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Typography variant="h6" className={classes.price}>
                                            ${product?.productId?.price?.toFixed(2)}
                                        </Typography>
                                    )}
                                </Box>
                                <Box className={classes.addToCartBox}>
                                    <Button
                                        onClick={() => handleAddToCart(product?.productId?._id)}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ py: 0.6, borderRadius: 16, textTransform: "none", }}

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
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WishLists;


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