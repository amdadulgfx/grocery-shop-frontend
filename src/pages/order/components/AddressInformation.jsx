import { Box, Typography } from '@mui/material';
import React from 'react';

export const AddressInformation = ({orderInfos}) => {
    const {billingInfo } = orderInfos;
  return (
    <Box>
        <Box sx={{paddingY: '10px'}}>
            <Typography variant='h6' textTransform={'uppercase'}>Billing Adress</Typography>
            {
                Object.keys(billingInfo).map((oneKey, i) => {
                    return (
                        <Typography>{billingInfo[oneKey]}</Typography>
                    )
                })
            }
            <Typography sx={{paddingY: '10px'}}>{'tester@yopmail.com'}</Typography>
        </Box>
        {/* <Box sx={{paddingY: '10px'}}>
        <Typography variant='h6' textTransform={'uppercase'}>Shipping Adress</Typography>
            {
                Object.keys(addres).map((oneKey, i) => {
                    return (
                        <Typography>{addres[oneKey]}</Typography>
                    )
                })
            }
        </Box> */}
    </Box>
  )
}
