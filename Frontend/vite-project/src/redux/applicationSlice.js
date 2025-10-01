import { createSlice } from "@reduxjs/toolkit";

const applicationSlice=createSlice({
    name:'Application',
initialState:{
     applicants:[]
},
reducers:{
    setallApplicants:(state,action)=>{
        state.applicants = action.payload
    }
}


})

export const {setallApplicants} = applicationSlice.actions
export default applicationSlice.reducer