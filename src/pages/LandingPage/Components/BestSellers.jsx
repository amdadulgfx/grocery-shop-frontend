import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../../components';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BestSellers = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URI}product/`;
    axios.get(apiUrl)
      .then((response) => setProducts(response?.data?.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box sx={{ my: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2, mx: 0.4, my: 4,
        }}
      >
        <Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#343541",
              fontSize: "1.3rem",
              fontWeight: "600 !important",
              mb: -1.5,
            }}
          >
            BEST SELLERS
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#7D888E" }}
          >
            Do not miss the current offers until the end of Month.
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={() => navigate("/products")}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderRadius: 16,
              visibility: "hidden"
            }}
          >
            View All&nbsp;
            <ArrowRightAltIcon />
          </Button>
        </Box>
      </Box>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={0}
        justifyContent="start"
        alignItems="stretch"
      >
        {products?.map((item) => (
          <Grid key={item.productCode} item xs={12} sm={6} md={3}>
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSellers;