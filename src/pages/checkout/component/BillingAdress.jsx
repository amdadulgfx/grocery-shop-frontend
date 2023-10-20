import styled from '@emotion/styled';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useRef } from 'react';


const billingDetails = {
    email: "",
    firstName: "",
    lastName: "",
    country: "",
    houseandstreet: "",
    apartment: "",
    city: "",
    zipCode: "",
    phone: "",
}
export const BillingAdress = ({ formik }) => {
    const dataFetchedRef = useRef(false);

    // const formik = useFormik({
    //     initialValues,
    //     validationSchema,
    //     enableReinitialize: true,
    //     onSubmit: (values) => {
    //         axios.patch(`${process.env.REACT_APP_API_URI}users/`,
    //             values,
    //             {
    //                 headers: {
    //                     authorization: `${access_token}`,
    //                 },
    //             }
    //         )
    //             .then((res) => {
    //                 if (res.data.success) {
    //                     setSuccessAlert(true)
    //                 }
    //             })
    //     },
    // });
    return (
        <Box sx={{ border: '1px solid gray', padding: '6px 10px', borderRadius: '6px' }}>
            {/* <form onSubmit={formik.handleSubmit}> */}
            <Box sx={{ padding: "6px 0" }}>
                <Typography variant='subtitle1' sx={{ fontWeight: '600', padding: "6px 0" }}>BILLING DETAILS</Typography>
                <Divider />
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="First Name * "
                        name="name.firstName"
                        value={formik.values?.name?.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name?.firstName && Boolean(formik.errors.name?.firstName)}
                        helperText={formik.touched.name?.firstName && formik.errors.name?.firstName}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Last Name * "
                        name="name.lastName"
                        value={formik.values?.name?.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name?.lastName && Boolean(formik.errors.name?.lastName)}
                        helperText={formik.touched.name?.lastName && formik.errors.name?.lastName}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <TextField
                        label="Country"
                        name="country"
                        value={formik.values?.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <TextField
                        label="Company Name"
                        name="comapnyName"
                        value={formik.values?.comapnyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.comapnyName && Boolean(formik.errors.comapnyName)}
                        helperText={formik.touched.comapnyName && formik.errors.comapnyName}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                    <TextField
                        label="State"
                        name="state"
                        value={formik.values?.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                    <TextField
                        label="Town / City"
                        name="city"
                        value={formik.values?.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <TextField
                        label="House No / Street Name"
                        name="streetAddress"
                        value={formik.values?.houseandstreet}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.houseandstreet && Boolean(formik.errors.houseandstreet)}
                        helperText={formik.touched.houseandstreet && formik.errors.houseandstreet}
                        fullWidth
                    />
                </Grid>
                
                <Grid item xs={12} lg={12} md={12}>
                    <TextField
                        label="Zip Code"
                        name="zipCode"
                        value={formik.values?.zipCode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                        helperText={formik.touched.zipCode && formik.errors.zipCode}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                    <TextField
                        label="Phone * "
                        name="phone"
                        value={formik.values?.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} lg={6} md={6}>
                    <TextField
                        label="Email"
                        name="email"
                        value={formik.values?.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} lg={12} md={12}>
                    <Typography sx={{ fontSize: ".8125rem", padding: '6px' }}>Order notes (optional)</Typography>
                    <StyledTextarea minRows={4} 
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        name="orderNotes"
                        defaultValue="a gift from you your friend john"
                        value={formik.values?.orderNotes}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.orderNotes && Boolean(formik.errors.orderNotes)}
                        helperText={formik.touched.orderNotes && formik.errors.orderNotes}
                    />
                </Grid>

            </Grid>
            {/* </form> */}
        </Box>
    )
}

const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 97%;
    padding: 5px,
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: '#6e7781';
    background: '#fff';
    border: 1px solid  '#6e7781';
    box-shadow: 0px 2px 2px '#d0d7de';
    &:hover {
      border-color: '#6e7781';
    }

    &:focus {
      border-color: '#6e7781';
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);
// const validationSchema = yup.object({
//     email: yup.string().email('Invalid email').required('Required'),
//     firstName: yup.string().required('Required'),
//     lastName: yup.string().required('Required'),
//     country: yup.string().required('Required'),
//     houseandstreet: yup.string().required('Required'),
//     apartment: yup.string().required('Required'),
//     city: yup.string().required('Required'),
//     zipCode: yup.string().required('Required'),
//     phone: yup.string().required('Required'),
// });
