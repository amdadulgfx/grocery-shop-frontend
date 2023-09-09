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
        // Define the URL of the API
        const apiUrl = 'http://localhost:5000/api/v1/product/';

        // Use Axios to fetch data from the API
        axios.get(apiUrl)
            .then((response) => {
                // Set the fetched data in the state
                setProducts(response?.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [update]);

    const handleDelete = (productID) => {
        setSelectedProduct(productID);
        setDeleteConfirmationOpen(true);
    };
    console.log("selected", selectedProduct)

    const confirmDelete = () => {
        setDeleteConfirmationOpen(false);
        axios.delete(`http://localhost:5000/api/v1/product/update/${selectedProduct}`)
            .then((response) => {
                console.log('Subcategory deleted successfully', response.data);
                setUpdate((prev) => !prev);
            })
            .catch((error) => {
                console.error('Error deleting subcategory', error);
            });
    };

    console.log('Products:', products);

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
                )
            }

            {/* Delete Confirmation Dialog */}
            {deleteConfirmationOpen && (
                <DeleteConfirmationDialog deleteConfirmationOpen={deleteConfirmationOpen} setDeleteConfirmationOpen={setDeleteConfirmationOpen} confirmDelete={confirmDelete} deleteTitle={"Category"} />
            )}
        </Container>
    );
};

export default AdminProductsUpdateDeleteGetList;