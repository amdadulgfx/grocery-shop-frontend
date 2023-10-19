import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Card, CardContent, Container, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeleteItemFromCartMutation, useGetCartListQuery, useUpdateCartItemQuantityMutation } from '../../../reduxMine/features/cart/cartAPIs';

const ProductCartLists = () => {
  const [value, setValue] = useState('flatRate');
  const navigate = useNavigate();
  const { data } = useGetCartListQuery(undefined);
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

  const calculateSubtotal = (product) => {
    return product?.productId?.price * product?.quantity;
  };

  const calculateTotal = () => {
    return data?.data?.reduce((total, product) => total + calculateSubtotal(product), 0);
  };

  return (
    <Container>
      <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column', py: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h4" textAlign="center" fontWeight="bold">Cart</Typography>
        </Grid>
        {data?.data ? (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <Card>
                  <CardContent>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Price&nbsp;($)</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="center">Subtotal&nbsp;($)</TableCell>
                            <TableCell align="center"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {data?.data?.map((item) => (
                            <TableRow
                              key={item.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row" align="center">
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <Box>
                                    <img src={item?.productId?.productPicture[0]} alt={item?.productId?.productName} style={{ width: "40px", height: "40px" }} />
                                  </Box>
                                  <Typography>{item?.productId?.productName?.length > 20 ? <>{item?.productId?.productName?.slice(0, 19)}...</> : <>{item?.productId?.productName}</>}</Typography>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Typography>${item?.productId?.price}</Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <IconButton onClick={() => handleUpdateQuatity(item?._id, "Remove")}>
                                    <RemoveIcon />
                                  </IconButton>
                                  <Typography>{item?.quantity}</Typography>
                                  <IconButton onClick={() => handleUpdateQuatity(item?._id, "Add")}>
                                    <AddIcon />
                                  </IconButton>
                                </Box>
                              </TableCell>
                              <TableCell align="center"> <Typography>{calculateSubtotal(item)}</Typography></TableCell>
                              <TableCell align="center">
                                <IconButton onClick={() => handleDeleteItem(item?._id)} >
                                  <DeleteIcon sx={{ color: "#8B0000" }} />
                                </IconButton></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" textAlign="center" fontWeight="bold">Cart Total</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                      <Typography>Subtotal:</Typography>
                      <Typography>${calculateTotal()}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                      <Typography>Shipping:</Typography>

                      <RadioGroup
                        aria-label="gender"
                        name="gender"
                        value={value}
                        onChange={(val) => setValue(val.target.value)}
                      >
                        <FormControlLabel labelPlacement="start" value="flatRate" control={<Radio />} label={<Typography noWrap sx={{ display: 'inline-flex', fontSize: ".875rem", }}>Flat Rate <Typography style={{ color: '#d51243', fontSize: ".8125rem", marginLeft: '5px' }}> $5.00</Typography> </Typography>} />

                        <FormControlLabel labelPlacement="start" value="localPickup" noWrap control={<Radio />}
                          label={<Typography noWrap sx={{ fontSize: ".8125rem" }} >Local picup</Typography>}
                        />
                      </RadioGroup>
                      {/* <Typography>$10.00</Typography> */}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                      <Typography>Total:</Typography>
                      <Typography>${calculateTotal() +(value === 'flatRate'? 5.00: 0)}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 1.5 }}>
                      <Button variant='contained' onClick={() => navigate('/checkout',{state:{shippingValue:value,total: calculateTotal()}})}>Checkout</Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div>No items in the cart</div>
        )}
      </Grid>
    </Container>
  );
};

export default ProductCartLists;
