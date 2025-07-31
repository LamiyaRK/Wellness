import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import Spinner from '../Components/SharedPages/Spinner';

const PrivateRoute = ({children}) => {
    const {loader}=use(AuthContext)
     const loc=useLocation()
    const token=localStorage.getItem('token')
    if(loader)
        return <Spinner/>
    if (!token) return <Navigate to="/login" state={{from:loc}} replace />; 
    return children;
};

export default PrivateRoute;