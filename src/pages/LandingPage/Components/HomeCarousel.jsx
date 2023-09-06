import { Box, Button, Grid, IconButton, Paper, Typography, } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import sliderImg1 from "./../../../assets/landingPage/slider-image-1.jpg"
import sliderImg2 from "./../../../assets/landingPage/slider-image-2.jpg"
import sliderImg3 from "./../../../assets/landingPage/slider-image-3.jpg"
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  offerType: {
    color: "#444654 !important",
    fontSize: "0.8rem",
    fontWeight: "600 !important",
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
    color: "#343541",
    fontSize: "1.5rem !important",
    fontWeight: "600 !important",
    margin: "25px 0 !important",
  }

}));



const HomeCarousel = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === CarouselDatas.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change comment every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {/* {CarouselDatas?.map(item => ( */}

      <Paper
        className={classes.commentBox}
        style={{
          backgroundImage: `url(${CarouselDatas[currentIndex].bgImgSrc})`,
          backgroundSize: "cover",
          height: "auto",
          padding: "60px 50px 100px"
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Typography className={classes.offerType} variant="subtitle2">
              {CarouselDatas[currentIndex].subTitle.toUpperCase()}
              <span className={classes.offerAmount}>{CarouselDatas[currentIndex].offer.toUpperCase()}</span>
            </Typography>
            <Typography className={classes.offerHeading} variant="h3">{CarouselDatas[currentIndex].heading}</Typography>
            <Typography className={classes.offerSubTitle} variant="subtitle1">{CarouselDatas[currentIndex].message}</Typography>
            <Typography className={classes.offerPrice} variant="h5">from {CarouselDatas[currentIndex].price}</Typography>
            <Button
              onClick={() => navigate(CarouselDatas[currentIndex].route)}
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
            {/* <Box sx={{mb: -7}}>
              <IconButton onClick={handlePrevClick}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton onClick={handleNextClick}>
                <ArrowForwardIcon />
              </IconButton>
            </Box> */}

          </Grid>

        </Grid>

      </Paper>
      {/* ))} */}
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