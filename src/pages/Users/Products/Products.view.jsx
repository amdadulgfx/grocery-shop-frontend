import { Box, Breadcrumbs, Button, Checkbox, FormControl, FormControlLabel, /* FormGroup, */ Grid, MenuItem, Select, Slider, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../../components';
// import { groceryItems } from './ProducsArray';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';

const productsCategory = ['Beverages', 'Biscuits & Snacks', 'Breads & Bakery', 'Breakfast & Dairy', 'Frozen Foods', 'Fruits & Vegetables', 'Grocery & Staples', 'Household Needs', 'Meats & Seafood'];
const statuses = ['In Stock', 'On Sale'];
const brands = ['Frito Lay', 'Oreo', "Welch's", "Nestle"];
const sortingOptions = ['New Date', 'Previous Date', 'Price Low', 'Price High']

const Products = () => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 50]);
  const [sort, setSort] = useState("");
  const [categoryCheckbox, setCategoryCheckboxes] = useState(
    productsCategory.reduce((options, option) => {
      options[option] = false;
      return options;
    }, {})
  );
  const [statusesCheckbox, setStatusesCheckboxes] = useState(
    statuses.reduce((options, option) => {
      options[option] = false;
      return options;
    }, {})
  );
  const [brandsCheckbox, setBrandsCheckboxes] = useState(
    brands.reduce((options, option) => {
      options[option] = false;
      return options;
    }, {})
  );


  const handleChangeProductCategory = (checkedObject) => {
    const ArrayOfObjects = Object.keys(checkedObject).map((key) => ({
      key: key,
      value: checkedObject[key]
    }));
    const selectedOptions = ArrayOfObjects?.filter((option) => option.value === true);
    const itemsName = selectedOptions.map((item) => item.key);
    return itemsName.join(',');
  }

  const searchCategoriesString = handleChangeProductCategory(categoryCheckbox);
  const searchStatusesString = handleChangeProductCategory(statusesCheckbox);
  const searchBrandsString = handleChangeProductCategory(brandsCheckbox);

  const handleSearchProducts = (category, status, brands, price) => {
    const apiUrl = `http://localhost:5000/api/v1/product/searchProduct?searchTerm=${category}`;
    axios.get(apiUrl)
      .then(response => setProducts(response?.data?.data))
      .catch(error => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    handleSearchProducts(
      searchCategoriesString,
      searchStatusesString,
      searchBrandsString,
      priceRange
    );

  }, [categoryCheckbox, statusesCheckbox, brandsCheckbox]);

  useEffect(() => {
    const apiUrl = 'http://localhost:5000/api/v1/product/';
    axios.get(apiUrl)
      .then((response) => setProducts(response?.data?.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleCheckboxChange = (event, setChangeCategory) => {
    const { name, checked } = event.target;
    setChangeCategory((prevCategory) => ({
      ...prevCategory,
      [name]: checked,
    }));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box maxWidth="lg" sx={{ mx: 5, py: 0.5, }}>
      <Box>
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
          <Box sx={{ marginTop: -2,paddingTop: 8 }}>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: "600" }}
            >
              PRODUCT CATEGORIES
            </Typography>
            <FormControl component="fieldset">
              {productsCategory.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={categoryCheckbox[option]}
                      onChange={(event) => handleCheckboxChange(event, setCategoryCheckboxes)}
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
                value={priceRange}
                onChange={(event, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                getAriaValueText={() => `$ ${priceRange}`}
                disableSwap
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant='body2'>
                Price: <span style={{ fontWeight: "600" }}>${priceRange[0]} - ${priceRange[1]}</span>
              </Typography>
              <Button
                sx={{ fontWeight: "600", textTransform: "none", }}
                variant='text'
                onClick={() => handleSearchProducts(
                  searchCategoriesString,
                  searchStatusesString,
                  searchBrandsString,
                  priceRange
                )}
              >
                Filter
              </Button>
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
              {statuses.map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Checkbox
                      checked={statusesCheckbox[option]}
                      onChange={(event) => handleCheckboxChange(event, setStatusesCheckboxes)}
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
                      checked={brandsCheckbox[option]}
                      onChange={(event) => handleCheckboxChange(event, setBrandsCheckboxes)}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Box>
              <Typography variant='subtitle2' sx={{display: 'flex', alignItems: "center"}}>
                {searchCategoriesString.split(",").map((item, index) => (
                  <>
                   {index > 0 && (<AddCircleIcon sx={{mx: 1}} />)} 
                    <span>{item}</span>
                  </>
                ))}
              </Typography>
            </Box>
            <Box sx={{display: 'flex', alignContent: 'center'}}>
              <Button variant='contained' size='small' >Clear Filter</Button>
              <FormControl>
                <Select
                  defaultValue="New Date"
                  onChange={handleSortChange}
                  sx={{ width: 150 }}
                  MenuProps={{ classes: { paper: { maxHeight: 180 } } }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    <b>Sort By</b>
                  </MenuItem>
                  {sortingOptions?.map((value) => (
                    <MenuItem value={value} key={value}>
                      <>{value}</>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box>
            <Grid
              container
              rowSpacing={4}
              columnSpacing={0}
              justifyContent="center"
              alignItems="stretch"
            >
              {products?.map((item) => (
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



