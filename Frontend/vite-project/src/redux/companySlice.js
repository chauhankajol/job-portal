import Companies from "@/components/admin/Companies";
import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:{},
        Companies:[],
        searchCompanyByText:""
    },
    reducers:{
        setSinglecompany:(state,action)=>{
           state.singleCompany=action.payload
        },
        setCompanies:(state,action)=>{
            state.Companies=action.payload
        },
        setsearchCompanyByText:(state,action)=>{
            state.searchCompanyByText = action.payload
        }
    }
})

export const {setSinglecompany,setCompanies,setsearchCompanyByText}=companySlice.actions;
export default companySlice.reducer;