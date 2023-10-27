import React from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { TypographyHeadingOne, TypographyParagraph, TypographySubtitle } from '../../../CustomTags';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ContactForm from './Components/ContactForm';

const ContactUs = () => {
  document.title = "Contact Us | Grocery Heaven"

  return (
    <Box sx={{ bgcolor: "#FAFAFA", pb: 10, px: 2 }}>
      <Box maxWidth="lg" sx={{ mx: "auto" }}>
        <Box sx={{ py: 3, mb: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <TypographyHeadingOne>
              Get In Touch
            </TypographyHeadingOne>
            <TypographyParagraph sx={{ py: 1, color: "#0c0c0c" }}>
              Thank you for your interest in Grocery Heaven. We're here to assist you with any questions, concerns, or feedback you may have. Please don't hesitate to reach out to us using the following contact information:
            </TypographyParagraph>
          </Box>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
          >
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  backgroundColor: "#F3F3F6",
                  border: "1px solid #eeeeee",
                  borderRadius: 1,
                  py: 4
                }}
              >
                <FmdGoodIcon sx={{ color: "#233A95", fontSize: "2.5rem" }} />
                <TypographySubtitle sx={{ color: "#0c0c0c", fontSize: "1.2rem", py: 2 }}>
                  102 Street 2714 Donovan
                </TypographySubtitle>
                {/* <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, }}>
                  Lorem ipsum dolar site amet discont
                </TypographyParagraph> */}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  backgroundColor: "#F3F3F6",
                  border: "1px solid #eeeeee",
                  borderRadius: 1,
                  py: 4
                }}
              >
                <CallIcon sx={{ color: "#233A95", fontSize: "2.5rem" }} />
                <TypographySubtitle sx={{ color: "#0c0c0c", fontSize: "1.2rem", py: 2 }}>
                  +02 1234 567 88
                </TypographySubtitle>
                {/* <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, }}>
                  Lorem ipsum dolar site amet discont
                </TypographyParagraph> */}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  textAlign: "center",
                  backgroundColor: "#F3F3F6",
                  border: "1px solid #eeeeee",
                  borderRadius: 1,
                  py: 4
                }}
              >
                <MailOutlineIcon sx={{ color: "#233A95", fontSize: "2.5rem" }} />
                <TypographySubtitle sx={{ color: "#0c0c0c", fontSize: "1.2rem", py: 2 }}>
                  info@groceryheaven.com
                </TypographySubtitle>
                {/* <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, }}>
                  Lorem ipsum dolar site amet discont
                </TypographyParagraph> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{
          bgcolor: "#ffffff",
          border: "1px solid #eeeeee",
          py: { lg: 8, md: 5, xs: 5 },
          px: { lg: 20, md: 8, xs: 3 },
          borderRadius: 2,
          // px: 2,
          // py: 3,
        }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <TypographyHeadingOne>
              Send Us
            </TypographyHeadingOne>
            <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, mt: 1 }}>
              Have a question, comment, or special request? We're here to help! Please use the convenient form below to send us a message, and our friendly customer support team will get back to you as soon as possible. Your feedback and inquiries are essential to us, and we are committed to providing you with the best grocery shopping experience. We appreciate your time and look forward to assisting you with any assistance you may need.
            </TypographyParagraph>
          </Box>
          <Divider sx={{ color: "#eeeeee", mb: 5 }} />
          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;