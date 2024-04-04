import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/event.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { RegisteredUser } from "../models/registerEvent.model.js";

const createEvent = asyncHandler(async(req,res)=>{
    const {name,desc,startDate,endDate,startTime,endTime} = req.body

    if([name,desc,startDate,endDate,startTime,endTime].some((field)=> field?.trim() ===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }

    const event = await Event.create({
        name,
        desc,
        startDate,
        endDate,
        startTime,
        endTime,
        createdBy : req.user._id
    })

    if(!event){
        throw new ApiError(401,"Something went wrong while creatning event")
    }

    res.status(200)
    .json(
        new ApiResponse(200,{event},"Event Created Successfully")
    )
})

const registerEvent = asyncHandler(async(req,res)=>{

    const {eventId} = req.body;
    const userId = req.user?._id;

    const isAlreadyRegistered = await RegisteredUser.findOne({
        eventId : eventId,
        userId : userId
    })

    if(isAlreadyRegistered){
        throw new ApiError(400,"User already registered")
    }

    const registered = await RegisteredUser.create({
        eventId,
        userId
    })

    if(!registered){
        throw new ApiError(400,"Something went wrong while registering user")
    }

    res.status(200)
    .json(
        new ApiResponse(200,{registered},"Successfullly registered for the event")
    )
})


const getEventsForOrganiser = asyncHandler(async(req,res)=>{


    const organiserId = req.params.organiser_id;

    if(!organiserId){
        throw new ApiError(400,"Organiser Id required")
    }

    const events = await Event.find({createdBy : organiserId})

    res.status(200)
    .json(
        new ApiResponse(200,{events},"events by organiser fetched successfully")
    )
})

const getAllEvents = asyncHandler(async(req,res)=>{


    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIdx = (page-1)*limit;
    const endIdx = page*limit

    try {
        const totalDocuments = await Event.countDocuments({})
        const events = await Event.find({}).skip(startIdx).limit(limit)
    
        const pagination = {};
    
        if(endIdx < totalDocuments){
            pagination.next = {
                page : page + 1,
                limit : limit
            }
        }
    
        if(startIdx > 0){
            pagination.prev = {
                page : page + 1,
                limit : limit
            }
        }
    
        res.status(200)
        .json(
            new ApiResponse(200,{events,pagination},"Events Fetched")
        )
    } catch (error) {
        throw new ApiError(500,error?.message)
    }
})


export {createEvent,registerEvent,getEventsForOrganiser, getAllEvents}