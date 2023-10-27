import Typography from '@mui/material/Typography';
import { Box, Breadcrumbs, Collapse, Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Interweave } from 'interweave';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const FAQ = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openedItemId, setOpenedItemId] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  document.title = "FAQ's | Grocery Heaven"


  useEffect(() => {
    window?.scrollTo(0, 0);
  }, [pathname]);

  const handleClick = orgEvent => {
    let clickedItemId = orgEvent.currentTarget.id;
    if (openedItemId === clickedItemId) {
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
  };

  // -------------------------------UI return--------------------------------------------
  return (
    <Box sx={{ backgroundColor: "#FAFAFA", my: -10, py: 10 }}>
      <Box>
        {matches && (
          <Box
            sx={{
              backgroundColor: "var(--clr-blue-light)",
              padding: "15px 0 15px 17px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <>
              <ArrowBackIcon sx={{ color: "var(--clr-blue-footer)", mr: 3.1 }} onClick={() => navigate(-1)} />
              <Typography
                variant="h6"
                sx={{
                  lineHeight: "24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--clr-blue-footer)",
                }}
              >
                FAQ's
              </Typography>
            </>
          </Box>
        )}
        <Box maxWidth="xl" sx={{ mx: "auto", px: matches ? 1.25: 6, mb: 6 }}>
          {/* --------------------------start of breadcrumb-------------------------------- */}
         {!matches && <Breadcrumbs
            separator={<NavigateNextIcon sx={{ color: "var(--clr-blue-footer)" }} fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ marginTop: "15px" }}
            style={{ marginBottom: "15px" }}
          >
            <Link
              underline="hover"
              style={{ color: "var(--clr-blue-footer)" }}
              to="/"
            >
              Home
            </Link>

            <Typography sx={{ color: "var(--clr-blue-footer)" }}>
              Frequently Asked Questions
            </Typography>
          </Breadcrumbs>}

          {/* -----------------start of collapsible accordion--------------------------- */}
          <Box>
           {!matches && <Typography variant="h1" sx={{ fontWeight: "700", color: "#395987", mb: "40px", fontSize: "24px" }}>
              {/* Frequently Asked Questions */} FAQ's
            </Typography>}

            {/* ---------------------------map rendering started--------------------------- */}
            {faqData?.map((data) =>
              <Grid
                container
                spacing={2}
                key={data?.faqID}
                sx={{
                  backgroundColor: openedItemId === `${data.faqID}` ? "#E4EEF5" : "#FFFFFF",
                  border: "1px solid var(--clr-blue-light)",
                  borderRadius: data.faqID === 1 ? "8px 8px 0px 0px" : data.faqID === 4 ? "0px 0px 8px 8px" : "",
                  mt: "1px", padding: "15px"
                }}
              >
                <Grid item xs={1.5} md={1.5}>
                  <Typography sx={{ fontSize: matches ? "30px" : "48px", fontFamily: "Inter", opacity: .5, fontWeight: 700, textAlign: "center" }}>
                    {data.faqID}
                  </Typography>
                </Grid>
                <Grid item xs={7.5} md={9.5}>
                  <Typography
                    onClick={handleClick}
                    id={data.faqID}
                    sx={{ fontSize: "18px", fontFamily: "Open Sans", color: "#395987", mb: "26px" }}
                  >
                    {data.title}
                  </Typography>
                  <Collapse in={openedItemId === `${data.faqID}`} timeout="auto" unmountOnExit>
                    <Box sx={{ mb: "52px", fontSize: "14px", fontWeight: 400 }}>
                      <Interweave content={data?.description} />
                    </Box>
                  </Collapse>
                </Grid>
                <Grid item xs={3} md={1}>
                  {openedItemId === `${data.faqID}` ? (
                    <IconButton disableRipple={true} sx={{"&:hover":{background: 'none'}}} onClick={handleClick}>
                      <RemoveCircleIcon
                        sx={{
                          height: "35px",
                          width: "40px",
                          color: "#395987",
                        }}
                      />
                    </IconButton>
                  ) : (
                    <IconButton disableRipple={true} sx={{"&:hover":{background: 'none'}}}  id={data.faqID} onClick={handleClick}>
                      <AddCircleIcon
                        style={{
                          height: "35px",
                          width: "40px",
                          color: "#E4EEF5",
                        }}
                      />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            )}
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default FAQ;


const faqData = [
  {
      "faqID": 1,
      "title": "How can I log in to my Grocery Heaven account?",
      "description": "To log in to your Grocery Heaven account, go to the website or app and click on the 'Login' button. Enter your registered email address and password, then click 'Sign In.' If you've forgotten your password, you can use the 'Forgot Password' option to reset it."
  },
  {
      "faqID": 2,
      "title": "Is there an admin login for managing Grocery Heaven?",
      "description": "Yes, there is an admin login for managing Grocery Heaven. The admin credentials are provided to authorized personnel. Admins have access to functions like product management, order processing, and user account management."
  },
  {
      "faqID": 3,
      "title": "How can I search for products on the Grocery Heaven website?",
      "description": "To search for products, use the search bar on the Grocery Heaven's website or app. Enter keywords like product name, category, or brand, and click 'Search.' You can also use filters to refine your search results."
  },
  {
      "faqID": 4,
      "title": "What is the process for order processing at Grocery Heaven?",
      "description": "Order processing at Grocery Heaven involves several steps. First, add the desired products to your cart, then proceed to the checkout. Provide your delivery details and payment information. Review the order, and once confirmed, Grocery Heaven will process it and notify you of the delivery or pickup details."
  },
  {
      "faqID": 5,
      "title": "How can I post new products as an admin at Grocery Heaven?",
      "description": "As an admin at Grocery Heaven, you can post new products by logging into the admin panel. Use the 'Add Product' option to enter product details, including name, description, price, and images. Once submitted, the new products will be visible to customers."
  },
  {
      "faqID": 6,
      "title": "Can I reset my password if I forget it at Grocery Heaven?",
      "description": "Yes, if you forget your password at Grocery Heaven, you can reset it by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password. Follow the provided link to create a new password."
  },
  {
      "faqID": 7,
      "title": "Is there a way to track the status of my orders at Grocery Heaven?",
      "description": "Yes, you can track the status of your orders at Grocery Heaven by logging into your account. Go to the 'Order History' section, where you'll find information about the status of your recent and past orders, including order processing, delivery, and estimated delivery times."
  },
  {
      "faqID": 8,
      "title": "What payment methods are accepted for orders at Grocery Heaven?",
      "description": "Grocery Heaven accepts various payment methods for orders, including credit cards, debit cards, digital wallets, and cash on delivery. You can choose your preferred payment option during the checkout process."
  },
  {
      "faqID": 9,
      "title": "How can I update my delivery address at Grocery Heaven?",
      "description": "To update your delivery address at Grocery Heaven, go to your account settings and select 'Manage Addresses.' Here, you can add, edit, or delete delivery addresses. Make sure to set the correct address before confirming your order."
  },
  {
      "faqID": 10,
      "title": "What should I do if I receive a damaged product from Grocery Heaven?",
      "description": "If you receive a damaged product from Grocery Heaven, please contact our customer support immediately. Provide details about the issue, and we will assist you in resolving the problem, whether it's a refund, replacement, or another suitable solution."
  },
  {
      "faqID": 11,
      "title": "How can I reach customer support for assistance at Grocery Heaven?",
      "description": "You can reach our customer support team at Grocery Heaven by using the 'Contact Us' option on our website or app. Alternatively, you can find our contact details in the 'Support' section. Our team is here to help you with any questions or issues you may have."
  },
  {
      "faqID": 12,
      "title": "Are there any delivery charges associated with orders at Grocery Heaven?",
      "description": "The delivery charges at Grocery Heaven may vary based on your location, order size, and delivery preferences. You can view the delivery charges during the checkout process before confirming your order. Some orders may also qualify for free delivery, depending on promotions and order values."
  }
];
