import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Api/axiosInstance';
import Spinner from '../SharedPages/Spinner';
import MySessionsCard from './MySessionsCard';
import { Link } from 'react-router';

const MySessions = () => {
    const [data,setData]=useState([]);
    const [load,setLoad]=useState(true)
    useEffect(()=>{
        axiosInstance.get('/my-sessions')
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
        {data.length>0?<div>
        <h1 className='text-4xl text-center text-[#484338] font-bold mb-2'>My Sessions</h1>
        <p className=' text-center text-[#484338]/80 font-medium mb-10'>View and manage your draft and published sessions</p>
        
        <div className='grid  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 max-w-[1600px] mx-auto '>
           {data.map(da=><MySessionsCard key={da._id} da={da}></MySessionsCard>)}
        </div>
        </div>:<div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl text-center text-[#484338] font-bold mb-2'>You haven't created any sessions yet.</h1>
        <p className=' text-center text-[#484338]/80 font-medium mb-10'>Start by creating your first wellness session to share your routines and ideas!</p>
      <Link to='/session-editor'>  <button className='btn bg-[#7e8446] text-white '>Create New Session</button></Link>
        </div>}
        
        </div>
    );
};

export default MySessions;