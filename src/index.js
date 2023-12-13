// require("dotenv").config({path: './.env'}); //old way of importing dotenv

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({path: './.env'});  //new way of importing dotenv

connectDB();








/* simple approach for noobs

import { express } from "express";
const app = express();

(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        app.on("error", (error)=>{
            console.log("Error: ", error)
            throw error
        })

        app.listen(process.env.PORT, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })

    }
    catch(error){
        console.log("Error: " , error)
        throw err
    }
})()

*/