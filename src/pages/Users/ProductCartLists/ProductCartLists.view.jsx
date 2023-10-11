import React from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import { useDeleteItemFromCartMutation, useGetCartListQuery, useUpdateCartItemQuantityMutation } from '../../../reduxMine/features/cart/cartAPIs';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductCartLists = () => {
  const { data} = useGetCartListQuery(undefined);
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  const [updateCartItemQuantity] = useUpdateCartItemQuantityMutation();

  const handleDeleteItem = (productID) => {
    if (productID) {
      deleteItemFromCart(productID);
    }
  }

  const handleUpdateQuatity = (ProductID, name) => {
    const existingProduct = data?.data?.find((product) => product._id === ProductID);

    let option = {
      productId: ProductID,
      quantity: existingProduct?.quantity
    };

    if (existingProduct && name === "Remove") {
      if (option?.quantity > 1) {
        option.quantity = option?.quantity - 1;
        updateCartItemQuantity(option);
      };
    };

    if (existingProduct && name === "Add") {
      if (option?.quantity > 0) {
        option.quantity = option?.quantity + 1;
        updateCartItemQuantity(option);
      };
    }
  };

  return (
    <div>
      <Typography variant="h4">Cart Items</Typography>
      {data?.data ? (
        data?.data?.map((item) => (
          <div key={item?._id}>
            <Box sx={{ display: "flex" }}>
              <Box>
                <img src={item?.productId?.productPicture[0]} alt={item?.productId?.productName} style={{ width: "40px", height: "40px" }} />
              </Box>
              <Typography>{item?.productId?.productName}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconButton onClick={() => handleUpdateQuatity(item?._id, "Remove")}>
                  <RemoveIcon />
                </IconButton>
                <Typography>{item?.quantity}</Typography>
                <IconButton onClick={() => handleUpdateQuatity(item?._id, "Add")}>
                  <AddIcon />
                </IconButton>
              </Box>
              <IconButton onClick={() => handleDeleteItem(item?._id)} >
                <DeleteIcon />
              </IconButton>
            </Box>
          </div>
        ))
      ) : (
        <div>No items in the cart</div>
      )}
    </div>
  );
}

export default ProductCartLists;
