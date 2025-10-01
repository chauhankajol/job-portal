import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { Job_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";

const companyArray = [];

const Postjob = () => {
  const { Companies } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    title: "",
   description: "",
   requirment: "",
    salary: "",
     location: "",
    jobType: "",
    experience: "",
     position: "",
    companyId: "",
  });

const[loading,setLoading]=useState(false)
const navigate =useNavigate()


  const EventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const companychangehandler = (value) => {
    const selectedCompany = Companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async(e) => {
    e.preventDefault();
   try {
    setLoading(true)
    const res = await axios.post(`${Job_API_END_POINT}/post`,input,{
        headers:{
       'Content-Type':'application/json'
        },
         withCredentials:true
    })
       
    
    if(res.data.success){
        toast.success(res.data.message)
        navigate("/admin/jobs")
    }
   } 
   catch (error) {
    console.log("Error response data:", error.response?.data);
      toast.error(error.response.data.message)
   }
   finally{
     setLoading(false)
   }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="p-8 max-w-4xl border border-grey-200 shadow-lg rounded-md"
        >
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.title}
                onChange={EventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.description}
                onChange={EventHandler}
              />
            </div>
            <div>
              <Label>Requirment</Label>
              <Input
                type="text"
                name="requirment"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.requirment}
                onChange={EventHandler}
              />
            </div>

            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.salary}
                onChange={EventHandler}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.location}
                onChange={EventHandler}
              />
            </div>

            <div>
              <Label> jobType</Label>
              <Input
                type="text"
                name="jobType"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.jobType}
                onChange={EventHandler}
              />
            </div>

            <div>
              <Label>Expereince</Label>
              <Input
                type="text"
                name="experience"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.experience}
                onChange={EventHandler}
              />
            </div>
            <div>
              <Label>No of Position</Label>
              <Input
                type="text"
                name="position"
                className="focus-visible ring-offset-0 focus-visible:ring-0 my-1"
                value={input.position}
                onChange={EventHandler}
              />
            </div>
            {Companies.length > 0 && (
              <Select onValueChange={companychangehandler}>
                <SelectTrigger className="w-[180px] ">
                  <SelectValue placeholder="Enter a company Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Companies.map((company) => {
                      return (
                        <SelectItem value={company.name?.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          
            {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Post New Job</Button>
                    }
          {Companies.length === 0 && (
            <p className="text-xs text-red-600 font-bold text-center my-3">
              *please register company first
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Postjob;
