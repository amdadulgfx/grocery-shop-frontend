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


// const titles = {
//   subTitle: "Exclusive offer",
//   offer: "-20% off",
//   heading: "Specialist in the grocery store",
//   message: "Only this week. Don't miss...",
//   price: "$7.99",
//   route: "/products",
// };

const LandingPage = () => {
  const [heroMasterData, setHeroMasterData] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/heroMasterData"
        );
        setHeroMasterData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        // setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(heroMasterData);

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
