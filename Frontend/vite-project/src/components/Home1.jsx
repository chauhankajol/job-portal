import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Herosection from "./Herosection";
import CategoryCaraousal from "./CategoryCaraousal";
import Latestjobs from "./Latestjobs";
import Footer from "./Footer";
import usegetAlljobs from "@/hooks/usegetAlljobs";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { Navigate, useNavigate } from "react-router";


const Home1 = () => {
  const navigate = useNavigate()
  usegetAlljobs()
  const {user}=useSelector(store=>store.auth);

  useEffect(()=>{
    if(user?.role==='recruiter'){
      navigate('/admin/companies')
    }
  },[])


  return (
    <div>
      <Navbar />
       <Herosection/>
       <CategoryCaraousal/>
       <Latestjobs/>
       <Footer/>


    </div>
  );
};

export default Home1;
