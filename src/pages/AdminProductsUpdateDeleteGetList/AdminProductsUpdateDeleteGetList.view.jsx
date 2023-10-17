import { Box, Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GellAllProducts from './Components/GellAllProducts.view';
import { DeleteConfirmationDialog } from '../../CustomTags';
import UpdateProduct from './Components/UpdateProduct.view';

const AdminProductsUpdateDeleteGetList = () => {
    const [updateMode, setUpdateMode] = useState(false);
    const [products, setProducts] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [update, setUpdate] = useState(false);

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setUpdateMode(true);
    };

    const handleCancel = () => {
        setUpdateMode(false);
    };

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URI}product/`;
        axios.get(apiUrl)
            .then((response) => setProducts(response?.data?.data))
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [update]);

    const handleDelete = (productID) => {
        setSelectedProduct(productID);
        setDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        setDeleteConfirmationOpen(false);
        axios.delete(`${process.env.REACT_APP_API_URI}product/${selectedProduct}`)
            .then((response) => {
                const newProducts = products?.filter(product => product?._id !== selectedProduct);
                setProducts(newProducts);
            })
            .catch((error) => console.error('Error deleting subcategory', error));
    };

    return (
        <Container sx={{ pt: 3, pb: 5 }}>
            {!updateMode ? (
                <Grid
                    container
                    rowSpacing={8}
                    columnSpacing={2}
                >
                    {products.map((item) => (
                        <Grid key={item.productCode} item xs={12} sm={6} md={3}>
                            <GellAllProducts product={item} handleUpdate={handleUpdate} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 1 }}>
                                <Button variant="contained" color="primary" onClick={() => handleUpdate(item)}>
                                    Update
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(item?._id)}>
                                    Delete
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box>
                    <UpdateProduct product={selectedProduct} handleCancel={handleCancel} setUpdateMode={setUpdateMode} setUpdate={setUpdate} />
                </Box>
            )}

            {deleteConfirmationOpen && (
                <DeleteConfirmationDialog deleteConfirmationOpen={deleteConfirmationOpen} setDeleteConfirmationOpen={setDeleteConfirmationOpen} confirmDelete={confirmDelete} deleteTitle={"Product"} />
            )}
        </Container>
    );
};

export default AdminProductsUpdateDeleteGetList;