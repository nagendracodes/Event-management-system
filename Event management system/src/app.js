import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})

const app = express()

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import eventRouter from "./routes/event.route.js"
app.use("/api/v1/events",eventRouter)


import userRouter from "./routes/user.route.js"
app.use("/api/v1/users",userRouter)


import reviewRouter from "./routes/review.route.js"
app.use("/api/v1/reviews",reviewRouter)

export default app