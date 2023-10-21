import React from 'react';
import { Grid, Box, InputLabel, Button } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextFiledBorderLess } from '../../../../CustomTags';
import axios from 'axios';
import { useState } from 'react';
import GroceryAlert from '../../../../components/GroceryAlert';

const ContactForm = () => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const initialValues = {
        name: '',
        email: '',
        subject: '',
        message: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().required('Message is required'),
    });

    const handleSubmit = (values, { resetForm }) => {
        axios.post(`${process.env.REACT_APP_API_URI}contact-us/`, values).then(res => {
            console.log(res?.data);
            res?.data?.statusCode === 200 && setSnackbarOpen(true);
            resetForm();
        });
        setSnackbarOpen(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form>
                    <Grid container justifyContent="center" alignItems="center" spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <InputLabel sx={{ pb: 0.5 }}>Your name&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                                <Field
                                    type="text"
                                    name="name"
                                    as={TextFiledBorderLess}
                                    sx={{ backgroundColor: "#F3F3F6" }}
                                />
                                <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box>
                                <InputLabel sx={{ pb: 0.5 }}>Your email&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                                <Field
                                    type="email"
                                    name="email"
                                    as={TextFiledBorderLess}
                                    sx={{ backgroundColor: "#F3F3F6" }}
                                />
                                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box>
                                <InputLabel sx={{ pb: 0.5 }}>Subject&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                                <Field
                                    type="text"
                                    name="subject"
                                    as={TextFiledBorderLess}
                                    sx={{ backgroundColor: "#F3F3F6" }}
                                />
                                <ErrorMessage name="subject" component="div" style={{ color: 'red' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box>
                                <InputLabel sx={{ pb: 0.5 }}>Your message&nbsp;<span style={{ color: "red" }}>*</span></InputLabel>
                                <Field
                                    name="message"
                                    as={TextFiledBorderLess}
                                    sx={{ backgroundColor: "#F3F3F6" }}
                                    multiline
                                    rows={5}
                                />
                                <ErrorMessage name="message" component="div" style={{ color: 'red' }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ py: 1.2, px: 5, borderRadius: 16 }}
                                >
                                    Send Message
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    {
                        snackbarOpen &&
                        <GroceryAlert enable={snackbarOpen} msg="Contact message sent successfully" severity="success"
                        />
                    }
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
