import React from 'react';
import { RingLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className='h-screen justify-center items-center flex flex-col'>
           <RingLoader  color='#7e8446'/> 
        </div>
    );
};

export default Spinner;