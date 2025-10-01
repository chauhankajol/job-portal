import { setalladminjobs } from '@/redux/jobslice' 
import { Job_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${Job_API_END_POINT}/getadminjobs`,{withCredentials:true});
                if(res.data.success){
                    console.log(res.data)
                    dispatch(setalladminjobs(res.data.jobs));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs