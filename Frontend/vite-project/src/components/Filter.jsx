import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobslice";

const filterData = [
  {
    filterType: "location",
    array: ["Delhi", "Noida", "gurugram", "chennai", "hydrabad"],
  },
  {
    filterType:"Industry",
    array:["Frontend developer","Backend developer","FullStack developer","DataScience"]
  },
  
  // {
  //   filterType:"salary",
  //   array:[0-42,42-84,84-1.2,1.2]
  // }
];


const Filter = () => {
const dispatch=useDispatch()
const [selectedvalue,setSelectedvalue]=useState('')
const handleChange=(value)=>{
  setSelectedvalue(value)
}
useEffect(()=>{
dispatch(setSearchedQuery(selectedvalue))
  console.log(selectedvalue)
},[selectedvalue])

  return <div className="w-full bg-white p-3 rounded-md">

<h1 className="font-bold text-lg">Filter Job</h1>
<hr className="mt-top"/>
<RadioGroup value={selectedvalue} onValueChange={handleChange}>
{
  filterData.map((data,index)=>(
    <div>
      <h1 className="font-bold text-lg">{data.filterType}</h1>
      {
       data.array.map((item,idx)=>{
        const ItemId=`id ${index}-${idx}`
        return(
          <div className="flex items-center space-x-2 my-2">
         <RadioGroupItem value={item} id={ItemId}/>
         <Label>{item}</Label>

          
          </div>
        )
       })
        
      }
    </div>
  ))
}


</RadioGroup>

  </div>;
};

export default Filter;
