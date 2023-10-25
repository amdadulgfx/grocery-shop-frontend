import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Breadcrumbs, Button, Grid, IconButton, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import CustomTextField from '../../../CustomTags/CustomTextField.view';
import { DeleteConfirmationDialog } from '../../../CustomTags';
import { Link } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminAllCategories = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [updatedCategory, setUpdatedCategory] = useState({
        name: '',
        shortDesc: ''
    });
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URI}category/`)
            .then((response) => {
                setCategories(response?.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories', error);
            });
    };

    const handleUpdate = (category) => {
        setSelectedCategory(category);
        setUpdatedCategory({
            name: category.name,
            shortDesc: category.shortDesc
        });
        setUpdateMode(true);
    };

    const handleCancel = () => {
        setUpdateMode(false);
        setSelectedCategory(null);
    };

    const handleUpdateSubmit = () => {
        const requestData = {
            name: updatedCategory.name,
            shortDesc: updatedCategory.shortDesc,
            products: [],
            subcategory: [],
        };

        axios.put(`${process.env.REACT_APP_API_URI}category/update/${selectedCategory._id}`, requestData)
            .then((response) => {
                fetchCategories();
                setUpdateMode(false);
                setSelectedCategory(null);
            })
            .catch((error) => {
                console.error('Error updating category', error);
            });
    };

    const handleDelete = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setDeleteConfirmationOpen(true);
    };

    const confirmDelete = () => {
        setDeleteConfirmationOpen(false);
        axios.delete(`${process.env.REACT_APP_API_URI}category/${selectedCategoryId}`)
            .then((response) => fetchCategories())
            .catch((error) => {
                console.error('Error deleting category', error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    return (
        <Box>
            {(updateMode && selectedCategory) ? (
                <Box>
                    <div style={{ marginBottom: "6px" }}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />} >
                            <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                                Dashboard
                            </Typography>
                            <Typography sx={{ color: "#637381" }}>
                                Update Category
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: { xs: "center", md: "start" } }}>
                        Update Category
                    </Typography>
                    {/* Update Form */}
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
                                <Box sx={{ boxShadow: { xs: "", md: "5px 5px 10px 10px whitesmoke" }, border: { xs: "1px solid #00A76F", md: "none" }, px: { xs: 1.5, md: 3 }, py: { xs: 2, md: 3 }, borderRadius: "6px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel>Category Name</InputLabel>
                                            <CustomTextField
                                                name="name"
                                                value={updatedCategory.name}
                                                onChange={handleInputChange}
                                                placeholder="Enter category name"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <InputLabel>Short Description</InputLabel>
                                            <CustomTextField
                                                name="shortDesc"
                                                multiline
                                                rows={3}
                                                value={updatedCategory.shortDesc}
                                                onChange={handleInputChange}
                                                placeholder="Enter short description"
                                            />
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
                                                    onClick={handleUpdateSubmit}
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
                </Box>
            ) : (
                <Box>
                    <div style={{ marginBottom: "6px" }}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />}>
                            <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                                Dashboard
                            </Typography>
                            <Typography sx={{ color: "#637381" }}>
                                Categories
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: { xs: "center", md: "start" } }}>
                        Category List
                    </Typography>
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#F4F6F8" }}>
                                    <TableRow>
                                        <TableCell align="start" sx={tableHeadStyle}>Name</TableCell>
                                        <TableCell align="start" sx={tableHeadStyle}>Short Description</TableCell>
                                        <TableCell align="center" sx={tableHeadStyle}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories.map((category) => (
                                        <TableRow
                                            key={category?._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, "&:hover": { backgroundColor: "#F4F6F8" } }}
                                        >
                                            <TableCell align="start" sx={{ ...tableBodyStyle, fontWeight: 500 }}>{category?.name}</TableCell>
                                            <TableCell align="start" sx={tableBodyStyle}>{category?.shortDesc}</TableCell>
                                            <TableCell align="center" sx={tableBodyStyle}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <IconButton onClick={() => handleUpdate(category)}>
                                                        <EditIcon sx={{ color: "#00A76F", fontSize: "20px" }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(category?._id)}>
                                                        <DeleteIcon sx={{ color: "#E42B32", fontSize: "20px" }} />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            )}


            {/* Delete Confirmation Dialog */}
            {deleteConfirmationOpen && (
                <DeleteConfirmationDialog deleteConfirmationOpen={deleteConfirmationOpen} setDeleteConfirmationOpen={setDeleteConfirmationOpen} confirmDelete={confirmDelete} deleteTitle={"Category"} />
            )}
        </Box>
    );
};

export default AdminAllCategories;

const tableHeadStyle = {
    color: "#637381",
    fontSize: { xs: "14px", sm: "18px" },
    fontWeight: 600
};

const tableBodyStyle = {
    fontSize: { xs: "12px", sm: "16px" },
    fontWeight: 500,
    py: 1,
    color: "#36454F"
}