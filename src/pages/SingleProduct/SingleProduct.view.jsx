import { Box } from '@mui/material'
import React from 'react'
import ProductBody from './Components/ProductBody'

function SingleProduct() {
    return (
        <Box sx={{
            margin: "2rem 6rem"
        }}>
            <ProductBody />
        </Box>
    )
}

export default SingleProduct