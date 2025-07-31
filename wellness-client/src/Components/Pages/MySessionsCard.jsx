import React from 'react';
import { FaLink } from 'react-icons/fa';
import { Link } from 'react-router';

const MySessionsCard = ({da}) => {
    const {title,tags,json_file_url,_id}=da
    return (
        <div className='border-r-2 border-b-2 border-[#a58251]/60 pr-3 pb-3  h-[525px]  '>
                <div className='text-[#484338] bg-[#E5DBC1] p-5  text-center h-full '>
                    <div>
                        <img src='/yoga.jpg' className='h-[300px] w-full object-center object-cover'></img>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <p className='text-xl font-medium mt-5'>{title}</p>
                          <p className='mt-2 flex gap-2 justify-center items-center flex-wrap text-sm font-medium  '>{tags.map(ta=><span className=' py-1 px-3 rouneded-[50%] bg-[#484338]/10  rounded-2xl border border-[#a58251]/60'>{ta}</span>)}</p>
                         <div className='flex justify-between items-center mt-4'>
                          <Link to={`/my-sessions/${_id}`}><button className='btn border-2 text-[#E5DBC1] bg-[#484338] mt-2'>View Details</button></Link>
                          <Link to={`/update-session/${_id}`}><button className='btn border-2 text-[#E5DBC1] bg-[#484338] mt-2'>Edit Details</button></Link>
                      </div> 
                    </div>
                    
                </div>
                </div>
    );
};

export default MySessionsCard;