import { Box, Breadcrumbs, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Slider, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../../components';
import { groceryItems } from './ProducsArray';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';

const checkboxOptions = ['Checkbox 1', 'Checkbox 2', 'Checkbox 3', 'Checkbox 4', 'Checkbox 5', 'Checkbox 6', 'Checkbox 7'];
const statusOptions = ['In Stock', 'On Sale'];
const brands = ['Frito Lay', 'Oreo', "Welch's", "Nestle"]

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sliderValue, setSliderValue] = useState([1, 50]);
  const [checkboxes, setCheckboxes] = useState(
    checkboxOptions.reduce((options, option) => {
      options[option] = false;
      return options;
    }, {})
  );

  useEffect(() => {
    // Define the URL of the API
    const apiUrl = 'http://localhost:5000/api/v1/product/';

    // Use Axios to fetch data from the API
    axios.get(apiUrl)
      .then((response) => {
        // Set the fetched data in the state
        setProducts(response?.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [name]: checked,
    }));
  };

  return (
    <Box maxWidth="lg" sx={{ mx: 5, py: 0.5, }}>
      <Box sx={{ paddingBottom: 8 }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Typography
            variant="body2"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#4D4D4D",
            }}
          >
            Home
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textDecoration: "none",
              color: "#4D4D4D",
            }}
          >
            Products
          </Typography>
        </Breadcrumbs>
      </Box>
      <Grid container spacing={2} alignContent="stretch">
        <Grid item xs={12} md={3}>
          <Box sx={{ marginTop: -2 }}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: "600" }}
            >
              PRODUCT CATEGORIES
            </Typography>
            <FormControl component="fieldset">
              {checkboxOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={checkboxes[option]}
                      onChange={handleCheckboxChange}
                      name={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormControl>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: "600" }}
            >
              FILTER BY PRICE
            </Typography>
            <Box sx={{ paddingRight: 3, paddingLeft: 1 }}>
              <Slider
                min={1}
                max={50}
                getAriaLabel={() => 'Minimum distance'}
                value={sliderValue}
                onChange={(event, newValue) => setSliderValue(newValue)}
                valueLabelDisplay="auto"
                getAriaValueText={() => `$ ${sliderValue}`}
                disableSwap
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant='body2'>
                Price: <span style={{ fontWeight: "600" }}>${sliderValue[0]} - ${sliderValue[1]}</span>
              </Typography>
              <Button sx={{ fontWeight: "600", textTransform: "none", }} variant='text'>Filter</Button>
            </Box>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: "600" }}
            >
              PRODUCT STATUS
            </Typography>
            <FormControl component="fieldset">
              {statusOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={checkboxes[option]}
                      onChange={handleCheckboxChange}
                      name={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormControl>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: "600" }}
            >
              BRANDS
            </Typography>
            <FormControl component="fieldset">
              {brands.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={checkboxes[option]}
                      onChange={handleCheckboxChange}
                      name={option}
                    />
                  }
                  label={option}
                />
              ))}
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={0}
              justifyContent="center"
              alignItems="stretch"
            >
              {products.map((item) => (
                <Grid key={item.productCode} item xs={12} sm={6} md={3}>
                  <ProductCard product={item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>

  );
};

export default Products;



