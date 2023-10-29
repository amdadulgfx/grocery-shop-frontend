import { Typography, Box, TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import axios from "axios";

const GellAllProducts = ({ product, handleUpdate, handleDelete }) => {
    const [categories, setCategories] = useState([]);
    const formattedDate = new Date(`${product?.manufacturingDate}`)?.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const foundCategory = categories.find(category => category._id === product?.category);

    useEffect(() => {
        // Fetch categories from API
        axios
            .get(`${process.env.REACT_APP_API_URI}category/`)
            .then((response) => setCategories(response?.data?.data))
            .catch((error) => console.error("Error fetching categories", error));
    }, []);
    // console.log(product)

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, "&:hover": { backgroundColor: "#F4F6F8" } }}
        >
            <TableCell align="start" sx={{ ...tableBodyStyle, fontWeight: 500 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={product?.productPicture[0]} alt={product?.productName} style={{ height: "64px", width: "64px", borderRadius: "8px", marginRight: "10px" }} />
                    <Box>
                        <Typography>{product?.productName?.slice(0, 20)}</Typography>
                        <Typography sx={{ color: "gray", fontSize: { xs: "10px", md: "12px" }, fontWeight: 400 }}>{product?.brand}</Typography>
                    </Box>
                </Box>
            </TableCell>
            <TableCell align="start" sx={tableBodyStyle}>{formattedDate}</TableCell>
            <TableCell align="start" sx={tableBodyStyle}>{foundCategory?.name}</TableCell>
            <TableCell align="start" sx={tableBodyStyle}>{product?.countInStock}<span style={{ fontSize: { xs: "10px", md: "12px" }, fontWeight: "400px", color: "gray", marginLeft: "5px" }}>in stock</span></TableCell>
            <TableCell align="start" sx={tableBodyStyle}>${product?.price?.toFixed(2)}</TableCell>
            <TableCell align="center" sx={tableBodyStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton onClick={() => handleUpdate(product)}>
                        <EditIcon sx={{ color: "#00A76F", fontSize: "20px" }} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product?._id)}>
                        <DeleteIcon sx={{ color: "#E42B32", fontSize: "20px" }} />
                    </IconButton>
                </Box>
            </TableCell>
        </TableRow>
    );
};

export default GellAllProducts;

const tableBodyStyle = {
    fontSize: { xs: "12px", sm: "16px" },
    fontWeight: 500,
    py: 1,
    color: "#36454F"
};