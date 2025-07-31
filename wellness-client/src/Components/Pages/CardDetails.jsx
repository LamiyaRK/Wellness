import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Api/axiosInstance';
import { useParams } from 'react-router';
import Spinner from '../SharedPages/Spinner';

const CardDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axiosInstance.get(`/my-sessions/${id}`)
      .then(res => {
        setData(res.data);
        setLoad(false);
      })
      .catch(err => console.log(err));
  }, []);

  const { title, created_at, updated_at, status, json_file_url, tags = [] } = data;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString(); // You can customize format if needed
  };

  if (load) {
    return <Spinner />;
  }

  return (
    <div className='flex flex-col md:flex-row items-center justify-between w-full my-20 text-[#484338]'>
      <div className='w-full md:w-[40%]'>
        <img src='/yoga.jpg' className='h-[500px] w-full object-cover object-center' alt='Session' />
      </div>

      <div className='w-full md:w-[55%] space-y-3 text-lg'>
        
          <p className='text-2xl font-semibold'>{title}</p>
        
        <div className='grid grid-cols-[150px_1fr]'>
        
          <p><span className='badge bg-[#484338]/40'>{status}</span></p>
        </div>
        <div className='grid grid-cols-[150px_1fr]'>
          <p className='font-medium'>JSON File URL:</p>
          <p>{json_file_url}</p>
        </div>
        <div className='grid grid-cols-[150px_1fr]'>
          <p className='font-medium'>Created At:</p>
          <p>{formatDate(created_at)}</p>
        </div>
        <div className='grid grid-cols-[150px_1fr]'>
          <p className='font-medium'>Updated At:</p>
          <p>{formatDate(updated_at)}</p>
        </div>
        <div className='grid grid-cols-[150px_1fr]'>
          <p className='font-medium'>Tags:</p>
          <p>{tags.map((tag, index) => <span key={index}>{tag}{index < tags.length - 1 ? ', ' : ''}</span>)}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
