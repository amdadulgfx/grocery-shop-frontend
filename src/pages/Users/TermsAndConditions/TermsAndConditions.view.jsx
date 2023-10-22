
import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container>
      <Typography variant="h4" mt={2} gutterBottom>
        Terms and Conditions for GroceryHeaven
      </Typography>

      <List component="ol" dense>
        <ListItem>
          <Typography variant="h6">
            1. Introduction
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Welcome to GroceryHeaven. These terms and conditions govern your use of our website, mobile application, and services. By using our platform, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            2. Registration and Account
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="2.1. To access certain features, you may need to register an account with us. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="2.2. You must provide accurate and complete information during the registration process."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            3. Orders and Delivery
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="3.1. You may place orders for groceries and related products through our platform. Orders are subject to product availability and our delivery terms."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="3.2. We will make reasonable efforts to ensure timely delivery; however, we are not liable for delays due to unforeseen circumstances."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            4. Pricing and Payment
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="4.1. Prices are subject to change. The price displayed at the time of your order is the final price."
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="4.2. Payment can be made through various methods as specified on our platform." />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            5. Cancellations and Refunds
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="5.1. You may cancel your order according to our cancellation policy. Refund eligibility is subject to our refund policy."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            6. User Content
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="6.1. You may submit reviews, comments, or other content on our platform. By doing so, you grant us a non-exclusive, royalty-free, worldwide, perpetual, and irrevocable right to use, modify, and display such content."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="6.2. You agree not to submit any content that is unlawful, offensive, or infringes on the rights of others."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            7. Intellectual Property
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="7.1. All content on our platform, including logos, text, images, and software, is the property of GroceryHeaven and is protected by copyright and other intellectual property laws."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            8. Privacy and Data Security
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="8.1. Your use of our platform is subject to our Privacy Policy. We take data security seriously but cannot guarantee the absolute security of your data."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            9. Termination
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="9.1. We reserve the right to terminate or suspend your account if we believe you have violated these terms."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            10. Limitation of Liability
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="10.1. We are not liable for any direct, indirect, incidental, special, or consequential damages, whether based on contract, tort, or any other legal theory."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            11. Dispute Resolution
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="11.1. Any disputes arising from or related to these terms will be resolved through arbitration in accordance with company rules in some place."
          />
        </ListItem>

        <ListItem>
          <Typography variant="h6">
            12. Changes to Terms
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText
            primary="12.1. We may modify these terms at any time. Your continued use of our platform after any changes indicate your acceptance of the updated terms."
          />
        </ListItem>
      </List>

      <Typography variant="subtitle1" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1">
        If you have any questions or concerns about these terms and conditions, please contact us at <span style={{ fontWeight: '600' }}>ghcontact@yopmail.com</span>.
      </Typography>
    </Container>
  );
};

export default TermsAndConditions;
