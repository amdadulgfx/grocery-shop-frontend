import React from 'react';
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Box } from '@material-ui/core';

const DownloadAndOrderAds = () => {
    return (
        <div>
            {downloadAndOrderAdsData?.map((data) => (
            <Box key={data?.id} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Box>
                    <data.image />
                </Box>
                <Box>
                    {data?.des}
                </Box>
            </Box>
            ))}
        </div>
    );
};

export default DownloadAndOrderAds;

const downloadAndOrderAdsData = [
    {des: "Download the Bacola App to your Phone.", image: SystemUpdateIcon, id: 1},
    {des: "Order now so you dont miss the opportunities.", image: ShoppingCartCheckoutIcon, id: 2},
    {des: "Your order will arrive at your door in 15 minutes.", image: AlarmIcon, id: 3},
]