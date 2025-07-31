import React, { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import axiosInstance from '../../Api/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const {setLoader}=use(AuthContext)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
   const location=useLocation();
  const navigate = useNavigate();
      const from = location.state?.from?.pathname || '/';
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoader(true)
    try {
      const res = await axiosInstance.post('/login', formData);
      const token = res.data.token;

      // Store token (can use localStorage or cookies)
      localStorage.setItem('token', token);

      toast.success('Logged in successfully!');
    
       setLoader(false)
      setFormData({ email: '', password: '' });
   
      // Redirect to dashboard/home after short delay
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 500);

    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message || 'Login failed');
        setLoader(false)
      } else {
        toast.error('Something went wrong.');
        setLoader(false)
      }
    }
  };

  return (
    <div className='flex  items-center'>
      <div className="xs:w-sm sm:w-md mx-auto my-20 p-14 shadow rounded bg-white w-full">
        <h2 className="text-3xl font-semibold mb-4 text-center text-[#7e8446]">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="w-full border px-3 py-2 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              id="password"
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
            className="bg-[#7e8446] text-white px-4 py-2 mt-4 rounded hover:bg-[#7e8446]/70 w-full"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
