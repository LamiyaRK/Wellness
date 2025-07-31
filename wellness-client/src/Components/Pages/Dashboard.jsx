
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Api/axiosInstance';
import Spinner from '../SharedPages/Spinner';
import DashCard from './DashCard';

const Dashboard = () => {
    const [data,setData]=useState([]);
    const [load,setLoad]=useState(true)
    useEffect(()=>{
        axiosInstance.get('/sessions')
        .then(res=>{setData(res.data)
            setLoad(false)
        })
        .catch(err=>console.log(err))
    },[])


if(load)
{
    return <Spinner></Spinner>
}
    return (
        <div className='bg-[#f2e9d2] py-20 h-full '>
        <h1 className='text-4xl text-center text-[#484338] font-bold mb-2'>Wellness Sessions</h1>
        <p className=' text-center text-[#484338]/80 font-medium mb-10'>Browse all available public wellness sessions</p>
        <div className='grid  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5   '>
           {data.map(da=><DashCard key={da._id} da={da}></DashCard>)}
        </div>
        </div>
    );
};

export default Dashboard;