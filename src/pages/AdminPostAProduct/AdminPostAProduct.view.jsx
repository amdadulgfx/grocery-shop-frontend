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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@material-ui/styles";
import MuiAlert from "@mui/material/Alert";
// import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CustomTextField from "../../CustomTags/CustomTextField.view";

const initialValues = {
    title: "",
    brand: "",
    images: [],
    description: "",
    weight: "",
    price: "",
    quantity: "",
    discount: "",
    productionDate: "",
    expiredDate: "",
    status: "",
    category: "",
    subcategory: "",
    discountPercentage: 0,
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
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    useEffect(() => {
        // Fetch categories from API
        axios
            .get("http://localhost:5000/api/v1/category/")
            .then((response) => {
                console.log("res", response);
                setCategories(response?.data?.data);
            })
            .catch((error) => {
                console.error("Error fetching categories", error);
            });
    }, []);

    useEffect(() => {
        // Define the API URL
        const apiUrl = `http://localhost:5000/api/v1/category/subCategory/${values?.category?._id}`;
        console.log("coming here");

        // Make the GET request using Axios
        axios
            .get(apiUrl)
            .then((response) => {
                console.log("response", response?.data?.data[0]?.subcategory);
                setSubCategories(response?.data?.data[0]?.subcategory); // Set the API response data to the state
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [values?.category?._id]);

    // Handle input field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("name", name);
        console.log("value", value);

        if (name === "image") {
            // Handle adding image URLs to the images array
            setValues((prevValues) => ({
                ...prevValues,
                images: [...prevValues.images, value],
            }));
        } else {
            // Handle other input fields
            setValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }));
        }
    };


    // Handle date picker changes
    const handleDateChange = (name, date) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: date,
        }));
    };

    // Handle category change
    const handleCategoryChange = (event, value) => {
        setValues({ ...values, category: value });
    };

    // Handle subcategory change
    const handleSubCategoryChange = (event, value) => {
        setValues({ ...values, subcategory: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        try {
            // Access the JWT token from local storage (you should implement this)
            const adminToken = localStorage.getItem("adminToken");
            // console.log("admin", adminToken);

            // console.log("values", values);
            // return;

            // Prepare the data to be sent in the POST request
            const postData = {
                ...values,
                productName: values?.title,
                brand: values?.brand,
                productPicture: values?.images,
                description: values?.description,
                weight: values?.weight,
                price: Number(values?.price),
                countInStock: Number(values?.quantity),
                productCode: values?.productCode,
                discount: Number(values?.discountPercentage),
                type: values?.type,
                productPlan: values?.productPlan,
                status : values?.status,
                manufacturingDate: values.productionDate.toISOString(),
                expiredDate: values.expiredDate.toISOString(),
                category : values?.category?._id,
                subcategory : values?.subcategory?._id,
            };

            // Send the POST request to add the product
            const response = await axios.post(
                "http://localhost:5000/api/v1/product/add",
                postData,
                {
                    headers: {
                        authorization: `${adminToken}`,
                    },
                }
            );

            // Handle success response
            console.log("Response:", response.data);

            // Show success Snackbar
            showSnackbar("success", "Product added successfully");
        } catch (error) {
            // Handle error
            console.error("Error:", error);

            // Show error Snackbar
            showSnackbar("error", "Failed to add product");
        }
    };


    // Function to show Snackbar
    const showSnackbar = (severity, message) => {
        setSnackbarSeverity(severity);
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    // Handle Snackbar close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };


    console.log("values", values);

    return (
        <Container minWidth="md">
            <Typography
                sx={{ mt: 1, mb: 1, textAlign: "center", fontSize: "20px" }}
            >
                Post A Product
            </Typography>
            <Grid container rowSpacing={2} columnSpacing={10}>
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
                        name="image"
                        // value={values.images}
                        onChange={handleChange}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DemoItem>
                                <DatePicker
                                    fullWidth
                                    name="productionDate"
                                    value={values.productionDate}
                                    onChange={(date) => handleDateChange("productionDate", date)}
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Expiration Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DemoItem>
                                <DatePicker
                                    value={values.expiredDate}
                                    onChange={(date) => handleDateChange("expiredDate", date)}
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
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
                            <TextField {...params} fullWidth />
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
                            <TextField {...params} fullWidth />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Discount Percentage</InputLabel>
                    <CustomTextField
                        name="discountPercentage"
                        type="text"
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
                <Grid item xs={12} md={6}>
                    <InputLabel>Description</InputLabel>
                    <CustomTextField
                        name="description"
                        multiline
                        row={4}
                        value={values.description}
                        onChange={handleChange}
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

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;