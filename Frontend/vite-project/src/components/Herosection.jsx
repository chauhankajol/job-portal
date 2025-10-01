import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { setSearchedQuery } from "@/redux/jobslice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Herosection = () => {
  const [query,setQuery]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const searchHandler=()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-300 text-[#FB3002] font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search Apply
          <br />
          Get Your<span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p className="text-bg-gray-100">
          Find Your Dream Job With Your Potential & Capacity
        </p>
      </div>

      <div className=" flex w-[40%] shadow-lg  border-grey-100 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
          type="text"
          placeholder="Find your Dream job"
          className="outline-none border-none w-full"
          onChange={((e)=>setQuery(e.target.value))}
        />
        <Button  onClick={searchHandler}className="rounded-r-full bg-[#6A38C2]">
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Herosection;
