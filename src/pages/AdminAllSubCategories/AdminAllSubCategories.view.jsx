import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Typography,
    Autocomplete
} from '@mui/material';
import { DeleteConfirmationDialog } from '../../CustomTags';

const AdminAllSubCategories = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]); // Initialize with empty array
    const [categories, setCategories] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        fetchSubCategories();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedSubCategory) {
            setName(selectedSubCategory.name || '');
            setShortDesc(selectedSubCategory.shortDesc || '');
            setSelectedCategories(selectedSubCategory.category || []);
        }
    }, [selectedSubCategory]);

    console.log("selectedSubCategory.shortDesc", selectedSubCategory?.shortDesc)
    console.log("selectedSubCategory.category", selectedCategories)

    const fetchSubCategories = () => {
        axios.get('http://localhost:5000/api/v1/subCategory')
            .then((response) => {
                setSubCategories(response.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching subcategories', error);
            });
    };

    const fetchCategories = () => {
        axios.get('http://localhost:5000/api/v1/category/')
            .then((response) => {
                setCategories(response?.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories', error);
            });
    };

   const handleUpdate = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setName(subCategory.name);
        setShortDesc(subCategory.shortDesc);
        setSelectedCategories(subCategory.category || []);
        setUpdateMode(true);
    };

    const handleCancel = () => {
        setSelectedSubCategory(null);
        setName('');
        setShortDesc('');
        setSelectedCategories([]);
        setUpdateMode(false);
    };

    const handleUpdateSubCategory = () => {
        const requestData = {
            name,
            shortDesc,
            category: selectedCategories.map(cat => cat._id)
        };

        axios.put(`http://localhost:5000/api/v1/subCategory/update/${selectedSubCategory._id}`, requestData)
            .then((response) => {
                console.log('Subcategory updated successfully', response.data);
                fetchSubCategories();
                handleCancel();
            })
            .catch((error) => {
                console.error('Error updating subcategory', error);
            });
    };

    const handleDelete = (subCategoryId) => {
        setDeleteConfirmationOpen(true);
        setSelectedSubCategory(subCategoryId);
    };

    const confirmDelete = () => {
        setDeleteConfirmationOpen(false);
        axios.delete(`http://localhost:5000/api/v1/subCategory/${selectedSubCategory}`)
            .then((response) => {
                console.log('Subcategory deleted successfully', response.data);
                fetchSubCategories();
            })
            .catch((error) => {
                console.error('Error deleting subcategory', error);
            });
    };

    const handleCategoryChange = (event, newValue) => {
        console.log("new value", newValue)
        setSelectedCategories(newValue);
    };
    console.log("selectedCa", selectedCategories)

    return (
        <Container maxWidth="md">
            {(updateMode && selectedSubCategory) ? (
                // Update Form
                <Box mt={4}>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                        Update Subcategory
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Short Description"
                                value={shortDesc}
                                onChange={(e) => setShortDesc(e.target.value)}
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                id="category-autocomplete"
                                multiple
                                value={selectedCategories} // Value should be the selectedCategories array
                                options={categories}
                                getOptionLabel={(option) => option.name}
                                onChange={handleCategoryChange}
                                renderInput={(params) => (
                                    <TextField {...params} label="Category" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box mt={2} sx={{ display: 'flex', gap: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleCancel}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleUpdateSubCategory}>
                                    Update
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ) : (
                // Subcategory List
                <Box>
                    <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                        Subcategory List
                    </Typography>
                    <Grid container spacing={2}>
                        {subCategories.map((subCategory) => (
                            <Grid item xs={12} md={6} key={subCategory._id}>
                                <Box sx={{ border: 1, p: 2 }}>
                                    <Typography variant="h6">{subCategory.name}</Typography>
                                    <Typography variant="body2">
                                        Category: {subCategory.category.map(cat => cat.name).join(', ')}
                                    </Typography>
                                    <Typography variant="body2">
                                        Short Description: {subCategory.shortDesc}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                        <Button variant="contained" color="primary" onClick={() => handleUpdate(subCategory)}>
                                            Update
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleDelete(subCategory._id)}>
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
            {deleteConfirmationOpen && (
                <DeleteConfirmationDialog deleteConfirmationOpen={deleteConfirmationOpen} setDeleteConfirmationOpen={setDeleteConfirmationOpen}  confirmDelete={confirmDelete} deleteTitle={"Subcategory"} />
            )}
        </Container>
    );
};

export default AdminAllSubCategories;
