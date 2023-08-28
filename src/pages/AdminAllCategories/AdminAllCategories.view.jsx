import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Container, Grid, InputLabel, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CustomTextField from '../../CustomTags/CustomTextField.view';

const AdminAllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [updatedCategory, setUpdatedCategory] = useState({
        name: '',
        shortDesc: ''
    });
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get('http://localhost:5000/api/v1/category/')
            .then((response) => {
                setCategories(response?.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories', error);
            });
    };

    const handleUpdate = (category) => {
        setSelectedCategory(category);
        setUpdatedCategory({
            name: category.name,
            shortDesc: category.shortDesc
        });
        setUpdateMode(true);
    };

    const handleCancel = () => {
        setUpdateMode(false);
        setSelectedCategory(null);
    };

    const handleUpdateSubmit = () => {
        const requestData = {
            name: updatedCategory.name,
            shortDesc: updatedCategory.shortDesc,
            products: [],
            subcategory: [],
        };

        axios.put(`http://localhost:5000/api/v1/category/update/${selectedCategory._id}`, requestData)
            .then((response) => {
                console.log('Category updated successfully', response.data);
                fetchCategories();
                setUpdateMode(false);
                setSelectedCategory(null);
            })
            .catch((error) => {
                console.error('Error updating category', error);
            });
    };

    const handleDelete = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        setDeleteConfirmationOpen(false);
        axios.delete(`http://localhost:5000/api/v1/category/${selectedCategoryId}`)
            .then((response) => {
                console.log('Category deleted successfully', response.data);
                fetchCategories();
            })
            .catch((error) => {
                console.error('Error deleting category', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    return (
        <Container maxWidth="md">
            {(updateMode && selectedCategory) ? (
                <Box mt={4}>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>Update Category</Typography>
                    {/* Update Form */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <InputLabel>Category Name</InputLabel>
                            <CustomTextField
                                name="name"
                                value={updatedCategory.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <InputLabel>Short Description</InputLabel>
                            <CustomTextField
                                name="shortDesc"
                                multiline
                                rows={3}
                                value={updatedCategory.shortDesc}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box mt={2} sx={{ display: 'flex', gap: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
                                    Update
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>Category List</Typography>
                    <Grid container spacing={2}>
                        {categories.map((category) => (
                            <Grid item xs={12} md={6} key={category._id}>
                                <Box sx={{ border: 1, p: 2 }}>
                                    <Typography variant="h6">{category.name}</Typography>
                                    <Typography variant="body1">{category.shortDesc}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Button variant="contained" color="primary" onClick={() => handleUpdate(category)}>
                                            Update
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(category._id)}>
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}


            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this category?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default AdminAllCategories;
