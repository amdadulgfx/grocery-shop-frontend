import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Grid,
    IconButton,
    Paper,
    makeStyles,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
    commentBox: {
        backgroundColor: '#FFFBEC',
        padding: '15px',
    },
    avatar: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
    },
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
}));

const CustomerCommentSection = () => {
    const classes = useStyles();
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
            <Typography>Customer Comment</Typography>
            <Paper className={classes.commentBox}>
                <Typography variant="h6">{fakeComments[currentIndex].title}</Typography>
                <Typography>{fakeComments[currentIndex].comment}</Typography>
                <Grid container alignItems="center" className={classes.sliderContainer}>
                    <Avatar
                        src={fakeComments[currentIndex].avatar}
                        alt="User Avatar"
                        className={classes.avatar}
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
            <IconButton onClick={handlePrevClick}>
                <ArrowBackIcon />
            </IconButton>
            <IconButton onClick={handleNextClick}>
                <ArrowForwardIcon />
            </IconButton>
        </Box>
    );
};

export default CustomerCommentSection;


const fakeComments = [
    {
        title: 'Great Experience!',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        user: 'John Doe',
        designation: 'Customer',
        avatar: 'avatar1.jpg',
    },
    {
        title: 'Awesome Product!',
        comment: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        user: 'Jane Smith',
        designation: 'Client',
        avatar: 'avatar2.jpg',
    },
    {
        title: 'Highly Recommend!',
        comment: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        user: 'Michael Johnson',
        designation: 'Customer',
        avatar: 'avatar3.jpg',
    },
    {
        title: 'Impressive Service!',
        comment: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        user: 'Emily Davis',
        designation: 'Client',
        avatar: 'avatar4.jpg',
    },
];