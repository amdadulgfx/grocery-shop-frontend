import { Box } from '@mui/material'
import React from 'react'
import ProductBody from './Components/ProductBody'
import AdditionalDetailsTab from './Components/AdditionalDetailsTab'

function SingleProduct() {
    return (
        <Box sx={{
            margin: "2rem 6rem"
        }}>
            <ProductBody />
            <AdditionalDetailsTab />
        </Box>
    )
}

export default SingleProduct