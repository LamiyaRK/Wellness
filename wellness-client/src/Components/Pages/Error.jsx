import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div>
        <div
  className="h-screen w-full bg-cover bg-center"
  style={{ backgroundImage: "url('/404-bg.jpg')" }}
>
    <div className='flex flex-col items-center justify-center h-full space-y-2'>
        <p className='text-9xl font-semibold text-[#7e8446]'>OOPS!</p>
        <p className='text-9xl text-yellow-200 font-extrabold'>404</p>
        <p className='text-xl'>PAGE NOT FOUND !</p>
      <Link to='/'>  <button className='btn-xl btn bg-yellow-200'>Back to home</button></Link>
    </div>
</div>

        </div>
    );
};

export default Error;