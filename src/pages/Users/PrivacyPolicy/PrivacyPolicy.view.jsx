import { Box, Breadcrumbs, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PrivacyPolicy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  document.title = "Privacy Policy | Grocery Heaven";

  useEffect(() => {
    window?.scrollTo(0, 0);
  }, []);

  let hashLink = location?.hash;

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
                Privacy Policy
              </Typography>
            </>
          </Box>
        )}
        <Box sx={{ mx: "auto", px: matches ? "12px" : "60px", py: 1 }}>
          {!matches && <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: "#395987" }} />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              style={{ color: "#395987", fontSize: "14px" }}
              to="/"
            >
              Home
            </Link>
            <Typography sx={{ color: "#395987", fontSize: "14px" }}>
              Privacy Policy
            </Typography>
          </Breadcrumbs>}
          {!matches && 
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: matches ? "22px" : "24px",
                color: "#395987",
                fontWeight: "600",
                mt: matches ? 1.2 : 2,
                mb: 2,
              }}
            >
              Privacy Policy
            </Typography>
          </Box> }
          <Box
            sx={{
              boxShadow: "0px 9px 18px rgba(69, 143, 246, 0.09)",
              borderRadius: "6px",
              mb: matches ? "10px" : "15px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                pl: matches ? "10px" : "30px",
                pr: matches ? "10px" : "30px",
                pt: matches ? "18px" : "25px",
                mb: matches ? "14px" : "20px",
              }}
            >
              <Box>
                <Typography sx={{
                  fontSize: "18px",
                  color: "#395987",
                  fontWeight: "600",
                  mt: "10px"
                }}
                >
                  Introduction
                </Typography>
                <Typography sx={{
                  fontSize: "18px",
                  color: "#4F4F4F",
                  fontWeight: "400",
                  pt: "19px",
                  textAlign: "justify"
                }}
                >
                  This is the Privacy Policy for Grocery Heaven. In this policy, we outline how we collect, use, and protect your personal information when you interact with our website and services.
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "600", py: 1.5, fontsize: "18px", color: "#4F4F4F" }}>
                  Two important things to note at the outset:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "19px",
                    textAlign: "justify",
                    pl: 6,
                    pb: 1,
                  }}
                >
                  <ul>
                    <li>
                      Your privacy is important to us, and we are committed to protecting your personal information.
                    </li>
                    <li>
                      By using our services, you agree to the terms of this Privacy Policy.
                    </li>
                  </ul>
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ py: 1.5, fontSize: "18px", color: "#4F4F4F" }}>
                  This Privacy Policy applies to information we collect:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "19px",
                    textAlign: "justify",
                    pl: 6,
                    pb: 1,
                  }}
                >
                  <ul>
                    <li>
                      When you use our website or services.
                    </li>
                    <li>
                      When you interact with us or provide information to us.
                    </li>
                    <li>
                      Through cookies and similar technologies.
                    </li>
                  </ul>
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "600", py: 1.5, fontsize: "18px", color: "#4F4F4F" }}>
                  Information We Collect
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "19px",
                    textAlign: "justify",
                    pl: 6,
                    pb: 1,
                  }}
                >
                  We may collect various types of information, including personal and non-personal information. This information helps us improve our services and tailor them to your needs.
                </Typography>
                <Typography variant="body1" sx={{ py: 1.5, fontSize: "18px", color: "#4F4F4F" }}>
                  At Grocery Heaven, we collect the following types of information:
                </Typography>
                <Typography variant="body1" sx={{ py: 1.5, fontSize: "18px", color: "#4F4F4F" }}>
                  1. Personal Information:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "19px",
                    textAlign: "justify",
                    pl: 6,
                    pb: 1,
                  }}
                >
                  When you use our services, we may collect the following personal information:
                  <ul>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Address</li>
                    <li>Payment information (credit card, etc.)</li>
                  </ul>
                </Typography>
                <Typography variant="body1" sx={{ py: 1.5, fontSize: "18px", color: "#4F4F4F" }}>
                  2. Non-Personal Information:
                </Typography>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#4F4F4F",
                    fontWeight: "400",
                    pt: "19px",
                    textAlign: "justify",
                    pl: 6,
                    pb: 1,
                  }}
                >
                  We also collect non-personal information that does not directly identify you. This includes:
                  <ul>
                    <li>Browser information</li>
                    <li>Operating system</li>
                    <li>Device type</li>
                    <li>Log data (IP address, page views, etc.)</li>
                  </ul>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
