import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Application_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";

const shortListingstatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);
  const statushandler=async(status,id)=>{
    try {
        axios.defaults.withCredentials=true
        const res = await axios.post(`${Application_API_END_POINT}/status/${id}/update`,{status})
        if(res.data.message){
            toast.success(res.data.message)
        }
    } catch (error) {
        toast.error(data.message.error)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A List of Applied User</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell >
                  {
                  item.applicant?.profile?.resume?<a href={item?.applicant?.profile?.resume} target="_blank"  className="text-blue-600 cursor-pointer">{item?.applicant?.profile?.resumeOriginalName}</a>:<span>NA</span>

                  }
                </TableCell>
                <TableCell>
                  {item?.applicant?.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingstatus.map((status, index) => {
                        return (
                          <div onClick={()=>statushandler(status,item?._id)} key={index}>
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
