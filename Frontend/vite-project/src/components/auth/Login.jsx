import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authslice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading,user } = useSelector((store) => store.auth);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
      useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
  return (
    <div>
      <Navbar />
      <div className="flex justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-grey-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-center text-xl my-2 mb-5">
            Lets Login
          </h1>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter Your  email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="Password"
              placeholder="Enter Your Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup
              defaultValue="option-one"
              className="flex justify-center gap-5 my-4"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  className="cursor-pointer"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                />

                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  className="cursor-pointer"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-black text-white my-4">
              Login
            </Button>
          )}

          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-800 mx-4">
              signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
