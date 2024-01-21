import { Redis } from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const redisClient=()=>{
    if(process.env.REDIS_URL){
        console.log("Reddis connected")
        return process.env.REDIS_URL;
    }
    throw new Error("Redis connection failed");
}
export const redis=new Redis(redisClient());