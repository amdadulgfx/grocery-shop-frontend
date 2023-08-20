import React, { useState } from "react";
import {
    Grid,
    Box,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Typography,
} from "@mui/material";
import axios from "axios";
import CustomTextField from "../../CustomTags/CustomTextField.view";

const initialValues = {
    title: "",
    brand: "",
    images: "",
    description: "",
    weight: "",
    price: "",
    quantity: "",
    discount: "",
    production: "",
    expired: "",
    status: "",
    category: "",
    subcategory: "",
    discountPercentage: "",
    type: "",
    productCode: "",
    productPlan: "",
};

const discountOptions = ["Active"];
const statusOptions = ["In Stock", "Out Of Stock"];
const typeOptions = ["Recommended", "Organic"];
const productPlanOptions = ["Recommended", "Organic"];

const AdminPostAProduct = () => {
    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            // Access the JWT token from local storage
            const adminToken = localStorage.getItem("adminToken");
            console.log("adminToken", adminToken)

            const response = await axios.post(
                "http://localhost:5000/api/v1/product/add",
                values,
                {
                    headers: {
                        authorization: `Bearer ${adminToken}`, // Add the token here
                    },
                }
            );
            // Handle success response
            console.log("Response:", response.data);
        } catch (error) {
            // Handle error
            console.error("Error:", error);
        }
    };

    return (
        <Box sx={{ px: { xs: 1.25, md: 3 } }}>
            <Typography sx={{mt: 1, mb: 1, textAlign:"center", fontSize:"20px"}}>Post A Product</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <InputLabel>Title</InputLabel>
                    <CustomTextField
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Brand</InputLabel>
                    <CustomTextField
                        name="brand"
                        value={values.brand}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Images</InputLabel>
                    <CustomTextField
                        name="images"
                        value={values.images}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputLabel>Weight (g)</InputLabel>
                    <CustomTextField
                        name="weight"
                        type="number"
                        value={values.weight}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Price</InputLabel>
                    <CustomTextField
                        name="price"
                        type="number"
                        value={values.price}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Quantity</InputLabel>
                    <CustomTextField
                        name="quantity"
                        type="number"
                        value={values.quantity}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputLabel>Production Date</InputLabel>
                    <CustomTextField
                        name="production"
                        value={values.production}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Expiration Date</InputLabel>
                    <CustomTextField
                        name="expired"
                        value={values.expired}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputLabel>Category</InputLabel>
                    <CustomTextField
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Subcategory</InputLabel>
                    <CustomTextField
                        name="subcategory"
                        value={values.subcategory}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Discount Percentage</InputLabel>
                    <CustomTextField
                        name="discountPercentage"
                        type="number"
                        value={values.discountPercentage}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <InputLabel>Product Code</InputLabel>
                    <CustomTextField
                        name="productCode"
                        value={values.productCode}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        fullWidth
                    >
                        {statusOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Discount</InputLabel>
                    <Select
                        name="discount"
                        value={values.discount}
                        onChange={handleChange}
                        fullWidth
                    >
                        {discountOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        name="type"
                        value={values.type}
                        onChange={handleChange}
                        fullWidth
                    >
                        {typeOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Product Plan</InputLabel>
                    <Select
                        name="productPlan"
                        value={values.productPlan}
                        onChange={handleChange}
                        fullWidth
                    >
                        {productPlanOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} md={12}>
                    <InputLabel>Description</InputLabel>
                    <CustomTextField
                        name="description"
                        multiline
                        row={4}
                        value={values.description}
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

export default AdminPostAProduct;


