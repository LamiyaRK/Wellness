import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router'; 
import axiosInstance from '../../Api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Context/AuthContext';

const Register = () => {
  const {setLoader}=use(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
 const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 setLoader(true)
    try {
      const res = await axiosInstance.post('/register', formData);
      toast.success(res.data.message || 'Registered successfully');
      console.log(res.data)
      if(res.data.token)
      {
        localStorage.setItem('token',res.data.token)
      }
       setLoader(false)
      setFormData({ email: '', password: '' });
      navigate('/');
      
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || 'Registration failed');
        setLoader(false)
      } else {
        toast.error('Something went wrong.');
        setLoader(false)
      }
    }
  };

  return (
    <div className=' flex  items-center'>
    <div className="xs:w-sm sm:w-md mx-auto my-20 p-14 shadow rounded bg-white ">
      <h2 className="text-3xl font-semibold mb-4 text-center text-[#7e8446]">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border px-3 py-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#7e8446] text-white px-4 py-2 mt-4 rounded hover:bg-[#7e8446]/70  w-full"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>

      
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
    </div>
  );
};

export default Register;
