import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const location = useLocation();
    let accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        return children;
    } else {
        return (<Navigate to="/admin-login" state={{ from: location }} />);
    }

};

export default AdminRoute;