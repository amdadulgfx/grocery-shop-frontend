import { Box, Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import HealthTips from "./Components/HealthTips";
import Coupon from "./Components/Coupon";
import Categories from "./Components/CategoriesBottom";
import DiscountCard from "./Components/DiscountCard";
import AdvertisementAndAllCategory from "./Components/AdvertisementAndAllCategory.view";
import HomeCarousel from "./Components/HomeCarousel";


const titles = {
  subTitle: "Exclusive offer",
  offer: "-20% off",
  heading: "Specialist in the grocery store",
  message: "Only this week. Don't miss...",
  price: "$7.99",
  route: "/shop",
};

const LandingPage = () => {
  const [heroMasterData, setHeroMasterData] = useState([]);
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
    <Container maxWidth="lg" sx={{ py: 0.5, }}>
      <Box sx={{ /* mx: ["auto", "2rem"], */ my: 5,/*  px: 3, */ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <AdvertisementAndAllCategory />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box>
              <HomeCarousel />
              
            </Box>
            <HealthTips />
            <Coupon />
            <DiscountCard />
          </Grid>
        </Grid>
        <Categories />
      </Box>
    </Container>
  );
};

export default LandingPage;
