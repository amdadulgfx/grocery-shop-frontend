import { Box, Breadcrumbs, Button, CircularProgress, Collapse, Grid, IconButton, MenuItem, Select, Typography, useMediaQuery, useTheme, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { ProductCard } from '../../../components';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import axios from 'axios';
import SearchProductFilter from './SearchProductFilter';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import { useKeywords } from '../../../context/searchContext';
import { useSearchProductsListMutation } from '../../../reduxMine/features/searchProducts/searchProductsAPI';

const statuses = [{ label: 'In Stock', value: "countInStock" }, { label: 'On Sale', value: "discount" }];
const sortingOptions = ['New Products', 'Price Low', 'Price High'];

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

const Products = ({ history }) => {
  const theme = useTheme();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { searchKeyword, setSearchKeyword, products, setProducts, handleSearchProductLists, isLoading } = useKeywords();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [masterDataLoading, setMasterDataLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([1, 5000]);
  const [changedPrice, setChangedPrice] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [categoryCheckboxes, setCategoryCheckboxes] = useState({});
  const [statusesCheckboxes, setStatusesCheckboxes] = useState({});
  const [brandsCheckboxes, setBrandsCheckboxes] = useState({});
  const state = location?.state || {};
  let searchProductQueries = {};
  const { hotProducts, bestSellerProducts, redirectFrom } = state || {};
  document.title = "Products | Grocery Heaven"

  useEffect(() => {
    const categoriesApiUrl = `${process.env.REACT_APP_API_URI}category/`;
    const brandsApiUrl = `${process.env.REACT_APP_API_URI}product/brand/`;
    const fetchMasterData = async () => {
      const prevKeyword = sessionStorage.getItem("searchKeyword");
      const { searchKeyword } = JSON.parse(prevKeyword) || { searchKeyword: "" };
      setSearchKeyword(searchKeyword);
      await axios.get(categoriesApiUrl)
        .then((res) => {
          const prevCategories = sessionStorage.getItem("categories");
          const categoryIds = JSON.parse(prevCategories);
          setCategoryCheckboxes(res?.data?.data?.reduce((options, option) => {
            if (categoryIds?.includes(option?._id)) {
              options[option?.name] = true;
            } else {
              options[option?.name] = false;
            }
            return options;
          }, {}));
          setCategories(res?.data?.data);
        })
        .catch((error) => console.error('Error fetching data:', error));
      await axios.get(brandsApiUrl)
        .then((res) => {
          const prevBrands = sessionStorage?.getItem("brands");
          const brandsNames = JSON.parse(prevBrands);
          setBrandsCheckboxes(res?.data?.data?.reduce((options, option) => {
            if (brandsNames?.includes(option?.brand)) {
              options[option?.brand] = true;
            } else {
              options[option?.brand] = false;
            }
            return options;
          }, {}));
          setBrands(res?.data?.data);
        })
        .catch((error) => console.error('Error fetching data:', error))
        .finally(() => setMasterDataLoading(false));
      if (statuses?.length > 0) {
        const prevStatuses = sessionStorage?.getItem("statuses");
        const statuesValues = JSON.parse(prevStatuses);
        setStatusesCheckboxes(statuses?.reduce((options, option) => {
          if (statuesValues?.includes(option?.value)) {
            options[option?.label] = true;
          } else {
            options[option?.label] = false;
          }
          return options;
        }, {}));
      }
      if (sortBy === "") {
        const sortedBy = JSON.parse(sessionStorage?.getItem("sortBy")) || [""];
        setSortBy(sortedBy[0]);
      }
      if (priceRange[0] === 1 && priceRange[1] === 5000) {
        const selectedRange = JSON.parse(sessionStorage?.getItem("priceRange")) || [0, 5000];
        setPriceRange(selectedRange);
      }
    }
    fetchMasterData();
  }, [])

  const handleSearchProducts = () => {
    searchProductQueries = { ...searchProductQueries, keywords: searchKeyword }
    setSearchParams({ ...searchProductQueries });
    const categoryIds = searchCategories?.categoryIds;
    if (searchCategories?.categoryIds?.length > 0) {
      searchProductQueries = { ...searchProductQueries, categories: categoryIds }
      setSearchParams({ ...searchProductQueries });
      sessionStorage.setItem("categories", JSON.stringify(categoryIds));
    } else {
      if (categories?.length > 0) {
        delete searchProductQueries?.categories;
        setSearchParams({ ...searchProductQueries });
        sessionStorage.setItem("categories", JSON.stringify(categoryIds));
      }
    }
    const statusValues = searchStatuses?.values;
    if (searchStatuses?.values?.length > 0) {
      searchProductQueries = { ...searchProductQueries, statuses: statusValues }
      setSearchParams({ ...searchProductQueries });
      sessionStorage.setItem("statuses", JSON.stringify(statusValues));
    } else if (statusesCheckboxes["In Stock"] === false && statusesCheckboxes["On Sale"] === false) {
      delete searchProductQueries.statuses;
      setSearchParams({ ...searchProductQueries });
      sessionStorage.setItem("statuses", JSON.stringify(statusValues));
    }
    if (searchBrands?.length > 0) {
      searchProductQueries = { ...searchProductQueries, brands: searchBrands }
      setSearchParams({ ...searchProductQueries });
      sessionStorage.setItem("brands", JSON.stringify(searchBrands));
    } else {
      if (brands?.length > 0) {
        delete searchProductQueries.brands;
        setSearchParams({ ...searchProductQueries });
        sessionStorage.setItem("brands", JSON.stringify(searchBrands))
      }
    }
    if (sortBy?.length > 0) {
      searchProductQueries = { ...searchProductQueries, sortBy: sortBy }
      setSearchParams({ ...searchProductQueries });
      sessionStorage.setItem("sortBy", JSON.stringify([sortBy]));
    }
    if (priceRange[0] === 1 || priceRange[1] === 5000) {
      if (priceRange[0] > 1) {
        searchProductQueries = { ...searchProductQueries, min: priceRange[0] }
        setSearchParams({ ...searchProductQueries });
      }
      if (priceRange[1] < 5000) {
        searchProductQueries = { ...searchProductQueries, max: priceRange[1] }
        setSearchParams({ ...searchProductQueries });
      }
    }
    handleFetchSearch();
  };

  const filterProductByPrice = () => {
    if (priceRange[0] !== 1 || priceRange[1] !== 5000) {
      if (priceRange[0] > 1) {
        searchProductQueries = { ...searchProductQueries, min: priceRange[0] }
        setSearchParams({ ...searchProductQueries });
      }
      if (priceRange[1] < 5000) {
        searchProductQueries = { ...searchProductQueries, max: priceRange[1] }
        setSearchParams({ ...searchProductQueries });
      }
      sessionStorage.setItem("priceRange", JSON.stringify(priceRange));
      setChangedPrice(true);
      handleSearchProducts();
    }
  }

  const handleChangeProductCategory = (mainArrayofObj, checkedObject, propertyName) => {
    const ArrayOfObjects = Object.keys(checkedObject)?.map((key) => ({
      key: key,
      value: checkedObject[key]
    }));
    const selectedOptions = ArrayOfObjects?.filter((option) => option?.value === true);
    const itemsName = selectedOptions?.map((item) => item.key);
    const selectedOptionObjects = mainArrayofObj?.filter(item => itemsName?.includes(item[propertyName]));
    if (propertyName === "name") {
      return {
        names: selectedOptionObjects?.map((object) => object[propertyName]),
        categoryIds: selectedOptionObjects?.map((object) => object._id),
      };
    } else if (propertyName === "label") {
      return {
        labels: selectedOptionObjects?.map((object) => object[propertyName]),
        values: selectedOptionObjects?.map((object) => object?.value),
      };
    } else {
      return selectedOptionObjects?.map((object) => object[propertyName]);
    }
  }

  const searchCategories = handleChangeProductCategory(categories, categoryCheckboxes, "name");
  const searchStatuses = handleChangeProductCategory(statuses, statusesCheckboxes, "label");
  const searchBrands = handleChangeProductCategory(brands, brandsCheckboxes, "brand");

  const handleFetchSearch = () => {
    let sorting;
    let sortOrder;
    if (sortBy.includes("Price")) {
      sorting = "price";
      if (sortBy === "Price Low") {
        sortOrder = "asc";
      } else {
        sortOrder = "desc";
      }
    } else {
      sorting = "createdAt";
      sortOrder = "desc";
    }
    const searchQueries = {
      keyword: searchKeyword?.replace("&", "%26")?.replace(/ /g, "+") || "",
      categories: searchCategories?.categoryIds || [],
      statuses: searchStatuses?.values || [],
      brands: searchBrands || [],
      price: priceRange?.join(",") || "",
      sortBy: sorting || "",
      sortOrder,
    }
    sessionStorage.setItem("searchQueries", JSON.stringify(searchQueries));
    handleSearchProductLists(searchQueries);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (redirectFrom === "Hot_Product") {
      setCategoryCheckboxes({ "Hot Products": true });
      setProducts(hotProducts);
    } else if (redirectFrom === "Best_Seller") {
      setCategoryCheckboxes({ "Best Seller Products": true });
      setProducts(bestSellerProducts);
    } else if (redirectFrom === "New_Products") {
      setSortBy("New Products");
      handleSearchProducts();
    } else {
      handleSearchProducts();
    }
    if (changedPrice) {
      filterProductByPrice();
    } else {
      setChangedPrice(false);
    }
    sessionStorage.setItem("searchProductQueries", JSON.stringify(searchProductQueries));
  }, [categoryCheckboxes, statusesCheckboxes, brandsCheckboxes, sortBy]);

  const handleResetStates = () => {
    setSortBy("");
    setPriceRange([1, 5000]);
    setSearchKeyword("");
    sessionStorage.removeItem("searchKeyword");
    setCategoryCheckboxes(
      categories.reduce((options, option) => {
        options[option.name] = false;
        return options;
      }, {})
    );
    setStatusesCheckboxes(
      statuses.reduce((options, option) => {
        options[option.label] = false;
        return options;
      }, {})
    );
    setBrandsCheckboxes(
      brands.reduce((options, option) => {
        options[option.brand] = false;
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
    handleFetchSearch();
  }

  const handleClearNavigatedProductsFilter = (event) => {
    if (event.target.checked === false) {
      handleClearFilter();
    }
  }

  const propsData = {
    categories,
    handleCheckboxChange,
    categoryCheckboxes,
    setCategoryCheckboxes,
    priceRange,
    setPriceRange,
    filterProductByPrice,
    statuses,
    statusesCheckboxes,
    setStatusesCheckboxes,
    brands,
    brandsCheckboxes,
    setBrandsCheckboxes,
    redirectFrom,
    handleClearNavigatedProductsFilter,
    masterDataLoading,
  };

  return (
    <Box maxWidth="lg" sx={{ mx: "auto", py: 0.5, }}>
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
          {(redirectFrom === "Hot_Product") && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: "none",
                color: "#4D4D4D",
              }}
            >
              Hot Products
            </Typography>
          )}
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
                {searchCategories?.names?.length > 0 && (
                  <Box>
                    <Typography sx={{ fontWeight: "600" }} variant="subtitle2">Search In: </Typography>
                    {searchCategories?.names.map((item, index) => (
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

                {searchStatuses?.labels?.length > 0 && (
                  <Box>
                    <Typography sx={{ fontWeight: "600" }} variant="subtitle2">Status With: </Typography>
                    {searchStatuses?.labels?.map((item, index) => (
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
                {searchBrands?.length > 0 && (
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: "600" }} variant="subtitle2">Product From: </Typography>
                    {searchBrands.map((item, index) => (
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
                      display: (redirectFrom === "Hot_Product") && "none",
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
              justifyContent="flex-start"
              alignItems="stretch"
            >
              {!isLoading ? (
                <>
                  {products?.length > 0 ? products?.map((item) => (
                    <Grid key={item.productCode} item xs={12} sm={6} md={3}>
                      <ProductCard product={item} />
                    </Grid>
                  )) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant='subtitle1'
                        sx={{
                          fontSize: "1.5rem",
                          fontWeight: 600,
                          color: "#202435",
                          mx: "auto",
                        }}
                      >
                        Search result not found!
                      </Typography>
                    </Box>
                  )}
                </>
              ) : (
                <Box sx={{ mx: "auto", mt: "5rem", pr: { md: 20, xs: 5, sm: 8 } }}>
                  <CircularProgress disableShrink />
                </Box>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;