import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { KeyboardArrowRight } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

const AllCategoriesAds = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from API
    axios
      .get(`${process.env.REACT_APP_API_URI}category/`)
      .then((response) => {
        setCategories(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  const handleCategoryRedirect = (category) => {
    // setSelectedCategory(selectedCategory === category?._id ? null : category?._id);
    sessionStorage.setItem("categories", JSON.stringify([category?._id]));
    navigate("/products");
  }

  return (
    <Box sx={{ border: "1px solid lightgrey", borderRadius: "0px 0px 6px 6px", mt: 2 }}>
      <Grid container>
        {categories?.map((category) => (
          <Grid item xs={12} key={category?._id}>
            <Box
              // onMouseEnter={() => setSelectedCategory(category._id)}
              // onMouseLeave={() => setSelectedCategory(null)}
              onClick={() => handleCategoryRedirect(category)}
              sx={{
                borderBottom: "1px solid lightgrey",
                px: "20px", py: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",

              }}
            >
              <Box>
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#333444",
                    "&:hover": {
                      color: "#555444",
                      fontWeight: 600,
                    },
                  }}
                >
                  {category.name}
                </Typography>
                {/* {selectedCategory === category?._id &&
                  category?.subcategory?.map((subCategory, index) => (
                    <Box key={index} >
                      <Typography sx={{ borderBottom: "1px solid gray", px: "5px", py: "5px", fontSize: "14px", fontWeight: 400 }}>{subCategory?.name}</Typography>
                    </Box>
                  ))} */}
              </Box>
              {/* {selectedCategory === null && <KeyboardArrowRight />} */}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllCategoriesAds;
