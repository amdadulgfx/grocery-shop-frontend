import React from 'react';
import AllCategoriesAds from './AllCategoriesAds.view';
import SpecialOrganicAds from './SpecialOrganicAds.view';
import FreshestProductsAds from './FreshestProductsAds.view';
import DownloadAndOrderAds from './DownloadAndOrderAds.view';
import TrendingProductsAds from './TrendingProductsAds.view';
import CustomerCommentsAds from './CustomerCommentsAds.view';
import { Box } from '@mui/material';

const AdvertisementAndAllCategory = () => {
    return (
        <div>
            <Box sx={{ mb: 4 }}>
                <AllCategoriesAds />
            </Box>
            <Box sx={{ mt: 3, mb: 4 }}>
                <SpecialOrganicAds />
            </Box>
            <Box sx={{ mt: 3, mb: 4 }}>
                <FreshestProductsAds />
            </Box>
            {/* <Box sx={{ mt: 3, mb: 4 }}>
                <DownloadAndOrderAds />
            </Box> */}
            <Box sx={{ mt: 3, mb: 4 }}>
                <TrendingProductsAds />
            </Box>
            <Box sx={{ mt: 3, mb: 4 }}>
                <CustomerCommentsAds />
            </Box>
        </div>
    );
};

export default AdvertisementAndAllCategory;