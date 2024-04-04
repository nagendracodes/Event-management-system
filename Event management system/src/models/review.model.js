import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
     user :{
        type : Schema.Types.ObjectId,
        ref : "User",
        // required : true
     },
     event : {
        type : Schema.Types.ObjectId,
        ref : "Event",
        required : true,
     },
     text : {
        type : String,
        required : true,
     },
     registrationRating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
     },
     eventRating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
     },
     brunchRating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
     },
     reported :{
        type : Number,
        default : 0
     },
     flagged : {
        type : Boolean,
        deafult : false
     },
     response : {
       type : String
     },
     like : {
         type : Schema.Types.ObjectId,
         ref : "user"
     }
},{
    timestamps : true
})

export const Review = mongoose.model("Review",reviewSchema)