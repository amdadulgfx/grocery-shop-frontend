import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderTracking = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/my-account')
    },[])
  return (
    <div>OrderTracking.view</div>
  )
}

export default OrderTracking