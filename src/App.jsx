import {login,logout} from "./store/Slice/authSlice.js"
import {useState,useEffect} from "react"
import {useDispatch} from "react-redux"
import './App.css'
import authService from "./Service/AuthService.js"
import {Footer,Header} from "./component/Warehouse.js"
import { Outlet } from 'react-router-dom'
function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
   const promise = authService.getCurrentUser();
   promise
   .then((userData)=>{
    
     userData ? dispatch(login(userData)) : dispatch(logout());
   })
   .catch((failure)=>{
    console.log("there is some failure::promise not resolved in app.jsx:: authServiceAPICall ::",failure)
   })
   .finally(()=>{
    setLoading(false);
   })
  },[])

  return !loading ? (
     <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App
