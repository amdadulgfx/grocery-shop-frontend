import React from "react";
import { Typography, Box } from "@mui/material";

const Categories = () => {
  const categories = [
    {
      id: 1,
      category: "Beverages",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/05/baverages-1.jpg",
      totalItem: 11,
    },
    {
      id: 2,
      category: "Biscuits & Snacks",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/05/biscuitssnacks-1.jpg",
      totalItem: 6,
    },
    {
      id: 3,
      category: "Breads & Bakery",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/05/breadbakery-1.jpg",
      totalItem: 6,
    },
    {
      id: 4,
      category: "Breakfast & Dairy",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/05/dairy-1.jpg",
      totalItem: 8,
    },
    {
      id: 5,
      category: "Frozen Foods",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/04/category-image4.png",
      totalItem: 8,
    },
    {
      id: 6,
      category: "Fruits & Vegetables",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/05/fruitvegetables-1.jpg",
      totalItem: 12,
    },
    {
      id: 7,
      category: "Grocery & Staples",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/04/category-image2.png",
      totalItem: 12,
    },
    {
      id: 8,
      category: "Household Needs",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/05/household-1.jpg",
      totalItem: 1,
    },
    {
      id: 9,
      category: "Meats & Seafood",
      image:
        "https://klbtheme.com/bacola/wp-content/uploads/2021/05/meat-1.jpg",
      totalItem: 5,
    },
  ];
  const [beverage, ...otherCategories] = categories;

  const style = {
    regularCategories: {
      padding: "1.25rem",
      border: ["none", "1px solid #e4e5ee"],
      textAlign: "center",
      display: "flex",
      width: ["50%", "33.33%", "25%"],
      boxSizing: "border-box",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #e4e5ee",
          display: "flex",
          flexDirection: ["column", "row"],
          // margin: ["1rem", "3rem", "5rem"],
          mt: "3rem"
        }}
      >
        <Box
          sx={{
            border: "1px solid #e4e5ee",
            textAlign: "center",
            width: ["100%", "30%"],
          }}
        >
          <Box padding="1.25rem">
            <img
              style={{
                height: "12rem",
                width: "12rem",
              }}
              src={beverage.image}
              alt=""
            />

            <Typography
              sx={{
                fontSize: ".875rem",
                fontWeight: "600",
              }}
            >
              {beverage.category}
            </Typography>
            <Typography variant="caption" display="block" color="#a18f96">
              {beverage.totalItem} Items
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: ["100%", "70%"],
          }}
        >
          {otherCategories?.map((category) => (
            <Box key={category.id} sx={style.regularCategories}>
              <img height="70" width="70" src={category?.image} alt="" />
              <Box>
                <Typography
                  sx={{
                    fontSize: ".875rem",
                    fontWeight: "600",
                  }}
                >
                  {category?.category}
                </Typography>
                <Typography variant="caption" display="block" color="#a18f96">
                  {category?.totalItem} Items
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Categories;
