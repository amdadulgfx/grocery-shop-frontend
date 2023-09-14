import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Autocomplete,
} from '@mui/material';

const AdminAddSubCategory = () => {
    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null); // Change to single category
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from API
        axios.get('http://localhost:5000/api/v1/category/')
            .then((response) => {
                setCategories(response?.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories', error);
            });
    }, []);

    const handleCategoryChange = (event, value) => {
        setSelectedCategory(value);
    };

    const handleAddSubCategory = () => {
        const requestData = {
            name,
            shortDesc,
            category: selectedCategory ? selectedCategory._id : null,
        };

        axios.post('http://localhost:5000/api/v1/subCategory/add', requestData)
            .then((response) => {
                console.log('Subcategory added successfully', response.data);
                // Reset form fields
                setName('');
                setShortDesc('');
                setSelectedCategory(null);
            })
            .catch((error) => {
                console.error('Error adding subcategory', error);
            });
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                Add Subcategory
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
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" fullWidth />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSubCategory}
                    >
                        Add Subcategory
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminAddSubCategory;
