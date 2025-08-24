import { configureStore } from "@reduxjs/toolkit";  
import authReducer from "./Slice/authSlice.js"

const store = configureStore({
   reducer:{
    authorization:authReducer,
   }
})

export default store ;