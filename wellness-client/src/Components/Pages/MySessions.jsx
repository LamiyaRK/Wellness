import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Api/axiosInstance';
import Spinner from '../SharedPages/Spinner';
import MySessionsCard from './MySessionsCard';

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
console.log(data)

if(load)
{
    return <Spinner></Spinner>
}
   
    return (
        <div className='bg-[#f2e9d2] py-20 h-full '>
        <div className='grid  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 max-w-[1600px] mx-auto '>
           {data.map(da=><MySessionsCard key={da._id} da={da}></MySessionsCard>)}
        </div>
        </div>
    );
};

export default MySessions;