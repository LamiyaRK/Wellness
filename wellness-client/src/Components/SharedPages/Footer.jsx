import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal bg-[#7e8446] text-neutral-content items-center p-4">
  <aside className="grid-flow-col items-center">
     <div className='flex gap-1 items-center'>
    <img src='/logo.png' className='h-13'></img>
    <a className="btn btn-ghost text-2xl">ZenFlow</a>
    </div>
    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
     <a href='https://github.com/LamiyaRK' target='_blank'>
     <FaGithub size={30}/>
    </a>
    <a href='http://www.linkedin.com/in/lamiya-rahmankhan' target='_blank'>
      <FaLinkedin  size={30}/>
    </a>
    <a href='https://www.facebook.com/lamiya.khan.9887117/' target='_blank'>
      <FaFacebook size={30}/>
    </a>
  </nav>
</footer>
    );
};

export default Footer;