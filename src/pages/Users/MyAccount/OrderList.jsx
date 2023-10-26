import { Box, Button, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
export const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const access_token = localStorage.getItem("accessToken");
    const dataFetchedRef = useRef(false);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        axios.get(`${process.env.REACT_APP_API_URI}order`,
            {
                headers: {
                    authorization: `${access_token}`,
                },
            }
        ).then(res => {

            setOrders(res?.data?.data)
            setLoader(true)
        }).catch((err) => {
            // console.log(err.message)
        })
    }, [])
    return (
        <div>
            {loader ?
                orders.map((item, index) => {
                    return (
                        <Box sx={{ border: '1px solid #d5dbd6', margin: "15px 0", borderRadius: '2px' }}>
                            {orders.length === 0 && <Typography>No order record</Typography>}
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderBottom: '1px solid #d5dbd6', paddingY: '20px', paddingX: "10px", }}>
                                <Box>
                                    <Typography>Order number:</Typography>
                                    <Typography>4135</Typography>
                                </Box>
                                <Box>
                                    <Typography>Date:</Typography>
                                    <Typography>{`${new Date(item?.createdAt).getFullYear() + "-" + (new Date().getMonth(item?.createdAt) + 1) + "-" + new Date(item?.createdAt).getDate()}`}</Typography>
                                </Box>

                                <Box>
                                    <Typography>Status:</Typography>
                                    <Typography>{item?.orderStatus}</Typography>
                                </Box>
                                <Box>
                                    <Typography>Total:</Typography>
                                    {/* <Typography>5683546</Typography> */}
                                    <Typography>{'$' + item?.totalPrice}</Typography>
                                </Box>
                                <Box>
                                    <Button variant="contained">View</Button>
                                </Box>
                            </Box>

                            {item?.products.map((pitem, pindex) => {
                                return (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingY: '20px', paddingX: "10px", margin: '15px', border: '1px solid #d5dbd6', borderRadius: '2px' }}>
                                        <Typography>{`${pitem?.productId?.productName} x ${pitem?.quantity}`}</Typography>

                                        <img src={pitem?.productId?.productPicture[0] || pitem?.productId?.productPicture} alt={pitem?.productId?.productName} style={{ width: "40px", height: "40px" }} />
                                    </Box>
                                )
                            })}

                        </Box>
                    )
                })
                :

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress color="secondary" />
                </Box>
            }
        </div>
    )
}
