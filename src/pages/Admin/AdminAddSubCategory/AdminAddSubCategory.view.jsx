import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Grid,
    TextField,
    Typography,
    Autocomplete,
    Box,
    Breadcrumbs,
    InputLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';

const AdminAddSubCategory = () => {
    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null); // Change to single category
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from API
        axios.get(`${process.env.REACT_APP_API_URI}category/`)
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

        axios.post(`${process.env.REACT_APP_API_URI}subCategory/add`, requestData)
            .then((response) => {
                setName('');
                setShortDesc('');
                setSelectedCategory(null);
            })
            .catch((error) => console.error('Error adding subcategory', error));
    };

    return (
        <Box>
            <div style={{ marginBottom: "6px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />} >
                    <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                        Dashboard
                    </Typography>
                    <Typography sx={{ color: "#637381" }}>
                        Post Subcategory
                    </Typography>
                </Breadcrumbs>
            </div>
            <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: { xs: "center", md: "start" } }}>
                Create a new subcategory
            </Typography>
            <Box>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sx={12} md={3.5}>
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                            Details
                        </Typography>
                        <Typography sx={{ color: "#637381", fontSize: "12px", fontWeight: 400 }}>
                            name, short description, category
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={12} md={8.5}>
                        <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke" }, border: { xs: "1px solid #00A76F", md: "none" }, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputLabel>Subcategory Name</InputLabel>
                                    <TextField
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                        sx={{ mb: 2 }}
                                        placeholder="Enter subcategory name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel>Short Description</InputLabel>
                                    <TextField
                                        value={shortDesc}
                                        onChange={(e) => setShortDesc(e.target.value)}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        sx={{ mb: 2 }}
                                        placeholder="Enter short description"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <InputLabel>Select Category</InputLabel>
                                    <Autocomplete
                                        id="category-autocomplete"
                                        options={categories}
                                        getOptionLabel={(option) => option.name}
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder="Select category" fullWidth />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: { xs: 1.2, md: 2 } }}>
                                        <Button
                                            sx={{
                                                borderRadius: 16,
                                                px: 3,
                                                backgroundColor: "#00A76F",
                                                color: "#FFFFFF",
                                                fontWeight: 600,
                                                "&:hover": {
                                                    borderRadius: 16,
                                                    px: 3,
                                                    backgroundColor: "#00A76F",
                                                    color: "#FFFFFF",
                                                    fontWeight: 600,
                                                }
                                            }}
                                            onClick={handleAddSubCategory}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AdminAddSubCategory;
