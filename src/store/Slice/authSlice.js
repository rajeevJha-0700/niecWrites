import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userData: null,    
    status: false,
  
} 

const authSlice = createSlice({
     name: "authorization",
     initialState,
     reducers:{
        login: (state,action)=>{
            state.status = true,
            state.userData = action.payload
           
        },
        logout: (state)=>{
            state.status = false,
            state.userData = null
           
        }
     }
})


export const {login,logout} = authSlice.actions;  //so that i can directly access reducers in my components
export default authSlice.reducer //for my store