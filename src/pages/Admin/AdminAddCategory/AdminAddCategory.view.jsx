import React, { useState } from 'react';
import { Box, Button, Grid, InputLabel, Typography } from '@mui/material';
import axios from 'axios';
import CustomTextField from '../../CustomTags/CustomTextField.view';

const AdminAddCategory = () => {
    const [values, setValues] = useState({
        categoryName: '',
        shortDesc: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        const requestData = {
            name: values.categoryName,
            shortDesc: values.shortDesc,
            products: [],
            subcategory: [],
        };

        // Sending the request to the API
        axios
            .post('http://localhost:5000/api/v1/category/add', requestData)
            .then((response) => {
                // Handle successful response
                console.log('Category added successfully', response.data);

                // Clear input field values
                setValues({
                    categoryName: '',
                    shortDesc: '',
                });
            })
            .catch((error) => {
                // Handle error if needed
                console.error('Error adding category', error);
            });
    };

    return (
        <Box sx={{ px: { xs: 1.25, md: 5 } }}>
            <Typography sx={{ mt: 1, mb: 1, textAlign: 'center', fontSize: '20px' }}>
                Add Category
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <InputLabel>Category Name</InputLabel>
                    <CustomTextField
                        name="categoryName"
                        value={values.categoryName}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputLabel>Short Description</InputLabel>
                    <CustomTextField
                        name="shortDesc"
                        multiline
                        rows={3}
                        value={values.shortDesc}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminAddCategory;