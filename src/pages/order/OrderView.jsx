import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import OrderDetails from './components/OrderDetails'
import OrderStatus from './components/OrderStatus'
import CustomBreadcumbs from './components/breadcumbs'

export const OrderView = () => {
  const [oderDetails, setOderDetals] = useState({});
  const [orderProducts, setOrderProducts] = useState({});
  const locationDeta = useLocation();
  useEffect(() => {
    setOderDetals(locationDeta?.state);
    setOrderProducts(locationDeta?.state?.product);
  }, [])
  return (
    <>
      {
        orderProducts.length > 0 ? <Container sx={{ padding: '10px' }}>
          <CustomBreadcumbs />
          <OrderStatus oderDetails={oderDetails} />
          <OrderDetails orderInfos={oderDetails} orderProduct={orderProducts} />
          {/* <AddressInformation orderInfos={oderDetails} /> */}
        </Container>
          :
          <h1>Hellor its take a load </h1>
      }
    </>

  )
}
