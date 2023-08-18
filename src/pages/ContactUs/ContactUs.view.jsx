import React from 'react';
import { Box, Button, Divider, Grid, InputLabel } from '@mui/material';
import { TextFiledBorderLess, TypographyHeadingOne, TypographyParagraph, TypographySubtitle } from '../../CustomTags';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const ContactUs = () => {
  return (
    <Box sx={{ bgcolor: "#FAFAFA", pb: 10, px: 2 }}>
      <Box maxWidth="lg" sx={{ mx: "auto" }}>
        <Box sx={{ py: 3, mb: 4 }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <TypographyHeadingOne>
              Get In Touch
            </TypographyHeadingOne>
            <TypographyParagraph sx={{ py: 1, color: "#0c0c0c" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.
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
                <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, }}>
                  Lorem ipsum dolar site amet discont
                </TypographyParagraph>
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
                <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, }}>
                  Lorem ipsum dolar site amet discont
                </TypographyParagraph>
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
                  info@example.com
                </TypographySubtitle>
                <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, }}>
                  Lorem ipsum dolar site amet discont
                </TypographyParagraph>
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
            <TypographyParagraph sx={{ fontSize: "0.8rem", color: "#111111", pb: 1, }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita quaerat unde quam dolor culpa veritatis inventore, aut commodi eum veniam vel.
            </TypographyParagraph>
          </Box>
          <Divider sx={{ color: "#eeeeee", mb: 5 }} />
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={12} md={6}>
              <Box>
                <InputLabel sx={{ pb: 0.5 }}>Your name&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                <TextFiledBorderLess
                  sx={{ backgroundColor: "#F3F3F6" }}

                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <InputLabel sx={{ pb: 0.5 }}>Your email&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                <TextFiledBorderLess
                  sx={{ backgroundColor: "#F3F3F6" }}

                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                <InputLabel sx={{ pb: 0.5 }}>Subject&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                <TextFiledBorderLess
                  sx={{ backgroundColor: "#F3F3F6" }}

                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                <InputLabel sx={{ pb: 0.5 }}>Your message&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                <TextFiledBorderLess
                  sx={{ backgroundColor: "#F3F3F6" }}
                  multiline
                  rows={5}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box>
                <Button
                  variant="contained"
                  sx={{ py: 1.2, px: 5, borderRadius: 16 }}
                >
                  Send Message
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;