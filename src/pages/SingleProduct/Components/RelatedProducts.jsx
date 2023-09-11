import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../../components';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const RelatedProducts = () => {
    // const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // axios.post(`${process.env.REACT_APP_API_URI}product/relatedProduct`,{
        //     categoryId : "id",
        //     pid: "123"
        // }).then(res=>{
        //     if(res.data.success){
        //         setProducts(res.data.data)
        //     }
        // })
        setProducts(productsList.slice(0, 4));
    }, [])

    return (
        <Box sx={{ my: 8 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 2, mx: 0.4, my: 4,
                }}
            >
                <Box>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: "#343541",
                            fontSize: "1.3rem",
                            fontWeight: "600 !important",
                            mb: -1.5,
                        }}
                    >
                        RELATED PRODUCTS
                    </Typography>
                </Box>
            </Box>
            <Grid
                container
                rowSpacing={4}
                columnSpacing={0}
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
            >
                {products?.map((item) => (
                    <Grid key={item.productCode} item xs={12} sm={6} md={3} >
                        <ProductCard product={item} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RelatedProducts;

const productsList = [
    {
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
        productPicture: 'https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-31-346x310.jpg',
        brand: 'Fresh Farms',
        productCode: 'APL001',
        reviewPoint: 4.5,
        productPlan: 'Organic',
        weight: '1 kg',
    },
    {
        productName: 'Banana',
        price: 1.49,
        discountPercentage: 0,
        status: 'In stock',
        productDescription: 'Ripe and delicious bananas.',
        type: 'Fruits',
        manufacturingDate: '2023-08-01',
        expireDate: '2023-08-10',
        category: 'Produce',
        countInStock: 70,
        productPicture: 'https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-48-346x310.jpg',
        brand: 'Tropical Delight',
        productCode: 'BAN001',
        reviewPoint: 4.7,
        productPlan: 'Recommended',
        weight: '500 gm',
    },
    {
        productName: 'Orange',
        price: 3.29,
        discountPercentage: 5,
        status: 'In stock',
        productDescription: 'Sweet and tangy oranges.',
        type: 'Fruits',
        manufacturingDate: '2023-08-02',
        expireDate: '2023-08-18',
        category: 'Produce',
        countInStock: 30,
        productPicture: 'https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-19-346x310.jpg',
        brand: 'Citrus Farms',
        productCode: 'ORG001',
        reviewPoint: 4.3,
        productPlan: '',
        weight: '750 gm',
    },
    {
        productName: 'Carrot',
        price: 1.25,
        discountPercentage: 0,
        status: 'In stock',
        productDescription: 'Fresh and crunchy carrots.',
        type: 'Vegetables',
        manufacturingDate: '2023-08-03',
        expireDate: '2023-08-16',
        category: 'Produce',
        countInStock: 60,
        productPicture: 'https://klbtheme.com/bacola/wp-content/uploads/2021/04/product-image-60-346x310.jpg',
        brand: 'Green Fields',
        productCode: 'CRT001',
        reviewPoint: 4.1,
        productPlan: 'Recommended',
        weight: '500 gm',
    },

]