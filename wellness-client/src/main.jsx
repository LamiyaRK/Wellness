import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routers/router.jsx'
import AuthProiveder from './Context/AuthProiveder.jsx'


createRoot(document.getElementById('root')).render(
  <AuthProiveder>
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  </AuthProiveder>
)
