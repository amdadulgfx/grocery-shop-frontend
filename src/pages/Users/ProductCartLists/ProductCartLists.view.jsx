import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartData } from '../../../reduxMine/features/cartSlice';
import { Typography, CircularProgress } from '@mui/material';

function ProductCartLists() {
  const cartData = useSelector((state) => state?.cart?.items);
  const cartLoading = useSelector((state) => state?.cart?.loading);
  const cartError = useSelector((state) => state?.cart?.error);
  const dispatch = useDispatch();

  console.log("fetchCartData", fetchCartData)

  useEffect(() => {
    // Dispatch the fetchCartData action when the component mounts
    dispatch(fetchCartData());
  }, [dispatch]);

  if (cartLoading === 'pending') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress /> {/* Show a loading indicator */}
      </div>
    );
  }

  if (cartError) {
    return <div>Error: {cartError}</div>;
  }

  return (
    <div>
      <Typography variant="h4">Cart Items</Typography>
      {cartData ? (
        cartData.map((item) => (
          <div key={item?._id}>
            {/* Render cart item details */}
            <Typography>{item?.productId?.productName}</Typography>
            <img src={item?.productId?.productPicture[0]} alt={item?.productId?.productName} />
          </div>
        ))
      ) : (
        <div>No items in the cart</div>
      )}
    </div>
  );
}

export default ProductCartLists;
