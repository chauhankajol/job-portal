import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { useNavigate } from "react-router";
import { setsearchJobBytext } from "@/redux/jobslice";

const AdminjobsTable = () => {
  const navigate = useNavigate();
  const { alladminjobs, searchJobBytext } = useSelector((store) => store.job);
  const { Companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterjobs, setFilterjobs] = useState(alladminjobs);

  useEffect(() => {
    const filteredjobs = alladminjobs.filter((job) => {
      if (!searchJobBytext) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobBytext.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobBytext.toLowerCase())
      );
    });
    setFilterjobs(filteredjobs);
  }, [alladminjobs, searchJobBytext]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>CompanyName</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {" "}
          {filterjobs?.map((job) => (
            <tr>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`) } className="flex items-center gap-2 w-fit cursor-pointer mt-2 bg-white-800 ">
                        <Eye className="w-4"/>
                        <span>Applicants</span>
                    </div>
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

export default AdminjobsTable;
