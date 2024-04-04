import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {ApiError} from "../utils/ApiError.js"
// import dotenv from "dotenv"
import dotenv from "dotenv"

dotenv.config({
    path : "/.env"
})

const userSchema = new Schema({
    fullName : {
        type : String,
        required : true,
        index : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        index : true,
    },
    phone : {
        type : String,
        required : true,
    },
    password : {
        type: String,
        required : true
    },
    isOrganiser : {
        type : Boolean,
        default : false,
    },
    avatar : {
        type : String,
    },

})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await  bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function () {
    // console.log(process.env.ACCESS_TOKEN_SECRET)
    try{
        return jwt.sign(
            {
                _id : this._id,
                email : this.email,
                fullName : this.fullName
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    catch(error){
        throw new ApiError(500,"Error while generating accessToken")
    }
}
export const User = mongoose.model("User",userSchema)