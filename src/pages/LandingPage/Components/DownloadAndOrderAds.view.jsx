import React from 'react';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Box } from '@mui/material';
import { Typography } from '@material-ui/core';


const DownloadAndOrderAds = () => {
    return (
        <Box sx={{border:"1px solid gray", borderRadius:"6px"}}>
            {downloadAndOrderAdsData?.map((data) => (
            <Box key={data?.id} sx={{display:"flex", alignItems:"center", justifyContent:"center", py: 2.4, px: 1.5, borderBottom: data?.id === 3 ? "" : "1px solid gray", gap:2}}>
                <Box>
                    <data.image style={{height: "35px", width:"35px"}}/>
                </Box>
                <Box>
                    <Typography sx={{fontSize:"10px", color:"black"}}>{data?.des}</Typography>
                </Box>
            </Box>
            ))}
        </Box>
    );
};

export default DownloadAndOrderAds;

const downloadAndOrderAdsData = [
    {des: "Download the Bacola App to your Phone.", image: SystemUpdateIcon, id: 1},
    {des: "Order now so you dont miss the opportunities.", image: ShoppingCartCheckoutIcon, id: 2},
    {des: "Your order will arrive at your door in 15 minutes.", image: AlarmIcon, id: 3},
];
