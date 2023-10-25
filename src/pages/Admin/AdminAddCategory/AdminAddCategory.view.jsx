import React, { useState } from 'react';
import { Box, Breadcrumbs, Button, Grid, InputLabel, Typography } from '@mui/material';
import axios from 'axios';
import CustomTextField from '../../../CustomTags/CustomTextField.view';
import { Link } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';


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

        axios
            .post(`${process.env.REACT_APP_API_URI}category/add`, requestData)
            .then((response) => {
                setValues({
                    categoryName: '',
                    shortDesc: '',
                });
            })
            .catch((error) => console.error('Error adding category', error));
    };

    return (
        <Box>
            <div style={{ marginBottom: "6px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />} >
                    <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                        Dashboard
                    </Typography>
                    <Typography sx={{ color: "#637381" }}>
                        Post Category
                    </Typography>
                </Breadcrumbs>
            </div>
            <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: {xs: "center", md: "start"} }}>
                Create a new category
            </Typography>
            <Box>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sx={12} md={3.5}>
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                            Details
                        </Typography>
                        <Typography sx={{ color: "#637381", fontSize: "12px", fontWeight: 400 }}>
                            name, short description
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={12} md={8.5}>
                        <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke"}, border: { xs: "1px solid #00A76F", md: "none"}, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Category Name</InputLabel>
                                    <CustomTextField
                                        name="categoryName"
                                        value={values.categoryName}
                                        onChange={handleChange}
                                        placeholder="Enter category name"
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
                                        placeholder="Enter short description"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Box sx={{display:"flex", alignItems:"center", justifyContent:"center", mt: {xs: 1.2, md: 2}}}>
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
                                            onClick={handleSubmit}
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

export default AdminAddCategory;
