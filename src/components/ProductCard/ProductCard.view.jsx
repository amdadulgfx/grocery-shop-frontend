import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  media: {
    height: 200,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  price: {
    marginRight: theme.spacing(1),
  },
  discountPrice: {
    color: theme.palette.error.main,
  },
}));

const ProductCard = ({ product }) => {
  const classes = useStyles();

  const handleAddToCart = () => {
    // Implement your add to cart functionality here
    console.log('Adding to cart:', product.productName);
  };

  const handleAddToWishlist = () => {
    // Implement your add to wishlist functionality here
    console.log('Adding to wishlist:', product.productName);
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.productPicture}
        title={product.productName}
      />
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          {product.productName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          {product.discountPercentage > 0 ? `${product.discountPercentage}% off` : 'No discount'}
        </Typography>
        <div className={classes.priceContainer}>
          <Typography variant="h6" className={classes.price}>
            ${product.price.toFixed(2)}
          </Typography>
          {product.discountPercentage > 0 && (
            <Typography variant="body2" className={classes.discountPrice}>
              ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
            </Typography>
          )}
        </div>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
          {product.productPlan}
        </Typography>
        <div className={classes.priceContainer}>
          <StarIcon color="secondary" />
          <Typography variant="body2" component="span">
            {product.reviewPoint.toFixed(1)}
          </Typography>
        </div>
      </CardContent>
      <Grid container justifyContent="space-between" alignItems="center">
        <IconButton onClick={handleAddToWishlist} aria-label="add to wishlist">
          <FavoriteIcon color="secondary" />
        </IconButton>
        <IconButton onClick={handleAddToCart} aria-label="add to cart">
          <span>Add to Cart</span>
        </IconButton>
      </Grid>
    </Card>
  );
};

export default ProductCard;
