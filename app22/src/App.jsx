import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom';
import './App.css';
import Reigster from './Auth/Reigster/Reigster';
import Layout from './Components/Layout/Layout';
import Profile from './Components/Profile/Profile';
import NotFound from './Components/NotFound/NotFound';
import Home from './Components/Home/Home';
import Login from './Auth/Login/Login';
import { CounterContextProvider } from './Context/CounterContext';
import { AuthContextProvider } from './Context/AuthContext';
import ProtectRoute from './ProtectRoute/ProtectRoute';
import {QueryClient , QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PostDetails from './Components/PostDetails/PostDetails';
 import { ToastContainer } from 'react-toastify';
import Notifications from './Components/Notifications/Notifications';

const queryClient = new QueryClient()
let router= createBrowserRouter([
  {path : '' , element : <Layout/> , children :[
    {path : 'login' , element : <Login/>},
    {path : 'reigster' , element : <Reigster/>},
    {index : true , element : <Reigster/>},
    {path : 'profile' , element : <ProtectRoute><Profile/></ProtectRoute>},
    {path : 'Notifications' , element : <ProtectRoute><Notifications/></ProtectRoute>},
     {path : 'home' , element : <ProtectRoute><Home/></ProtectRoute>},
     {path : 'PostDetails/:id' , element : <ProtectRoute><PostDetails/></ProtectRoute>},
     {path : '*' , element : <NotFound/>},
  ]}
])




function App() {
  return <>
<QueryClientProvider client={queryClient}>
<AuthContextProvider>
    <CounterContextProvider>
  <RouterProvider router={router} />
<ToastContainer/>
  <ReactQueryDevtools/>
  </CounterContextProvider>
</AuthContextProvider>

</QueryClientProvider>
  </>

}

export default App;

