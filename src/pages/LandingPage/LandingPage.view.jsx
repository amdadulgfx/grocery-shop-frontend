import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Categories from "./CategoriesBottom";
import Coupon from "./Coupon";

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
      <Box maxWidth="md" sx={{ mx: "auto", my: 5 }}>
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
      </Box>
      <Coupon />
      <Categories />
    </>
  );
};

export default LandingPage;
