import { Box, Typography } from '@mui/material'
import React from 'react'

const addres = {
    name: 'kaka naymi',
    add1: 'sdssd',
    add2: 'dfasdfasjdf',
    state: "Ampdfa",
    street: '403500-45005',
    country: 'Bangladesh',
    phone: '01324630325'
}
export const AddressInformation = () => {
  return (
    <Box>
        <Box sx={{paddingY: '10px'}}>
            <Typography variant='h6' textTransform={'uppercase'}>Billing Adress</Typography>
            {
                Object.keys(addres).map((oneKey, i) => {
                    return (
                        <Typography>{addres[oneKey]}</Typography>
                    )
                })
            }
            <Typography sx={{paddingY: '10px'}}>{'tester@yopmail.com'}</Typography>
        </Box>
        <Box sx={{paddingY: '10px'}}>
        <Typography variant='h6' textTransform={'uppercase'}>Shipping Adress</Typography>
            {
                Object.keys(addres).map((oneKey, i) => {
                    return (
                        <Typography>{addres[oneKey]}</Typography>
                    )
                })
            }
        </Box>
    </Box>
  )
}
