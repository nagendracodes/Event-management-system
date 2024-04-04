import mongoose,{Schema} from "mongoose";

const likeSchema = new Schema({

    reviewId : {
        type : Schema.Types.ObjectId,
        ref : "Review"
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{
    timestamps:true
})

export const Like = mongoose.model("Like",likeSchema)