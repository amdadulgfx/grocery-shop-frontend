import React, { useState, useEffect } from "react";
import {
    Grid,
    Box,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Typography,
    Autocomplete,
    TextField,
    Snackbar,
    Breadcrumbs,
} from "@mui/material";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import CustomTextField from "../../../CustomTags/CustomTextField.view";
import { Link } from "react-router-dom";
import CircleIcon from '@mui/icons-material/Circle';

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
    category: null,
    subcategory: null,
    type: "",
    productCode: "",
    productPlan: "",
};

const statusOptions = ["In Stock", "Out Of Stock"];
const typeOptions = ["Recommended", "Organic"];
const productPlanOptions = ["Recommended", "Organic"];

const UpdateProduct = ({ product, handleCancel, setUpdateMode, setUpdate }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    let [values, setValues] = useState(initialValues);
    const foundCategory = categories.find(category => category._id === product?.category);

    // Function to show Snackbar
    const showSnackbar = (severity, message) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    useEffect(() => {
        // Fetch categories from API
        axios
            .get(`${process.env.REACT_APP_API_URI}category/`)
            .then((response) => setCategories(response?.data?.data))
            .catch((error) => console.error("Error fetching categories", error));
    }, []);

    useEffect(() => {
        const apiUrl = `${process.env.REACT_APP_API_URI}category/subCategory/${values?.category?._id}`;

        axios.get(apiUrl)
            .then((response) => setSubCategories(response?.data?.data[0]?.subcategory))
            .catch((error) => console.error("Error fetching data:", error));
    }, [values?.category?._id]);

    useEffect(() => {
        if(product){
            values.productName = product?.productName;
            values.brand = product?.brand;
            values.productPicture = product?.productPicture[0];
            values.description = product?.description;
            values.price = product?.price;
            values.discount = product?.discount;
            values.weight = product?.discount;
            values.countInStock = product?.countInStock;
            values.manufacturingDate = product?.manufacturingDate;
            values.expiredDate = product?.expiredDate;
            values.category = {name: foundCategory?.name, _id: foundCategory?._id, shortDesc: foundCategory?.shortDesc};
            values.subcategory = product?.subcategory;
            values.productCode = product?.productCode;
            values.status = product?.status;
            values.type = product?.type;
            values.productPlan = product?.productPlan;
        };
    }, [foundCategory]);

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
            const adminToken = localStorage.getItem("accessToken");
            const postData = {
                ...values,
                manufacturingDate: values.manufacturingDate,
                expiredDate: values?.expiredDate,
                category: values?.category?._id,
                subcategory: values?.subcategory?._id,
            };

            await axios.put(
                `${process.env.REACT_APP_API_URI}product/update/${product._id}`,
                postData,
                {
                    headers: {
                        authorization: `${adminToken}`,
                    },
                }
            );

            showSnackbar("success", "Product updated successfully");
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
            setUpdate((prev) => !prev);
            setUpdateMode(false);
        } catch (error) {
            // Handle error
            console.error("Error:", error);

            // Show error Snackbar
            showSnackbar("error", "Failed to update product");
        }
    };

    return (
        <div>
            <div style={{ marginBottom: "6px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />}>
                    <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                        Dashboard
                    </Typography>
                    <Typography sx={{ color: "#637381" }}>
                        Update Product
                    </Typography>
                </Breadcrumbs>
            </div>
            <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: { xs: "center", md: "start" } }}>
                Update a product
            </Typography>
            <Box>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item xs={12} sx={12} md={3.5}>
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                            Details
                        </Typography>
                        <Typography sx={{ color: "#637381", fontSize: "12px", fontWeight: 400 }}>
                            name, brand, picture, description
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={12} md={8.5}>
                        <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke" }, border: { xs: "1px solid #00A76F", md: "none" }, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
                            <Grid container rowSpacing={2} columnSpacing={2}>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Product Name</InputLabel>
                                    <CustomTextField
                                        name="productName"
                                        value={values.productName}
                                        onChange={handleChange}
                                        placeholder="Enter the product name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Brand</InputLabel>
                                    <CustomTextField
                                        name="brand"
                                        value={values.brand}
                                        onChange={handleChange}
                                        placeholder="Enter the brand name"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Product Pictures</InputLabel>
                                    <CustomTextField
                                        name="productPicture"
                                        value={values.productPicture}
                                        onChange={handleChange}
                                        placeholder="Enter the image URL"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
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
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sx={12} md={3.5}>
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                            Pricing
                        </Typography>
                        <Typography sx={{ color: "#637381", fontSize: "12px", fontWeight: 400 }}>
                            price related inputs
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={12} md={8.5}>
                        <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke" }, border: { xs: "1px solid #00A76F", md: "none" }, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
                            <Grid container rowSpacing={2} columnSpacing={2}>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Price</InputLabel>
                                    <CustomTextField
                                        name="price"
                                        type="text"
                                        value={values.price}
                                        onChange={handleChange}
                                        placeholder="Enter the price"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Discount Percentage</InputLabel>
                                    <CustomTextField
                                        name="discount"
                                        type="text"
                                        value={values.discount}
                                        onChange={handleChange}
                                        placeholder="Enter discount percentage"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sx={12} md={3.5}>
                        <Typography sx={{ fontSize: "18px", fontWeight: 600 }} >
                            Properties
                        </Typography>
                        <Typography sx={{ color: "#637381", fontSize: "12px", fontWeight: 400 }}>
                            additional informations
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={12} md={8.5}>
                        <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke" }, border: { xs: "1px solid #00A76F", md: "none" }, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
                            <Grid container rowSpacing={2} columnSpacing={2}>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Weight (g)</InputLabel>
                                    <CustomTextField
                                        name="weight"
                                        type="text"
                                        value={values.weight}
                                        onChange={handleChange}
                                        placeholder="Enter the weight"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Quantity</InputLabel>
                                    <CustomTextField
                                        name="countInStock"
                                        type="text"
                                        value={values.countInStock}
                                        onChange={handleChange}
                                        placeholder="Enter the image quantity"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Manufacturing Date</InputLabel>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="manufacturingDate"
                                        value={values?.manufacturingDate ? values?.manufacturingDate.slice(0, 10) : ''}
                                        onChange={(event) =>
                                            handleDateChange("manufacturingDate", new Date(event.target.value))
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Expiration Date</InputLabel>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="expiredDate"
                                        value={values?.expiredDate ? values?.expiredDate.slice(0, 10) : ''}
                                        onChange={(event) =>
                                            handleDateChange("expiredDate", new Date(event.target.value))
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Category</InputLabel>
                                    <Autocomplete
                                        id="category-autocomplete"
                                        options={categories}
                                        getOptionLabel={(option) => option.name}
                                        value={values?.category?.name ? values?.category : null}
                                        onChange={handleCategoryChange}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth placeholder="Select Category" />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Subcategory</InputLabel>
                                    <Autocomplete
                                        id="subcategory-autocomplete"
                                        value={values?.subcategory?.name ? values?.subcategory : null}
                                        options={subCategories}
                                        getOptionLabel={(option) => option.name}
                                        onChange={handleSubCategoryChange}
                                        disabled={values?.category ? false : true}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth placeholder="Select Category" />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InputLabel>Product Code</InputLabel>
                                    <CustomTextField
                                        name="productCode"
                                        value={values.productCode}
                                        onChange={handleChange}
                                        placeholder="Enter product Code"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
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
                                <Grid item xs={12} md={12}>
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
                                <Grid item xs={12} md={12}>
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
                                <Grid item xs={12} md={12}>
                                    <Box mt={2} sx={{ display: 'flex', gap: 2 }}>
                                        <Button
                                            sx={{
                                                borderRadius: 16,
                                                px: 3,
                                                backgroundColor: "#FFFFFF",
                                                color: "#00A76F",
                                                fontWeight: 600,
                                                border: "1px solid #00A76F",
                                                "&:hover": {
                                                    borderRadius: 16,
                                                    px: 3,
                                                    backgroundColor: "#FFFFFF",
                                                    color: "#00A76F",
                                                    fontWeight: 600,
                                                    border: "1px solid #00A76F",
                                                }
                                            }}
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
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
                                            Update
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default UpdateProduct;
