import { Box, Button, Typography } from '@mui/material'
import React from 'react'

function DiscountCard() {
    const discountDetails = [
        {
            discountPercentage: 40,
            title: "Legumes & Cereals",
            description: "Feed your family best",
            image: "https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-01.jpg",
        },
        {
            discountPercentage: 40,
            title: "Dairy & Eggs",
            description: "A different kind of grocery store",
            image: "https://klbtheme.com/bacola/wp-content/uploads/2021/08/bacola-banner-02.jpg",
        },
    ]

    return (
        <Box sx={{
            display: ["block", "flex"],
            justifyContent: "space-between",
            m: "auto"
        }}>
            {discountDetails.map((item, index) =>
                <Box
                    key={index + 1}
                    sx={{
                        backgroundImage: `url("${item.image}")`,
                        backgroundRepeat: "no-repeat",
                        borderRadius: "0.8rem",
                        // width: ["21rem", "26.25rem"],
                        width: ["90%", "42%", "44%"],
                        height: "13.375rem",
                        paddingLeft: "2.5rem",
                        mb: [2, 0],
                        display: "flex",
                        alignItems: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <Box>
                        <Typography sx={{
                            color: "#00b853",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            mb: 1
                        }}>
                            WEEKEND DISCOUNT {" "}
                            {item.discountPercentage}%
                        </Typography>
                        <Typography sx={{
                            color: "#202435",
                            fontSize: "1.3rem",
                            fontWeight: "600",
                            mb: 1
                        }}>
                            {item.title}
                        </Typography>
                        <Typography sx={{
                            mb: 2,
                            color: "#adaec2",
                            fontSize: "0.91rem"
                        }}>
                            {item.description}
                        </Typography>
                        <Button sx={{
                            color: "#fcfcfd",
                            backgroundColor: "#c2c2d3",
                            borderRadius: "2rem",
                            textTransform: "none",
                            fontWeight: "600",
                            padding: "0.35rem 1.1rem",
                            '&:hover': { backgroundColor: "#c2c2d3" }
                        }}>Shop Now</Button>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default DiscountCard