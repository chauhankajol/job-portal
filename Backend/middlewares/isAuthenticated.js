import jwt from 'jsonwebtoken';

const isAuthenticated=async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
            message:" User not authenticated",
            success:"false"
            })
           
        }
        const Decode = await jwt.verify(token,process.env.SECRET_KEY);
        if(!Decode){
            return res.status(401).json({
                message:"INvalid token",
                success:"false"
            })

        }
        req.id = Decode.userId;
         next();
    }
    catch(error){
     console.log(error)
    }

}
export default isAuthenticated;