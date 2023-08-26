import { Box, Typography } from '@mui/material'
import React from 'react'

function HealthTips() {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box sx={{
                width: '80%',
                backgroundColor: "#f8efea",
                height: "8rem",
                borderRadius: "0.5rem",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                paddingLeft: "2rem",
                backgroundImage: `url("https://klbtheme.com/bacola/wp-content/plugins/bacola-core/elementor/images/banner-box2.jpg")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: "right",
                m: 1
            }}>
                <Box>

                    <Typography sx={{
                        color: "#9b9bb4",
                        fontSize: "1rem"
                    }}>
                        Always Taking Care
                    </Typography>
                    <Typography sx={{
                        color: "#7177a6",
                        fontSize: "1.1rem",
                        fontWeight: "600"
                    }}>
                        In store or online your health & safety is our top priority.
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
};

export default HealthTips