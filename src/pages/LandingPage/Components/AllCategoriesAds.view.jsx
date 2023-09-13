import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { KeyboardArrowRight } from '@material-ui/icons';

const AllCategoriesAds = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    axios
      .get("http://localhost:5000/api/v1/category/")
      .then((response) => {
        setCategories(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });
  }, []);

  return (
    <Box sx={{ border: "1px solid gray", borderRadius: "0px 0px 6px 6px" }}>
      <Grid container>
        {categories?.map((category) => (
          <Grid item xs={12} key={category._id}>
            <Box
              onMouseEnter={() => setSelectedCategory(category._id)}
              onMouseLeave={() => setSelectedCategory(null)}
              onClick={() => setSelectedCategory(selectedCategory === category?._id ? null : category?._id)}
              sx={{ borderBottom: "1px solid gray", px: "20px", py: "20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}
            >
              <Box>
                <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "black" }}>{category.name}</Typography>
                {selectedCategory === category?._id &&
                  category?.subcategory?.map((subCategory, index) => (
                    <Box key={index} >
                      <Typography sx={{ borderBottom: "1px solid gray", px: "5px", py: "5px", fontSize: "14px", fontWeight: 400 }}>{subCategory?.name}</Typography>
                    </Box>
                  ))}
              </Box>
              {selectedCategory === null && <KeyboardArrowRight />}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllCategoriesAds;
