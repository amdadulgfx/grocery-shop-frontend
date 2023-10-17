import React, { useState, useEffect } from "react";
import {
    Grid,
    Box,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Typography,
    Container,
    Autocomplete,
    TextField,
    Snackbar,
} from "@mui/material";
import axios from "axios";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MuiAlert from "@mui/material/Alert";
// import dayjs from 'dayjs';
import CustomTextField from "../../../CustomTags/CustomTextField.view";

const initialValues = {
    productName: "",
    brand: "",
    productPicture: [],
    description: "",
    weight: "",
    price: 0,
    countInStock: 0,
    discount: 0,
    manufacturingDate: "",
    expiredDate: "",
    status: "",
    category: "",
    subcategory: "",
    type: "",
    productCode: "",
    productPlan: "",
};

const statusOptions = ["In Stock", "Out Of Stock"];
const typeOptions = ["Recommended", "Organic"];
const productPlanOptions = ["Recommended", "Organic"];

const AdminPostAProduct = () => {
    const [values, setValues] = useState(initialValues);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URI}category/`)
            .then((response) => setCategories(response?.data?.data))
            .catch((error) => console.error("Error fetching categories", error));
    }, []);

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URI}category/subCategory/${values?.category?._id}`;
        axios
            .get(apiUrl)
            .then((response) => setSubCategories(response?.data?.data[0]?.subcategory))
            .catch((error) => console.error("Error fetching data:", error));
    }, [values?.category?._id]);
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "productPicture") {
            setValues((prevValues) => ({
                ...prevValues,
                productPicture: [...prevValues.productPicture, value],
            }));
        } else {
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };

    const handleDateChange = (name, date) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: date,
        }));
    };

    const handleCategoryChange = (event, value) => {
        setValues({ ...values, category: value });
    };

    const handleSubCategoryChange = (event, value) => {
        setValues({ ...values, subcategory: value });
    };

    const handleSubmit = async () => {
        try {
            const adminToken = localStorage.getItem("adminToken");
            const postData = {
                ...values,
                manufacturingDate: values.manufacturingDate.toISOString(),
                expiredDate: values.expiredDate.toISOString(),
                category: values?.category?._id,
                subcategory: values?.subcategory?._id,
            };

            await axios.post(
                `${process.env.REACT_APP_API_URI}product/add`,
                postData,
                {
                    headers: {
                        authorization: `${adminToken}`,
                    },
                }
            );

            showSnackbar("success", "Product added successfully");
            setValues({
                productName: "",
                brand: "",
                productPicture: null,
                description: "",
                weight: "",
                price: "",
                countInStock: "",
                discount: "",
                manufacturingDate: null,
                expiredDate: null,
                status: "",
                category: "",
                subcategory: "",
                type: "",
                productCode: "",
                productPlan: "",
            });
        } catch (error) {
            console.error("Error:", error);
            showSnackbar("error", "Failed to add product");
        }
    };

    const showSnackbar = (severity, message) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container minWidth="md">
            <Typography
                sx={{ mt: 1, mb: 1, textAlign: "center", fontSize: "20px" }}
            >
                Post A Product
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={10}>
                <Grid item xs={12} md={6}>
                    <InputLabel>Product Name</InputLabel>
                    <CustomTextField
                        name="productName"
                        value={values.productName}
                        onChange={handleChange}
                        placeholder="Enter the product name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Brand</InputLabel>
                    <CustomTextField
                        name="brand"
                        value={values.brand}
                        onChange={handleChange}
                        placeholder="Enter the brand name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Product Pictures</InputLabel>
                    <CustomTextField
                        name="productPicture"
                        // value={values.productPicture}
                        onChange={handleChange}
                        placeholder="Enter the image URL"
                    />
                    {/* <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        htmlFor="image-upload"
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            id="image-upload"
                            multiple
                            onChange={(event) => {
                                const imageFiles = Array.from(event.target.files);
                                setValues({ ...values, images: imageFiles });
                            }}
                        />
                    </Button> */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Weight (g)</InputLabel>
                    <CustomTextField
                        name="weight"
                        type="text"
                        value={values.weight}
                        onChange={handleChange}
                        placeholder="Enter the weight"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Price</InputLabel>
                    <CustomTextField
                        name="price"
                        type="text"
                        value={values.price}
                        onChange={handleChange}
                        placeholder="Enter the price"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Quantity</InputLabel>
                    <CustomTextField
                        name="countInStock"
                        type="text"
                        value={values.countInStock}
                        onChange={handleChange}
                        placeholder="Enter the image quantity"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Manufacturing Date</InputLabel>
                    <CustomTextField
                        type="date"
                        name="manufacturingDate"
                        onChange={(event) =>
                            handleDateChange("manufacturingDate", new Date(event.target.value))
                        }
                        placeholder="Enter manufacturing Date"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Expiration Date</InputLabel>
                    <CustomTextField
                        type="date"
                        name="expiredDate"
                        onChange={(event) =>
                            handleDateChange("expiredDate", new Date(event.target.value))
                        }
                        placeholder="Enter expired Date"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Category</InputLabel>
                    <Autocomplete
                        id="category-autocomplete"
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        value={values?.category}
                        onChange={handleCategoryChange}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth placeholder="Select Category" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Subcategory</InputLabel>
                    <Autocomplete
                        id="subcategory-autocomplete"
                        value={values?.subcategory}
                        options={subCategories}
                        getOptionLabel={(option) => option.name}
                        onChange={handleSubCategoryChange}
                        disabled={values?.category ? false : true}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth placeholder="Select Category" />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Discount Percentage</InputLabel>
                    <CustomTextField
                        name="discount"
                        type="text"
                        value={values.discount}
                        onChange={handleChange}
                        placeholder="Enter discount percentage"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Product Code</InputLabel>
                    <CustomTextField
                        name="productCode"
                        value={values.productCode}
                        onChange={handleChange}
                        placeholder="Enter product Code"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem disabled value="">
                            Select Status
                        </MenuItem>
                        {statusOptions.map((option) => (
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
                        displayEmpty
                    >
                        <MenuItem disabled value="">
                            Select Type
                        </MenuItem>
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
                        displayEmpty
                    >
                        <MenuItem disabled value="">
                            Select Product Plan
                        </MenuItem>
                        {productPlanOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Description</InputLabel>
                    <CustomTextField
                        name="description"
                        multiline
                        row={4}
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Enter Description"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default AdminPostAProduct;
