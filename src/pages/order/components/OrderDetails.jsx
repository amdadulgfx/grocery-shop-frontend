import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

const rows = [
    {
        name: "All Natural Itilian-Style Chicken Meatballs x 1",
        price: "7.25",
    },
    {
        name: "SubTotal",
        price: "7.25",
    },
    {
        name: "Shipping",
        price: "5.00 by Flat rate",
    },
    {
        name: "Payment Method",
        price: "Cash On Delivery",
    },
    {
        name: "Total",
        price: "12.25"
    },
]

export default function OrderDetails() {
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', boxShadow: 1, paddingY: '20px', paddingX: "10px", borderRadius: '10px'}}>
                <Box>
                    <Typography>Order number:</Typography>
                    <Typography>4135</Typography>
                </Box>
                <Box>
                    <Typography>Date:</Typography>
                    <Typography>{'September 12, 2023'}</Typography>
                </Box>
                <Box>
                    <Typography>Total:</Typography>
                    <Typography>$12.25</Typography>
                </Box>
                <Box>
                    <Typography>Payment method:</Typography>
                    <Typography>Cash on delivery</Typography>
                </Box>
            </Box>
            <Box sx={{marginY: '10px'}}>
                <Typography>Pay with cash upon delivery.</Typography>
            </Box>
            <Box sx={{marginTop: '10px', paddingY: "10px", fontWeight: '700'}}>
                <Typography sx={{fontSize: 18, textTransform: 'uppercase', fontWeight: '600'}}>ORDER DETAILS</Typography>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontSize: 16, textTransform: 'uppercase', fontWeight: '600'}}>Product</TableCell>
                            <TableCell align="left" sx={{borderLeft: 1, borderColor: 'rgba(224, 224, 224, 1)',fontSize: 16, textTransform: 'uppercase', fontWeight: '600'}}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{borderRight: 1, borderColor: 'rgba(224, 224, 224, 1)'}}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="left" >{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}
