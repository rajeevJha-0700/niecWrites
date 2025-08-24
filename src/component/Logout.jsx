import { useDispatch } from 'react-redux'
import { logout } from '../store/Slice/authSlice.js';
import authService from '../Service/AuthService.js';

function Logout() {
 const dispatch = useDispatch();
 const logoutHandler = ()=>{
    authService.logout()
    .then((success)=>{
        dispatch(logout());
       
        console.log("logout success:",success);
    })
 }
  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 duration-200 hover:bg-blue-400 rounded-full'>Logout</button>
  )
}

export default Logout
