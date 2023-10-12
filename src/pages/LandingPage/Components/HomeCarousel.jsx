import { Box, Button, Grid, IconButton, Paper, Typography, } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import sliderImg1 from "./../../../assets/landingPage/slider-image-1.jpg"
import sliderImg2 from "./../../../assets/landingPage/slider-image-2.jpg"
import sliderImg3 from "./../../../assets/landingPage/slider-image-3.jpg"
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  offerType: {
    color: "#444654 !important",
    fontSize: "0.7rem",
    margin: "5px 5px 20px !important",
  },
  offerAmount: {
    background: "linear-gradient(to right, #C3E7D7, #E8F0F0)",
    padding: "4px 12px",
    margin: "0px 12px",
    borderRadius: "1rem",
    fontWeight: "600",
    color: "#F28282",
  },
  offerHeading: {
    color: "#343541",
    fontSize: "2rem",
    fontWeight: "600 !important",
  },
  offerSubTitle: {
    color: "#444654",
    fontSize: "1rem",
    fontWeight: "600 !important",
  },
  offerPrice: {
    color: "#D51243",
    fontSize: "2.2rem !important",
    fontWeight: "600 !important",
    margin: "25px 0 !important",
  }

}));

const HomeCarousel = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselData, setCarouselData] = useState([])

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? CarouselDatas.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === CarouselDatas.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const apiUrl = `http://localhost:5000/api/v1/heroMasterData`;
    axios.get(apiUrl)
      .then(response => setCarouselData(response?.data?.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  return (
    <Box>
      <Paper
        className={classes.commentBox}
        style={{
          backgroundImage: `url(${carouselData[currentIndex]?.img})`,
          backgroundSize: "cover",
          height: "auto",
          padding: "60px 50px 100px",
          position: "relative"
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography className={classes.offerType} variant="subtitle2">
              {"Exclusive offer".toUpperCase()}
              <span className={classes.offerAmount}>
                -{carouselData[currentIndex]?.offerPercentage}% OFF
              </span>
            </Typography>
            <Typography className={classes.offerHeading} variant="h3">
              {carouselData[currentIndex]?.title}
            </Typography>
            <Typography className={classes.offerSubTitle} variant="subtitle1">
              Only this week. Don't miss...
            </Typography>
            <Typography className={classes.offerPrice} variant="h5">
              <span style={{ fontSize: "14px", marginRight: "-5px" }}>from</span> 
              ${carouselData[currentIndex]?.startPrice}
              </Typography>
            <Button
              onClick={() => navigate(`/products/${carouselData[currentIndex]?._id}`)}
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 16,
                px: 3,
                py: 1,
              }}
            >
              Shop Now &nbsp;
              <ArrowRightAltIcon />
            </Button>
          </Grid>
          <Grid item md={6} alignSelf="end">
            <Box sx={{ mb: -7, position: "absolute", top: "50%", left: 10 }}>
              <IconButton
                size="small"
                sx={{ backgroundColor: "#FFFFFF", "&:hover": { backgroundColor: "#FFFFFF" } }}
                onClick={handlePrevClick}
              >
                <NavigateBeforeIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ mb: -7, position: "absolute", top: "50%", right: 10 }}>
              <IconButton
                size="small"
                sx={{ backgroundColor: "#FFFFFF", "&:hover": { backgroundColor: "#FFFFFF" } }}
                onClick={handleNextClick}
              >
                <NavigateNextIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default HomeCarousel;

const CarouselDatas = [
  {
    id: "01",
    subTitle: "Exclusive offer",
    offer: "-20% off",
    heading: "Specialist in the grocery store",
    message: "Only this week. Don't miss...",
    price: "$7.99",
    route: "/shop",
    bgImgSrc: sliderImg1,
  },
  {
    id: "02",
    subTitle: "Exclusive offer",
    offer: "-30% off",
    heading: "Feed your family the best",
    message: "Only this week. Don't miss...",
    price: "$8.99",
    route: "/shop",
    bgImgSrc: sliderImg2,
  },
  {
    id: "03",
    subTitle: "Exclusive offer",
    offer: "-40% off",
    heading: "Grocery full of inspiration",
    message: "Only this week. Don't miss...",
    price: "$6.99",
    route: "/shop",
    bgImgSrc: sliderImg3,
  },
];