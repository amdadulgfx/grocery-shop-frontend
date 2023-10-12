import { Box, Breadcrumbs, Button, Checkbox, Collapse, FormControl, FormControlLabel, /* FormGroup, */ Grid, IconButton, MenuItem, Select, Slider, Typography, useMediaQuery, useTheme, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../../components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';
import SearchProductFilter from './SearchProductFilter';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

const categories = ['Beverages', 'Biscuits & Snacks', 'Breads & Bakery', 'Breakfast & Dairy', 'Frozen Foods', 'Fruits & Vegetables', 'Grocery & Staples', 'Household Needs', 'Meats & Seafood'];
const statuses = ['In Stock', 'On Sale'];
const brands = ['Frito Lay', 'Oreo', "Welch's", "Nestle"];
const sortingOptions = ['New Date', 'Previous Date', 'Price Low', 'Price High'];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Products = () => {
  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 50]);
  const [sortBy, setSortBy] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [categoryCheckbox, setCategoryCheckboxes] = useState(
    categories.reduce((options, option) => {
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

  const handleSearchProducts = () => {
    const apiUrl = `http://localhost:5000/api/v1/product/searchProduct?searchTerm=${searchCategoriesString}`;
    axios.get(apiUrl)
      .then(response => setProducts(response?.data?.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    handleSearchProducts();

  }, [categoryCheckbox, statusesCheckbox, brandsCheckbox]);

  const sortByNewDate = (a, b) => {
    const dateA = new Date(a.manufacturingDate);
    const dateB = new Date(b.manufacturingDate);
    return dateA.getTime() < dateB.getTime() ? 1 : -1;
  }

  const sortByPreviousDate = (a, b) => {
    const dateA = new Date(a.manufacturingDate);
    const dateB = new Date(b.manufacturingDate);
    return dateA.getTime() > dateB.getTime() ? 1 : -1;
  }

  const sortByPriceLow = (a, b) => {
    const priceA = parseInt(a.price);
    const priceB = parseInt(b.price);
    return priceA < priceB ? 1 : -1;
  }

  const sortByPriceHigh = (a, b) => {
    const priceA = parseInt(a.price);
    const priceB = parseInt(b.price);
    return priceA > priceB ? 1 : -1;
  }

  const sortingFunctions = {
    'New Date': sortByNewDate,
    'Previous Date': sortByPreviousDate,
    'Price Low': sortByPriceLow,
    'Price High': sortByPriceHigh,
  };

  useEffect(() => {
    if (sortingFunctions[sortBy]) {
      products.sort(sortingFunctions[sortBy]);
    }
  }, [sortBy]);

  const handleResetStates = () => {
    setSortBy("");
    setPriceRange([1, 50]);
    setCategoryCheckboxes(
      categories.reduce((options, option) => {
        options[option] = false;
        return options;
      }, {})
    );
    setStatusesCheckboxes(
      statuses.reduce((options, option) => {
        options[option] = false;
        return options;
      }, {})
    );
    setBrandsCheckboxes(
      brands.reduce((options, option) => {
        options[option] = false;
        return options;
      }, {})
    );
  }

  const handleCheckboxChange = (event, setChangeCategory) => {
    const { name, checked } = event.target;
    setChangeCategory((prevCategory) => ({
      ...prevCategory,
      [name]: checked,
    }));
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClearFilter = () => {
    handleResetStates();
    handleSearchProducts();
  }

  const propsData = {
    categories,
    handleCheckboxChange,
    categoryCheckbox,
    setCategoryCheckboxes,
    priceRange,
    setPriceRange,
    handleSearchProducts,
    statuses,
    statusesCheckbox,
    setStatusesCheckboxes,
    brands,
    brandsCheckbox,
    setBrandsCheckboxes,
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
          {mobileView ? (
            <Box sx={{ backgroundColor: "#2BBEF9", color: "#FFFFFF", display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, py: 0.5, border: "1px solid #E5E5E5", borderRadius: 2 }}>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: "600", display: "inline-flex" }}
              >
                <SearchIcon />
                Search Filter
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={() => setExpanded((prev) => !prev)}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </Box>
          ) : (
            <Box sx={{ paddingTop: 4 }}>
              <SearchProductFilter {...propsData} />
            </Box>
          )}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <SearchProductFilter {...propsData} />
          </Collapse>
        </Grid>
        <Grid item xs={12} md={9}>
        <Box sx={{ mt: -3 }}>
          <Grid
            container
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={5}
          >
            <Grid item md={8} xs={12}>
              {searchCategoriesString?.length > 1 && (
                <Box>
                  <Typography sx={{ fontWeight: "600" }} variant="subtitle2">Search For: </Typography>
                  {searchCategoriesString.split(",").map((item, index) => (
                    <Typography
                      key={item}
                      variant='body2'
                      sx={{ display: 'inline-flex', alignItems: "center", whiteSpace: 'nowrap', textOverflow: "ellipsis", overflowX: "hidden" }}
                    >
                      {(index > 0) ? (
                        <AddCircleIcon sx={{ mx: 1 }} />
                      ) : (
                        <AddCircleIcon sx={{ ml: -2, visibility: "hidden" }} />
                      )}
                      <span>{item}</span>
                    </Typography>
                  ))}
                </Box>
              )}
              {searchStatusesString?.length > 1 && (
                <Box>
                  <Typography sx={{ fontWeight: "600" }} variant="subtitle2">Status With: </Typography>
                  {searchStatusesString.split(",").map((item, index) => (
                    <Typography
                      key={item}
                      variant='body2'
                      sx={{ display: 'inline-flex', alignItems: "center", whiteSpace: 'nowrap', textOverflow: "ellipsis", overflowX: "hidden" }}
                    >
                      {(index > 0) ? (
                        <AddCircleIcon sx={{ mx: 1 }} />
                      ) : (
                        <AddCircleIcon sx={{ ml: -2, visibility: "hidden" }} />
                      )}
                      <span>{item}</span>
                    </Typography>
                  ))}
                </Box>
              )}
              {searchBrandsString?.length > 1 && (
                <Box sx={{ mb: 1 }}>
                  <Typography sx={{ fontWeight: "600" }} variant="subtitle2">Product From: </Typography>
                  {searchBrandsString.split(",").map((item, index) => (
                    <Typography
                      key={item}
                      variant='body2'
                      sx={{ display: 'inline-flex', alignItems: "center", whiteSpace: 'nowrap', textOverflow: "ellipsis", overflowX: "hidden" }}
                    >
                      {(index > 0) ? (
                        <AddCircleIcon sx={{ mx: 1 }} />
                      ) : (
                        <AddCircleIcon sx={{ ml: -2, visibility: "hidden" }} />
                      )}
                      <span>{item}</span>
                    </Typography>
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: "flex-end",
                  textAlign: "center",
                  gap: 1, mb: 1,
                  flexDirection: mobileView ? "row" : "column",
                }}
              >
                <Select
                  size='small'
                  value={sortBy}
                  onChange={handleSortChange}
                  sx={{
                    width: 150,
                    borderRadius: 2,
                    '& input': {
                      padding: '4px',
                    },
                  }}
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
                <Button
                  variant='contained'
                  size='small'
                  sx={{ width: 150, borderRadius: 2, py: 1 }}
                  onClick={handleClearFilter}
                >
                  Clear Filter
                </Button>
              </Box>
            </Grid>
          </Grid>
          </Box>
          <Box /* sx={{ mt: -3 }} */>
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
    </Box >

  );
};

export default Products;



