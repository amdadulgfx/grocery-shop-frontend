import { Box, Typography } from '@mui/material'
import React from 'react'

function ProductBody() {
    const item = {
        productName: 'Apple',
        price: 2.99,
        discountPercentage: 10,
        status: 'In stock',
        productDescription: 'Fresh and juicy apples.',
        type: 'Fruits',
        manufacturingDate: '2023-08-01',
        expireDate: '2023-08-15',
        category: 'Produce',
        countInStock: 50,
        productPicture: 'https://example.com/apple.jpg',
        brand: 'Fresh Farms',
        productCode: 'APL001',
        reviewPoint: 4.5,
        productPlan: 'Organic',
        weight: '1 kg',
    };


    return (
        <Box>
            <Typography>
                {item.productName}
            </Typography>
            <Box>
                <Typography>
                    Brands: {item.brand}
                </Typography>
                <Typography>
                    Brands: {item.brand}
                </Typography>
            </Box>
        </Box>
    )
}

export default ProductBody