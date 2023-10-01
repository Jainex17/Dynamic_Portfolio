import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const isAuthenticatedUser = async(req,res,next)=>{
    
    const { token } = await req.cookies;
    
    if(!token){
        return res.status(401).json({
            success:false,
        })
    }
    
    const decodeData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await Users.findById(decodeData.id);
 
    next();
};
