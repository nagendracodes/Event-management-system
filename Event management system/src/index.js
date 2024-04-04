import dotenv from "dotenv"

dotenv.config({
    path : "./.env"
})

import app from "./app.js"

import connectDB from "./db/index.js"

connectDB()
.then( () =>{
    app.listen(process.env.PORT,()=>{
        console.log(`\n SERVER STARTED AT PORT ${process.env.PORT}\n`)
    })
})
.catch((error) => {
    console.log("\n\n MONGODB CONNECTION FAILED ",error)
})