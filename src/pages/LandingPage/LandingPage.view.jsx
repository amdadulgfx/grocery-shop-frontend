import { Box, Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import HealthTips from "./Components/HealthTips";
import Coupon from "./Components/Coupon";
import Categories from "./Components/CategoriesBottom";
import DiscountCard from "./Components/DiscountCard";
import AdvertisementAndAllCategory from "./Components/AdvertisementAndAllCategory.view";
import HomeCarousel from "./Components/HomeCarousel";
import BestSellers from "./Components/BestSellers";
import NewProducts from "./Components/NewProducts";
import HotProducts from "./Components/HotProducts";


const LandingPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4}}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} order={matches ? 2 : 1}>
            <AdvertisementAndAllCategory />
          </Grid>
          <Grid item xs={12} md={9} order={matches ? 1 : 2} sx={{mt: 2.5}}>
            <Box>
              <HomeCarousel />
            </Box>
            <BestSellers />
            <HealthTips />
            <HotProducts />
            <Coupon />
            <NewProducts />
            <DiscountCard />
          </Grid>
        </Grid>
        <Categories />
      </Box>
    </Container>
  );
};

export default LandingPage;
