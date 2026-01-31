import redis from "../config/redis.js";

const redisTesting=async()=>{
    try {
        const res=await redis.ping()
        console.log(res)
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

redisTesting()