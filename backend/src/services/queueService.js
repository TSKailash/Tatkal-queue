import redis from "../config/redis.js";

const MAX_ACTIVE=1
const ACTIVE_TTL=10

export async function promoteNextUser(){
    console.log("Called promoteUser")
    const activeCount=await redis.scard("tatkal:active")
    if(activeCount>=MAX_ACTIVE) return null

    const userId=await redis.lpop("tatkal:queue")
    if(!userId) return null;

    await redis.sadd("tatkal:active", userId)
    await redis.set(`active:${userId}`, "1", "EX", ACTIVE_TTL)

    return userId
}