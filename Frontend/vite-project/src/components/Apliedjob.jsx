import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const Apliedjob = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div>
      <Table>
        <TableCaption>A List Of Applied JObs</TableCaption>
      </Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
            <TableHead>JobRole</TableHead>
              <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
           allAppliedJobs.length<=0?<span>you have not applied any jobs yet</span>:allAppliedJobs.map((appliedjob)=>(
                <TableRow key={appliedjob._id}>
                <TableCell>{appliedjob.createdAt.split("T")[0]}</TableCell>
                 <TableCell>{appliedjob?.job?.title}</TableCell>
                  <TableCell>{appliedjob?.job?.company?.name}</TableCell>
                   <TableCell className="text-right "> <Badge className="bg-black text-white">{appliedjob?.status}</Badge></TableCell>
                </TableRow>
            ))
        }
    </TableBody>
    </div>
  );
};

export default Apliedjob;
