import express from 'express'
import redis from '../config/redis.js';
import crypto from 'crypto';
import { promoteNextUser } from '../services/queueService.js';

const router=express.Router()

router.post('/join', async(req, res)=>{
    const userId=crypto.randomUUID();
    await redis.rpush("tatkal:queue", userId);
    const position=await redis.llen("tatkal:queue")
    await promoteNextUser()
    console.log("Called")
    return res.json({userId, position})
})

router.get("/status/:userId", async (req, res) => {
  const { userId } = req.params;

  const isActive = await redis.sismember("tatkal:active", userId);
  if (isActive) {
    return res.json({ status: "ACTIVE" });
  }

  const position = await redis.lpos("tatkal:queue", userId);
  if (position !== null) {
    return res.json({ status: "WAITING", position: position + 1 });
  }

  return res.json({ status: "EXPIRED" });
});


export default router