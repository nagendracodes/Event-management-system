import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async(req,res,next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    if(!token){
        throw new ApiError(401,"Unauthorized Access")
    }

    try{
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id)

        if(!user){
            throw new ApiError(401,"Invalid Token")
        }

        req.user = user;
        next()
    }
    catch(error){
        throw new ApiError(401,error?.message)
    }
})

const verifyPosition = asyncHandler(async(req,res,next)=>{

    const organiser = req.user?.isOrganiser;

    if(!organiser){
        throw new ApiError(400,"Access Denied, only organiser are authorized")
    }

    next();
})

export {verifyJWT,verifyPosition}