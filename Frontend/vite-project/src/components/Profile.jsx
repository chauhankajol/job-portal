import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import Apliedjob from "./Apliedjob";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";


// const Skills = ["HTML", "CSS", "javascript", "Reactjs", "Nodejs"];
const isResume = true;
const Profile = () => {
useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl m-5 p-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/3/33/Vanamo_Logo.png" />
            </Avatar>
            <div>
              {" "}
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>
                <p>{user?.profile?.bio}</p>
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>
        <div>
          <div className="flex items-center gap-5">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-5">
            {" "}
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center ">
            {" "}
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((Skill, index) => (
                <Badge className="bg-black text-white gap-2">{Skill}</Badge>
              ))
            ) : (
              <p>No applicable</p>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Application Jobs */}
        <Apliedjob />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
