import {  Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";


const Job = ({job}) => {
  const navigate=useNavigate()
  // const jobId="szdtfgbhjkml"

  const jobdaysfunction=(mongodbTime)=>{
      const createdAt=new Date(mongodbTime)
      const currentTime=new Date()
      const difference=currentTime-createdAt
      return Math.floor(difference/(1000*24*60*60))
  }


  return (
    <div className="bg-white border border-border gray-100 p-5 rounded-md shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text text-sm-grey-500"> {jobdaysfunction(job?.createdAt)===0?"Today":`${jobdaysfunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png" />
          </Avatar>
        </Button>

        <div>
          <h1 className="font-medium text-lg">{job?.company?.name} </h1>
          <p className="text-sm text-grey-500">{job?.location}</p>
        </div>
      </div>
      <div >
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-grey-600">
        {job?.description}
        </p>
      </div>
    <div className='flex items-center gap-2 mt-4'>
<Badge className={'text-blue-600 font-bold'} variant="ghost">{job?.position}</Badge>
<Badge className={'text-[#FB3002] font-bold'} variant="ghost">{job?.jobType}</Badge>
<Badge className={'text-[#723967] font-bold'} variant="ghost">{job?.salary}</Badge>
</div>
<div className="flex items-center gap-2 mt-4">
  <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
  <Button variant="outline" className="bg-[#723967] text-white">save for later</Button>
</div>
    </div>
  );
};

export default Job;
