import mongoose from "mongoose";

const connectdb =async()=>{
   try{
     await mongoose.connect(process.env.MONGO_URI);
     console.log("mongodb is connected")
   }
   catch(err){
   console.log("mongodb is not connected")
   }
}
export default connectdb;