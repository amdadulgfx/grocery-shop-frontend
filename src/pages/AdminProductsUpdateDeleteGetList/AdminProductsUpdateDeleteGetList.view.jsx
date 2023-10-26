import { Box, Breadcrumbs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GellAllProducts from './Components/GellAllProducts.view';
import { DeleteConfirmationDialog } from '../../CustomTags';
import UpdateProduct from './Components/UpdateProduct.view';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';


const AdminProductsUpdateDeleteGetList = () => {
    const [updateMode, setUpdateMode] = useState(false);
    const [products, setProducts] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [update, setUpdate] = useState(false);
    const accessToken = localStorage.getItem('accessToken');

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setUpdateMode(true);
    };

    const handleCancel = () => {
        setUpdateMode(false);
    };

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `${accessToken}`
            }
        };
        const apiUrl = `${process.env.REACT_APP_API_URI}product/`;
        axios.get(apiUrl, config)
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
        const config = {
            headers: {
                'Authorization': `${accessToken}`
            }
        };
        axios.delete(`${process.env.REACT_APP_API_URI}product/${selectedProduct}`, config)
            .then((response) => {
                const newProducts = products?.filter(product => product?._id !== selectedProduct);
                setProducts(newProducts);
                setUpdate((prev) => !prev);
            })
            .catch((error) => console.error('Error deleting subcategory', error));
    };

    return (
        <Box>
            {!updateMode ? (
                <Box>
                    <div style={{ marginBottom: "6px" }}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />}>
                            <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                                Dashboard
                            </Typography>
                            <Typography sx={{ color: "#637381" }}>
                                Products
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: { xs: "center", md: "start" } }}>
                        Products List
                    </Typography>
                    <Box>
                        <TableContainer> 
                            <Table>
                                <TableHead sx={{ backgroundColor: "#F4F6F8" }}>
                                    <TableRow>
                                        <TableCell align="start" sx={tableHeadStyle}>Product</TableCell>
                                        <TableCell align="start" sx={tableHeadStyle}>Manufacturing Date</TableCell>
                                        <TableCell align="start" sx={tableHeadStyle}>Stock</TableCell>
                                        <TableCell align="start" sx={tableHeadStyle}>Price</TableCell>
                                        <TableCell align="center" sx={tableHeadStyle}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((item) => (
                                        <GellAllProducts key={item.productCode} product={item} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            ) : (
                <Box>
                    <UpdateProduct product={selectedProduct} handleCancel={handleCancel} setUpdateMode={setUpdateMode} setUpdate={setUpdate} />
                </Box>
            )}

            {deleteConfirmationOpen && (
                <DeleteConfirmationDialog deleteConfirmationOpen={deleteConfirmationOpen} setDeleteConfirmationOpen={setDeleteConfirmationOpen} confirmDelete={confirmDelete} deleteTitle={"Product"} />
            )}
        </Box>
    );
};

export default AdminProductsUpdateDeleteGetList;

const tableHeadStyle = {
    color: "#637381",
    fontSize: { xs: "14px", sm: "18px" },
    fontWeight: 600
};
