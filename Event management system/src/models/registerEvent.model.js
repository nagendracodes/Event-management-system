import mongoose, {Schema} from "mongoose";

const registerSchema = new Schema({

    eventId : {
        type : Schema.Types.ObjectId,
        ref : "Event",
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
})

export const RegisteredUser = mongoose.model("RegisteredUser",registerSchema)