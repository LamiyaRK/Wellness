import { createBrowserRouter } from "react-router";
import HomeLayout from "../Components/HomeLayout/HomeLayout";
import Dashboard from "../Components/Pages/Dashboard";
import CardDetails from "../Components/Pages/CardDetails";
import Login from "../Components/Pages/Login";
import Register from "../Components/Pages/Register";
import SessionEditor from "../Components/Pages/SessionEditor";
import MySessions from "../Components/Pages/MySessions";
import MySessionsCard from "../Components/Pages/MySessionsCard";
import UpdateSessionEditor from "../Components/Pages/UpdateSessionEditor";
import PrivateRoute from "./PrivateRoute";
import Error from "../Components/Pages/Error";

 const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout/>,
    children:[
      { index:true,
       element:<Dashboard/>
      },
      {
        path:'/my-sessions/:id',
        element:
          <PrivateRoute>
             <CardDetails/>
          </PrivateRoute>
       
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/session-editor',
        element:<PrivateRoute>
          <SessionEditor/>
        </PrivateRoute>
      },
      {
        path:'/my-sessions',
        element:
          <PrivateRoute>
          <MySessions/>
          </PrivateRoute>
        
      },
       {
        path:'/update-session/:id',
        element:
          <PrivateRoute>
            <UpdateSessionEditor/>
          </PrivateRoute>
        
      },
    ]
  },
  {
    path:'/*',
    Component:Error
  }
]);
export default router;