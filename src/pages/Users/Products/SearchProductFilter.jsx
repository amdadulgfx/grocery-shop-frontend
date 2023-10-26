import { Box, Button, Checkbox, FormControl, FormControlLabel, Slider, Typography } from '@mui/material';
import React from 'react';

const SearchProductFilter = (props) => {
  const {
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
  } = props;
  if (!masterDataLoading) {
    return (
      <>
        {(redirectFrom?.length > 0 && !redirectFrom === "New_Products") ? (
          <>
            <Box>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: "600" }}
              >
                PRODUCT CATEGORIES
              </Typography>
              {(redirectFrom === "Hot_Product") ? (
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={(event) => handleClearNavigatedProductsFilter(event)}
                        name="Hot Products"
                      />
                    }
                    label="Hot Products"
                  />
                </FormControl>
              ) : (<></>)}
              {/* {    console.log(redirectFrom)} */}
              {(redirectFrom === "Best_Seller") ? (
                <FormControl component="fieldset">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={(event) => handleClearNavigatedProductsFilter(event)}
                        name="Best Seller Products"
                      />
                    }
                    label="Best Seller Products"
                  />
                </FormControl>
              ) : (<></>)}
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Typography
                variant='subtitle1'
                sx={{ fontWeight: "600" }}
              >
                PRODUCT CATEGORIES
              </Typography>
              <FormControl component="fieldset">
                {categories.map((option, index) => (
                  <FormControlLabel
                    key={option?.name}
                    control={
                      <Checkbox
                        checked={categoryCheckboxes[option?.name]}
                        onChange={(event) => handleCheckboxChange(event, setCategoryCheckboxes)}
                        name={option?.name}
                      />
                    }
                    label={option?.name}
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
                  onClick={() => filterProductByPrice()}
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
                    key={option?.label}
                    control={
                      <Checkbox
                        checked={statusesCheckboxes[option?.label]}
                        onChange={(event) => handleCheckboxChange(event, setStatusesCheckboxes)}
                        name={option?.label}
                      />
                    }
                    label={option?.label}
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
                    key={option?.brand}
                    control={
                      <Checkbox
                        checked={brandsCheckboxes[option?.brand]}
                        onChange={(event) => handleCheckboxChange(event, setBrandsCheckboxes)}
                        name={option?.brand}
                      />
                    }
                    label={option?.brand}
                  />
                ))}
              </FormControl>
            </Box>
          </>
        )}
      </>
    );
  };

};

export default SearchProductFilter;