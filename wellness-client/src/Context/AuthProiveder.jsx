import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProiveder = ({children}) => {
   
    const [loader,setLoader]=useState(false);
    const useInfo={
        loader,
        setLoader
    }
    return (
        <AuthContext.Provider value={useInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProiveder;