import { setAlljobs } from '@/redux/jobslice'
import { Job_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
 


const usegetAlljobs = () => {
const dispatch = useDispatch()
const {searchedQuery}=useSelector(store=>store.job)
   useEffect(()=>{
    const fetchalljobs = async()=>{
   try{
const res=await axios.get(`${Job_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true})
if(res.data.success){
    dispatch(setAlljobs(res.data.jobs))
}
   }
   catch(err){
    console.log(err)
   }
}
fetchalljobs()
  },[])
}

export default usegetAlljobs