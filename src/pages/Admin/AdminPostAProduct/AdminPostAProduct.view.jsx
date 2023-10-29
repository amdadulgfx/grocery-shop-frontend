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
    category: "",
    subcategory: "",
    type: "",
    productCode: "",
    productPlan: "",
};

const statusOptions = ["In Stock", "Out Of Stock"];
const typeOptions = ["Organic"];
const productPlanOptions = ["Recommended", "Regular"];

const AdminPostAProduct = () => {
    const [values, setValues] = useState(initialValues);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");
    document.title = "Post Product | Grocery Heaven"

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
            const adminToken = localStorage.getItem("accessToken");
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
                productPicture: [],
                description: "",
                weight: "",
                price: "",
                countInStock: "",
                discount: "",
                manufacturingDate: "",
                expiredDate: "",
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
        <Box>
            <div style={{ marginBottom: "6px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{fontSize:"8px", color:"#637381"}} />}>
                    <Typography sx={{ textDecoration: "none", color: "#637381" }}>
                        Dashboard
                    </Typography>
                    <Typography sx={{ color: "#637381" }}>
                        Post Product
                    </Typography>
                </Breadcrumbs>
            </div>
            <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: {xs: "center", md: "start"} }}>
                Create a new product
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
                        <Box  sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke"}, border: { xs: "1px solid #00A76F", md: "none"}, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
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
                                    <InputLabel>Product Picture</InputLabel>
                                    <CustomTextField
                                        name="productPicture"
                                        // value={values.productPicture}
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
                        <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke"}, border: { xs: "1px solid #00A76F", md: "none"}, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
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
                        <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke"}, border: { xs: "1px solid #00A76F", md: "none"}, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
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
                                    <CustomTextField
                                        type="date"
                                        name="manufacturingDate"
                                        onChange={(event) =>
                                            handleDateChange("manufacturingDate", new Date(event.target.value))
                                        }
                                        placeholder="Enter manufacturing Date"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
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
                                    <Box mt={2} sx={{display:"flex", alignItems:"center", justifyContent:"center", mt: {xs: 1.2, md: 2}}}>
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
        </Box>
    );
};

export default AdminPostAProduct;
