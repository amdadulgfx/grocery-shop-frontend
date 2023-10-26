import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Avatar, Box, Grid, IconButton, Paper, Typography } from '@mui/material';


const CustomerCommentSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? fakeComments.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === fakeComments.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === fakeComments.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change comment every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Box>
            <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }} >Customer Comment</Typography>
            <Paper sx={commentBox}>
                <Typography sx={commentTitle} >{fakeComments[currentIndex].title}</Typography>
                <Typography sx={commentDes} >{fakeComments[currentIndex].comment}</Typography>
                <Grid container alignItems="center" sx={sliderContainer}>
                    <Avatar
                        src={fakeComments[currentIndex].avatar}
                        alt="User Avatar"
                        sx={avatar}
                    />
                    <Box ml={2}>
                        <Typography variant="subtitle1">
                            {fakeComments[currentIndex].user}
                        </Typography>
                        <Typography variant="caption">
                            {fakeComments[currentIndex].designation}
                        </Typography>
                    </Box>
                </Grid>
            </Paper>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <IconButton onClick={handlePrevClick}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={handleNextClick}>
                    <ArrowForwardIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default CustomerCommentSection;


const commentBox = {
    backgroundColor: '#FFFBEC',
    padding: '30px',
};

const commentTitle = {
    fontSize: "16px",
    fontWeight: 600,
    color: "black"
};

const commentDes = {
    fontSize: "14px",
    fontWeight: 500,
    color: "grey"
};

const avatar = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
};

const sliderContainer = {
    display: 'flex',
    alignItems: 'center',
    mt: 3
};

const fakeComments = [
    {
        title: 'Amazing Selection!',
        comment: 'I was thrilled with the wide variety of products available at Grocery Heaven. It made my grocery shopping experience so much easier.',
        user: 'Alice Johnson',
        designation: 'Customer',
        avatar: 'avatar5.jpg',
    },
    {
        title: 'Exceptional Service!',
        comment: "Grocery Heaven's staff is always friendly and ready to assist. They truly care about their customers.",
        user: 'David Miller',
        designation: 'Client',
        avatar: 'avatar6.jpg',
    },
    {
        title: 'Great Prices!',
        comment: "I love that I can find quality products at affordable prices at Grocery Heaven. It's a budget-friendly grocery store.",
        user: 'Sarah Wilson',
        designation: 'Customer',
        avatar: 'avatar7.jpg',
    },
    {
        title: 'Convenient Location!',
        comment: "The store's location is perfect, and it's easy to access. Grocery Heaven is my go-to grocery store.",
        user: 'James Brown',
        designation: 'Client',
        avatar: 'avatar8.jpg',
    },
    {
        title: 'Fresh Produce!',
        comment: "I'm always impressed by the freshness of the fruits and vegetables at Grocery Heaven. They make healthy eating easy.",
        user: 'Olivia Davis',
        designation: 'Customer',
        avatar: 'avatar9.jpg',
    },
    {
        title: 'Prompt Delivery!',
        comment: "I use Grocery Heaven's delivery service, and it's always on time. It's a time-saver for my busy schedule.",
        user: 'Robert White',
        designation: 'Client',
        avatar: 'avatar10.jpg',
    },
    {
        title: 'Clean and Organized!',
        comment: 'The store is well-maintained and organized, making shopping a pleasant experience. Thanks, Grocery Heaven!',
        user: 'Linda Martin',
        designation: 'Customer',
        avatar: 'avatar11.jpg',
    },
    {
        title: 'Great Customer Support!',
        comment: 'I had a query about a product, and the customer support team at Grocery Heaven was quick to assist. Excellent service!',
        user: 'William Lee',
        designation: 'Client',
        avatar: 'avatar12.jpg',
    },
    {
        title: 'One-Stop Shop!',
        comment: "I can find everything I need at Grocery Heaven, from groceries to household items. It's a convenient one-stop shop.",
        user: 'Ava Anderson',
        designation: 'Customer',
        avatar: 'avatar13.jpg',
    },
    {
        title: 'Impressive Quality!',
        comment: "The quality of the products at Grocery Heaven is top-notch. I'm always satisfied with my purchases.",
        user: 'Daniel Robinson',
        designation: 'Client',
        avatar: 'avatar14.jpg',
    },
];
