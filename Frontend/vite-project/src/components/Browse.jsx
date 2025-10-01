import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobslice";
import usegetAlljobs from "@/hooks/usegetAlljobs";


// const randomjobs=[1,2,3]

const Browse = () => {
  usegetAlljobs();
  const {alljobs}=useSelector(store=>store.job)
  const dispatch = useDispatch();
  useDispatch(()=>{
    return()=>{
      dispatch(setSearchedQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
       <h1 className="font-bold text-xl my-10">search jobs  {alljobs.length}</h1>
       <div className="grid grid-cols-3 gap-4 mt-5">
  {
        alljobs.map((job)=>{
            return(
            <Job key={job._id}job={job}/>)
       } )
    }

       </div>
  


      </div>
    </div>
  );
};

export default Browse;
