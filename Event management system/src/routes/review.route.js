import { Router } from "express";
import { verifyJWT, verifyPosition } from "../middlewares/auth.middleware.js";
import { createReview, reviewSummary, reportReview, getReview, likeReview, responseToReview } from "../controllers/review.controller.js";

const router = Router()

router.route("/create").post(verifyJWT,createReview)
router.route("/:event_id/summary").get(reviewSummary)
router.route("/:event_id/report").post(verifyJWT,reportReview)
router.route("/:event_id/reviews").get(verifyJWT,getReview)
router.route("/:review_id/like").post(verifyJWT,likeReview)
router.route("/:review_id/response").post(verifyJWT,verifyPosition ,responseToReview)

export default router