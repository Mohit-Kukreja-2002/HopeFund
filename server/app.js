import express from "express";
export const app=express();
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from './middleware/error.js';
import dotenv from 'dotenv'
import userRouter from "./routes/user.route.js";
import fundraiserRouter from "./routes/fundraiser.route.js";
import contactRouter from "./routes/contact.route.js";
import paymentRouter from "./routes/payment.route.js";


dotenv.config()

// body parser
app.use(express.json({limit:"50mb"})); //for cloudinery

// cookie parser
app.use(cookieParser());

// cors == cross origin resource sharing
// if not used ==> one can hit the api from any other url
app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true
}));

// routes
app.use("/api/v1/",userRouter,fundraiserRouter,contactRouter,paymentRouter);

// testing api
app.get("/test",(req,res,next)=>{
    res.status(200).json({
        success:"true",
        message:"Api is working",
    });
});

app.all("*",(req,res,next)=>{
    const err=new Error(`Route ${req.originalUrl} Not Found`);
    err.statusCode = 404;
    next(err);
});

app.use(ErrorMiddleware);