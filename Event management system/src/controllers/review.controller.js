import { Review } from "../models/review.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Like } from "../models/reviewLike.model.js"
import { Event } from "../models/event.model.js"

function calculateAverageRating(ratings) {
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
}

function calculateOverallAverageRating(reviews) {
    const totalRatings = reviews.reduce((acc, review) => acc + review.registrationRating + review.eventRating + review.brunchRating, 0);
    return totalRatings / (reviews.length * 3); // Average of all criteria ratings
}

const createReview = asyncHandler(async(req,res)=>{

    const {event, text, registrationRating, eventRating, brunchRating } = req.body
    const userId = req.user._id

    if([event, text, registrationRating, eventRating, brunchRating].some((field)=> field?.trim() ===""))
    {
        throw new ApiError(400,"All Fields Are Required")
    }


    const review = await Review.create({
        event,
        userId,
        text,
        registrationRating,
        eventRating,
        brunchRating
    })

    if(!review){
        throw new ApiError(400,"Something went wrong while creating review")
    }

    res.status(200)
    .json(
        new ApiResponse(200,{review},"Review created successfully")
    )
})

const reviewSummary = asyncHandler(async(req,res)=>{

    const eventID = req.params.event_id;
    const reviews = await Review.find({ event: eventID });



    const totalReviews = reviews.length;
    const registrationAvgRating = calculateAverageRating(reviews.map(review => review.registrationRating));
    const eventAvgRating = calculateAverageRating(reviews.map(review => review.eventRating));
    const brunchAvgRating = calculateAverageRating(reviews.map(review => review.brunchRating));
    const overallAvgRating = calculateOverallAverageRating(reviews);

    const summary = {
        totalReviews,
        registrationAvgRating,
        eventAvgRating,
        brunchAvgRating,
        overallAvgRating
        // Additional summary data can be included here
      };
      
      // Send summary as the response
      res.status(200)
      .json(
        new ApiResponse(200,{summary},"Summary Fetched")
      );

})

const reportReview = asyncHandler(async(req,res)=>{
    const eventID = req.params.event_id;
    const review = await Review.findOne({ event: eventID })

    if(!review){
        throw new ApiError(400,"No Review found with the provided ID")
    }

    const reportCount= review.reported + 1;
    if(reportCount === 5){
        review.flagged = true
    }

    review.reported = reportCount
    review.save()

    res.status(200)
    .json(
        new ApiResponse(200,{review},"Review Reported Successfully")
    )

})

const getReview = asyncHandler(async(req,res)=>{

    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 reviews per page

    const event = req.params.event_id
    const startIndex = (page - 1) * limit;

    try {
    const totalReviews = await Review.countDocuments({});
    const reviews = await Review.find({event : event}).skip(startIndex).limit(limit);

    // Pagination result
    const pagination = {};

    if (startIndex + reviews.length < totalReviews) {
        pagination.next = {
        page: page + 1,
        limit: limit
        };
    }

    if (startIndex > 0) {
        pagination.prev = {
        page: page - 1,
        limit: limit
        };
    }

    res.status(200).
    json(
        new ApiResponse(200,{reviews,pagination},"Reviews fetched Successfully")
    );
    } catch (error) {
        throw new ApiError(500,"Reviews can't be fetched")
    }

})

const responseToReview = asyncHandler(async(req,res)=>{

    const reviewId = req.params.review_id
    const organiserId = req.user._id
    const {eventId,desc} = req.body

    const event = await Event.findById(eventId)

    if(!event){
        throw new ApiError(404,"Event Not Found")
    }

    // console.log(event.createdBy,organiserId)
    if(!event.createdBy.equals(organiserId)){
        throw new ApiError(400,"Only Organiser can respond")
    }

    const review = await Review.findById(reviewId)

    // console.log(review)
    if(!review){
        throw new ApiError(404,"Review not found")
    }

    review.response = desc;
    review.save();

    res.status(200)
    .json(
        new ApiResponse(200,review,"Responded Successfully")
    )
})

const likeReview = asyncHandler(async(req,res)=>{

    const reviewId = req.params.review_id
    const userId = req.user._id

    if(!reviewId && !userId){
        throw new ApiError(500,"Problem on Client Side")
    }

    const liked = await Like.create({
        reviewId,
        userId
    })

    res.status(200)
    .json(
        new ApiResponse(200,liked,"Liked Successfully")
    )

})

export {createReview,
    reviewSummary,
    reportReview,
    getReview,
    responseToReview,
    likeReview
}