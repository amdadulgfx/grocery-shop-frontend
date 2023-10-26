import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Autocomplete,
    Breadcrumbs,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    InputLabel
} from '@mui/material';
import { DeleteConfirmationDialog } from '../../../CustomTags';
import { Link } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const AdminAllSubCategories = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [name, setName] = useState('');
    const [shortDesc, setShortDesc] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]); // Initialize with empty array
    const [categories, setCategories] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        fetchSubCategories();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedSubCategory) {
            setName(selectedSubCategory.name || '');
            setShortDesc(selectedSubCategory.shortDesc || '');
            setSelectedCategories(selectedSubCategory.category || []);
        }
    }, [selectedSubCategory]);

    const fetchSubCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URI}subCategory`)
            .then((response) => {
                setSubCategories(response.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching subcategories', error);
            });
    };

    const fetchCategories = () => {
        axios.get(`${process.env.REACT_APP_API_URI}category/`)
            .then((response) => {
                setCategories(response?.data?.data);
            })
            .catch((error) => {
                console.error('Error fetching categories', error);
            });
    };

    const handleUpdate = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setName(subCategory.name);
        setShortDesc(subCategory.shortDesc);
        setSelectedCategories(subCategory.category || []);
        setUpdateMode(true);
    };

    const handleCancel = () => {
        setSelectedSubCategory(null);
        setName('');
        setShortDesc('');
        setSelectedCategories([]);
        setUpdateMode(false);
    };

    const handleUpdateSubCategory = () => {
        const requestData = {
            name,
            shortDesc,
            category: selectedCategories.map(cat => cat._id)
        };

        axios.put(`${process.env.REACT_APP_API_URI}subCategory/update/${selectedSubCategory._id}`, requestData)
            .then((response) => {
                fetchSubCategories();
                handleCancel();
            })
            .catch((error) => {
                console.error('Error updating subcategory', error);
            });
    };

    const handleDelete = (subCategoryId) => {
        setDeleteConfirmationOpen(true);
        setSelectedSubCategory(subCategoryId);
    };

    const confirmDelete = () => {
        setDeleteConfirmationOpen(false);
        axios.delete(`${process.env.REACT_APP_API_URI}subCategory/${selectedSubCategory}`)
            .then((response) => fetchSubCategories())
            .catch((error) => console.error('Error deleting subcategory', error));
    };

    const handleCategoryChange = (event, newValue) => {
        setSelectedCategories(newValue);
    };

    return (
        <Box>
            {(updateMode && selectedSubCategory) ? (
                // Update Form
                <Box>
                    <div style={{ marginBottom: "6px" }}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />} >
                            <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                                Dashboard
                            </Typography>
                            <Typography sx={{ color: "#637381" }}>
                                Update Subcategory
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: { xs: "center", md: "start" } }}>
                        Update Subcategory
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
                                                multiple
                                                value={selectedCategories} 
                                                options={categories}
                                                getOptionLabel={(option) => option.name}
                                                onChange={handleCategoryChange}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Select category" fullWidth />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
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
                                                    onClick={handleUpdateSubCategory}
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
                // Subcategory List
                <Box>
                    <div style={{ marginBottom: "6px" }}>
                        <Breadcrumbs aria-label="breadcrumb" separator={<CircleIcon sx={{ fontSize: "8px", color: "#637381" }} />}>
                            <Typography component={Link} to="/admin-dashboard" sx={{ textDecoration: "none", color: "#637381" }}>
                                Dashboard
                            </Typography>
                            <Typography sx={{ color: "#637381" }}>
                                Subcategories
                            </Typography>
                        </Breadcrumbs>
                    </div>
                    <Typography sx={{ mt: 0.5, mb: 2, fontSize: { xs: "18px", sm: "24px" }, color: "#637381", fontWeight: 600, textAlign: { xs: "center", md: "start" } }}>
                        Subcategory List
                    </Typography>
                    <Box>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: "#F4F6F8" }}>
                                    <TableRow>
                                        <TableCell align="start" sx={tableHeadStyle}>Name</TableCell>
                                        <TableCell align="start" sx={tableHeadStyle}>Category</TableCell>
                                        <TableCell align="start" sx={tableHeadStyle}>Short Description</TableCell>
                                        <TableCell align="center" sx={tableHeadStyle}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subCategories.map((subCategory) => (
                                        <TableRow
                                            key={subCategory?._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, "&:hover": { backgroundColor: "#F4F6F8" } }}
                                        >
                                            <TableCell align="start" sx={{ ...tableBodyStyle, fontWeight: 500 }}>{subCategory?.name}</TableCell>
                                            <TableCell align="start" sx={tableBodyStyle}>{subCategory?.category?.map(cat => cat?.name)?.join(', ')}</TableCell>
                                            <TableCell align="start" sx={tableBodyStyle}>{subCategory?.shortDesc}</TableCell>
                                            <TableCell align="center" sx={tableBodyStyle}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <IconButton onClick={() => handleUpdate(subCategory)}>
                                                        <EditIcon sx={{ color: "#00A76F", fontSize: "20px" }} />
                                                    </IconButton>
                                                    <IconButton onClick={() => handleDelete(subCategory?._id)}>
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
                <DeleteConfirmationDialog deleteConfirmationOpen={deleteConfirmationOpen} setDeleteConfirmationOpen={setDeleteConfirmationOpen} confirmDelete={confirmDelete} deleteTitle={"Subcategory"} />
            )}
        </Box>
    );
};

export default AdminAllSubCategories;

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
};