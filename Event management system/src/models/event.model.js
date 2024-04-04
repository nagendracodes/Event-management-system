import mongoose, {Schema} from "mongoose";

const EventSchema = new Schema({
    name : {
        type : String,
        requiree : true,
    },
    desc : {
        type : String,
        required : true
    },
    startDate : {
        type : Number,
        required : true,
    },
    endDate : {
        type : Number,
        required : true,
    },
    startTime : {
        type : Number,
        required : true,
    },
    endTime : {
        type : Number,
        required : true
    },
    createdBy : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
},{
    timestamps : true,
})

export const Event = mongoose.model("Event",EventSchema)