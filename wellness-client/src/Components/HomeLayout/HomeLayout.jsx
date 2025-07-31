import React from 'react';
import NavBar from '../SharedPages/NavBar';
import { Outlet } from 'react-router';
import Footer from '../SharedPages/Footer';

const HomeLayout = () => {
    return (
        <div className='flex flex-col min-h-screen bg-[#f2e9d2]'>
            <NavBar></NavBar>
            <div className='flex-1 flex items-center justify-center max-w-[1600px] w-5/6 mx-auto'>
            <Outlet ></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;