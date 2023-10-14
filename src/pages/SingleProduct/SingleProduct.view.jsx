/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductBody from './Components/ProductBody'
import AdditionalDetailsTab from './Components/AdditionalDetailsTab'
import RelatedProducts from './Components/RelatedProducts'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function SingleProduct() {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}product/single/${productId}`).then(res => {
            if (res.data.success) {
                setProduct(res.data.data)
            }
        })
    }, [])

    return (
        <Box sx={{
            margin: "2rem 6rem"
        }}>
            <ProductBody item={product} />
            <AdditionalDetailsTab description={product?.description} />
            <RelatedProducts />
        </Box>
    )
}

export default SingleProduct