import React, { useState } from "react";
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
} from "@mui/material";
import axios from "axios";
import CustomTextField from "../../CustomTags/CustomTextField.view";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from "react";
// import { DatePicker, LocalizationProvider } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";

const initialValues = {
    title: "",
    brand: "",
    images: "",
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
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from API
        axios.get('http://localhost:5000/api/v1/category/')
            .then((response) => {
                console.log("res", response)
                setCategories(response?.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories', error);
            });
    }, []);

    useEffect(() => {
        // Define the API URL
        const apiUrl = `http://localhost:5000/api/v1/category/subCategory/${values?.category?._id}`;
        console.log("coming here")

        // Make the GET request using Axios
        axios.get(apiUrl)
            .then(response => {
                console.log("response", response)
                setSubCategories(response.data); // Set the API response data to the state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [values?.category?._id]);
    console.log("subce", subCategories)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleCategoryChange = (event, value) => {
        setValues({ ...values, "category": value });
    };

    const handleSubCategoryChange = (event, value) => {
        setValues({ ...values, "subcategory": value });
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

    console.log("values", values);

    return (
        <Container minWidth="md">
            <Typography sx={{ mt: 1, mb: 1, textAlign: "center", fontSize: "20px" }}>Post A Product</Typography>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'DatePicker'
                            ]}
                        >
                            <DemoItem>
                                <DatePicker
                                    fullWidth
                                    name="productionDate"
                                    defaultValue={dayjs(values.productionDate)}
                                />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel>Expiration Date</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                                'DatePicker'
                            ]}
                        >
                            <DemoItem>
                                <DatePicker defaultValue={dayjs(values.expiredDate)} />
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
                        id="category-autocomplete"
                        options={subCategories}
                        getOptionLabel={(option) => option.name}
                        value={values?.subcategory}
                        onChange={handleSubCategoryChange}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth />
                        )}
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
        </Container>
    );
};

export default AdminPostAProduct;


