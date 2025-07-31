import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const NavBar = () => {
  const token=localStorage.getItem('token')
  const navigate=useNavigate()
    const list=<>
        <li><NavLink to='/'>Dashboard</NavLink></li>
        <li><NavLink to='/my-sessions'>My Sessions</NavLink></li>
         <li><NavLink to='/session-editor'>Session Editor</NavLink></li>
    </>

    const handellogOut=()=>{
      localStorage.removeItem('token')
       toast.success('Logged out successfully!');
        navigate('/login');
    }
    return (
        <div className="navbar bg-[#7e8446] text-white text-xl shadow-sm">
  <div className="navbar-start">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-[#7e8446] rounded-box z-1 mt-3 w-52 p-2 shadow text-xl">
        {list}
      </ul>
    </div>
    <div className='flex flex-col items-center'>
    <img src='/logo.png' className='h-13'></img>
    <a className="btn btn-ghost text-2xl">ZenFlow</a>
    </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-xl font-semibold">
     {list}
      
    </ul>
  </div>
  <div className="navbar-end">
   {(!token)&& <div className='flex items-center gap-2'>
    <Link to='/login'><button className="btn">Login</button></Link>
    <Link to='/register'><button className="btn">Register</button></Link>
   </div>
      }
      {
        token&&<button className='btn' onClick={handellogOut}>Log Out</button>
      }
  </div>
</div>
    );
};

export default NavBar;