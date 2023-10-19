import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    let location = useLocation();
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} />;
    }
};

export default PrivateRoute;