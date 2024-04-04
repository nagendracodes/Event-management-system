import { Router } from "express";
import { verifyJWT, verifyPosition } from "../middlewares/auth.middleware.js";
import { createEvent, getAllEvents, getEventsForOrganiser, registerEvent } from "../controllers/event.controller.js";

const router = Router()

router.route("/create").post(verifyJWT,verifyPosition,createEvent)
router.route("/register").post(verifyJWT,registerEvent)
router.route("/:organiser_id/events").get(verifyJWT,verifyPosition,getEventsForOrganiser)
router.route("/events").get(verifyJWT,getAllEvents)

export default router