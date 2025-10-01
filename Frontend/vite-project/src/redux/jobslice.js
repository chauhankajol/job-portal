import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: { alljobs: [], singlejob: null,alladminjobs:[],
    searchJobBytext:"",
       allAppliedJobs:[],
       searchedQuery:""
  },

  reducers: {
    setAlljobs: (state, action) => {
      state.alljobs = action.payload;
    },
    setSinglejob: (state, action) => {
      state.singlejob = action.payload;
    },
    setalladminjobs:(state,action)=>{
      state.alladminjobs = action.payload
    },
    setsearchJobBytext:(state,action)=>{
      state.searchJobBytext=action.payload
    },
    setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action)=>{
          state.searchedQuery = action.payload
        }
  },
});

export const { setAlljobs, setSinglejob,setalladminjobs,setsearchJobBytext,setAllAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;
