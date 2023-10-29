import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const WithScrollToTop = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };
    navigate(handleNavigation);
    return () => {
      navigate(undefined);
    };
  }, [navigate]);

    useEffect(() => {
        if(location.pathname !== "/products"){
          sessionStorage.clear();
        }
    }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;;
};

export default WithScrollToTop;
