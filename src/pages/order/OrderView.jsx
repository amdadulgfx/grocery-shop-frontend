import { Container } from '@mui/material'
import React from 'react'
import { AddressInformation } from './components/AddressInformation'
import OrderDetails from './components/OrderDetails'
import OrderStatus from './components/OrderStatus'
import CustomBreadcumbs from './components/breadcumbs'

export const OrderView = () => {
  return (
    <Container sx={{padding: '10px'}}>
        <CustomBreadcumbs />
        <OrderStatus />
        <OrderDetails />
        <AddressInformation />
    </Container>
  )
}
