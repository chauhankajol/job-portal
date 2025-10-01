import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setallApplicants } from '@/redux/applicationSlice'
import { Application_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const Applicants = () => {
    const dispatch = useDispatch()
const params=useParams();
const {applicants}=useSelector(store=>store.application)
  useEffect(()=>{
    const fetchallapplicants=async()=>{
        try {
           const res= await axios.get(`${Application_API_END_POINT}/${params.id}/applicants`,{withCredentials:true}) 
           if(res.data.success){
            console.log(res.data)
            dispatch(setallApplicants(res.data.job))
           
           }
        } catch (error) {
            console.log(error)
        }
    }
    fetchallapplicants()
  },[])


  return (
    <div>
<Navbar/>
<div  className='max-w-7xl mx-auto'>
    <h1 className='font-bold text-xl my-auto'>Applicants {applicants?.applications?.length}</h1>
    <ApplicantsTable/>


</div>



    </div>
  )
}

export default Applicants