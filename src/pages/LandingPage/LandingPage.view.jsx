import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import HealthTips from "./Components/HealthTips";
import Coupon from "./Components/Coupon";
import Categories from "./Components/CategoriesBottom";
import DiscountCard from "./Components/DiscountCard";
import AdvertisementAndAllCategory from "./Components/AdvertisementAndAllCategory.view";


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
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  console.log(heroMasterData);

  return (
    <>
      <Box sx={{ mx: "auto", my: 5, px: 3, py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <AdvertisementAndAllCategory />
          </Grid>
          <Grid item xs={9}>
            <Box>
              <Typography variant="subtitle2">
                {titles.subTitle.toUpperCase()}
                <span>{titles.offer.toUpperCase()}</span>
              </Typography>
              <Typography variant="h3">{titles.heading}</Typography>
              <Typography variant="subtitle1">{titles.message}</Typography>
              <Typography variant="h5">from {titles.price}</Typography>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: 16,
                  px: 3,
                }}
              >
                Shop Now &nbsp;
                <ArrowRightAltIcon />
              </Button>
            </Box>
            <HealthTips />
            <Coupon />
            <DiscountCard />
            <Categories />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
