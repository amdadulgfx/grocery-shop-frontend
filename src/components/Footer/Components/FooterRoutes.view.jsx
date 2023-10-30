import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useKeywords } from '../../../context/searchContext';
import { useSearchProductsListMutation } from '../../../reduxMine/features/searchProducts/searchProductsAPI';

const FooterRoutes = (props) => {
    const navigate = useNavigate();
    const { setSearchKeyword, setProducts, handleSearchProductLists } = useKeywords();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchProductsList, { data }] = useSearchProductsListMutation();
    const pathname = window.location.pathname;

    const handleSearchRedirect = (section) => {
        setSearchKeyword(section?.name);
        sessionStorage.setItem("searchKeyword", JSON.stringify({ searchKeyword: section?.name }));
        if (pathname === "/products") {
            const searchProductQueries = JSON.parse(sessionStorage.getItem("searchProductQueries")) || {};
            const searchQueries = JSON.parse(sessionStorage.getItem("searchQueries")) || {};
            setSearchParams({ ...searchProductQueries, keywords: section?.name });
            handleSearchProductLists({ ...searchQueries, keyword: section?.name?.replace("&", "%26")?.replace(/ /g, "+") || "" });
            window.scrollTo(0, 0);
        } else {
            navigate("/products");
        }
    }
    return (
        <Box sx={boxStyle}>
            <Grid container rowSpacing={4.5} columnSpacing={3}>
                {footerLinks?.map((footerlink) => (
                    <Grid key={footerlink?.id} item xs={12} sm={6} md={3}>
                        <Typography sx={linkTitleStyle} >{footerlink?.title}</Typography>
                        <Box>
                            {footerlink?.links?.map((section) => (
                                <Box key={section?.id} sx={{ marginBottom: 1 }}>
                                    <Typography
                                        variant="body2"
                                        onClick={() => handleSearchRedirect(section)}
                                        sx={{
                                            ...linkStyle,
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: "#313131"
                                            },
                                        }}
                                    >
                                        {section?.name}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>))}
            </Grid>
        </Box>
    );
};

export default FooterRoutes;


const footerLinks = [
    {
        title: "FRUIT & VEGETABLES",
        links: [
            { name: "Fresh Vegetables", path: "/", id: 1 },
            { name: "Herbs & Seasonings", path: "/", id: 2 },
            { name: "Fresh Fruits", path: "/", id: 3 },
            // { name: "Cuts & Sprouts", path: "/", id: 4 },
            // { name: "Exotic Fruits & Veggies", path: "/", id: 5 },
            // { name: "Packaged Produce", path: "/", id: 6 },
            // { name: "Party Trays", path: "/", id: 7 },
        ],
        id: 1
    },
    /*  {
         title: "BREAKFAST & DAIRY",
         links: [
             { name: "Milk & Flavoured Milk", path: "/", id: 1 },
             { name: "Butter and Margarine", path: "/", id: 2 },
             { name: "Cheese", path: "/", id: 3 },
             { name: "Eggs Substitutes", path: "/", id: 4 },
             // { name: "Honey", path: "/", id: 5 },
             // { name: "Marmalades", path: "/", id: 6 },
             // { name: "Sour Cream and Dips", path: "/", id: 7 },
             // { name: "Yogurt", path: "/", id: 8 },
         ],
         id: 2
     }, */
    {
        title: "MEAT & SEAFOOD",
        links: [
            { name: "Breakfast Sausage", path: "/", id: 1 },
            { name: "Dinner Sausage", path: "/", id: 2 },
            { name: "Beef", path: "/", id: 3 },
            { name: "Chicken", path: "/", id: 4 },
            // { name: "Sliced Deli Meat", path: "/", id: 5 },
            // { name: "Shrimp", path: "/", id: 6 },
            // { name: "Wild Caught Fillets", path: "/", id: 7 },
            // { name: "Crab and Shellfish", path: "/", id: 8 },
            // { name: "Farm Raised Fillets", path: "/", id: 9 },
        ],
        id: 3
    },
    {
        title: "BEVERAGES",
        links: [
            { name: "Water", path: "/", id: 1 },
            { name: "Sparkling Water", path: "/", id: 2 },
            { name: "Soda & Pop", path: "/", id: 3 },
            { name: "Coffee", path: "/", id: 4 },
            // { name: "Milk & Plant-Based Milk", path: "/", id: 5 },
            // { name: "Tea & Kombucha", path: "/", id: 6 },
            // { name: "Drink Boxes & Pouches", path: "/", id: 7 },
            // { name: "Craft Beer", path: "/", id: 8 },
            // { name: "Wine", path: "/", id: 9 },
        ],
        id: 4
    },
    {
        title: "BREADS & BAKERY",
        links: [
            { name: "Milk & Flavoured Milk", path: "/", id: 1 },
            { name: "Butter and Margarine", path: "/", id: 2 },
            { name: "Cheese", path: "/", id: 3 },
            { name: "Eggs Substitutes", path: "/", id: 4 },
            // { name: "Honey", path: "/", id: 5 },
            // { name: "Marmalades", path: "/", id: 6 },
            // { name: "Sour Cream and Dips", path: "/", id: 7 },
            // { name: "Yogurt", path: "/", id: 8 }
        ],
        id: 5
    },
];

const boxStyle = {
    px: { xs: 2, sm: 2, md: 6 },
    py: { xs: 4, sm: 4, md: 6 },
    backgroundColor: "#F7F8FD"
};

const linkTitleStyle = {
    mb: 1.25,
    fontSize: ".9375rem",
    fontWeight: 600,
    color: "#202435"
};

const linkStyle = {
    color: "#7177AA",
    textDecoration: "none"
}