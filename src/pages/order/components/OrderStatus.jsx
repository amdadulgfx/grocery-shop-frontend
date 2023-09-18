import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function OrderStatus() {
    const [isSuccess, setIsSuccess] = useState(true)
    return (
        <Box>
            {
                isSuccess ? <Box sx={{ border: "2px dashed", borderColor: '#00b853', marginY: '20px' }}>

                    <Typography sx={{ fontSize: '22px', textAlign: 'center', padding: '3%', color: '#00b853', fontWeight: '600' }}>Thank you. Your order has been received.</Typography>
                </Box> : <Box sx={{ border: "2px dashed", borderColor: '#f20f0f', marginY: '20px' }}>

                    <Typography sx={{ fontSize: '22px', textAlign: 'center', padding: '3%', color: '#f20f0f', fontWeight: '600' }}>Sorry. Something went wrong.</Typography>
                </Box>
            }
        </Box>
    )
}
