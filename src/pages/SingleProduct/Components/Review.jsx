/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Rating, Typography } from '@mui/material'
import axios from 'axios'
import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Review() {
    const [reviews, setReviews] = useState([])
    const { productId } = useParams();
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}review/${productId}`).then(res => {
            if (res.data.success) {
                setReviews(res.data.data)
            }
        })
    }, [])
    return (
        <>
            {reviews.map(rev => (
                <Box key={rev?.createdAt} sx={{ display: "flex", mb: '.5rem' }}>
                    <Box component="img" src='https://secure.gravatar.com/avatar/dd28514c9a8cfba334e05f21703be28e?s=60&d=mm&r=g' sx={{ borderRadius: "2rem", height: "100%", mr: '1rem' }} />
                    <Box>
                        <Rating
                            sx={{ fontSize: '1rem', mt: 0.6 }}
                            readOnly
                            value={rev?.rating}
                        />
                        <Typography sx={{ fontWeight: "600", fontSize: "0.95rem", }}>
                            {rev?.userId?.name?.firstName}
                            <span
                                style={{ color: "lightgray", fontSize: "0.825rem", fontWeight: "400", marginLeft: '0.5rem' }}>
                                - {DateTime.fromISO(rev?.createdAt).toLocaleString(DateTime.DATE_MED)}
                            </span>
                        </Typography>
                        <Typography sx={{ fontSize: "0.8rem", color: "#424542" }} >
                            {rev?.description}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </>
    )
}

export default Review