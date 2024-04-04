import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from  "../utils/asyncHandler.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{

    // console.log("called")

    const {email,fullName,phone,password, isOrganiser} = req.body;

    if([email, password, fullName,phone].some((field)=> field?.trim() ===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }

    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(400,"user already exists")
    }

    const user = await User.create({
        email,
        fullName,
        phone,
        password,
        isOrganiser,
    })

    const createdUser = await User.findById(user._id).select("-password")

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }
    res.status(200)
    .json(
        new ApiResponse(200,"User registered Successfully")
    )
})

const loginUser = asyncHandler(async(req,res)=>{

    const {email,password} = req.body;

    if(!(email && password))
    {
        throw new ApiError(400,"All fields are required")
    }

    const user = await User.findOne({email})

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isValidUser = await user.isPasswordCorrect(password)

    if(!isValidUser){
        throw new ApiError(401,"Invalid Credentials")
    }

    const accessToken = await user.generateAccessToken()

    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly : true,
        secure : true,
    }

    res.status(200)
    .cookie("accessToken",accessToken,options)
    .json(
        new ApiResponse(200,{user : loggedInUser},"User logged In SuccessFully")
    )
})

export {registerUser,
    loginUser}