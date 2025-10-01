import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Company_API_END_POINT } from '@/utils/constant'

import { useDispatch } from 'react-redux'
import { setSinglecompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const Companycreate = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [companyName,setCompanyName    ]=useState()
    
    const registernewcompany=async()=>{
        try {
            const res= await axios.post(`${Company_API_END_POINT}/register`,{companyName},{
            headers:{
           'Content-Type':'application/json'
            },
            withCredentials:"true"
            })

            if(res?.data?.success){
              dispatch(setSinglecompany(res.data.company))
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log(error)
        }
    }



  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <div>
            <h1 className='font-bold text-2xl'>your Company name</h1>
          <p className='text-grey-500'>what would you like to give your companyName you can change this later</p> 
            </div>
       
          <label>Company Name</label>
          <Input
          
        
         onChange={(e)=>setCompanyName(e.target.value)}
          type="text"
          placeholder="jobhunt,microsoft etc"
          className="my-2"
          
          />
          <div className='flex items-center gap-2  my-10'>
             <Button varient="outline"onClick={()=>navigate("/admin/companies")}>Cancel</Button>
               <Button onClick={registernewcompany}>Continue</Button>
          </div>
        </div>
    </div>
  )
}

export default Companycreate