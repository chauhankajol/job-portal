import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setSearchedQuery } from "@/redux/jobslice";

const CategoryCaraousal = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Graphic Designer",
    "Data Science",
  ];
    const searchHandler=(query)=>{
      dispatch(setSearchedQuery(query))
      navigate("/browse")
    }

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
              <Button variant="outline" className="rounded-full" onClick={()=>searchHandler(cat)}>
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCaraousal;
