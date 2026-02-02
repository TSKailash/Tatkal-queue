import redis from "../config/redis.js";
import { promoteNextUser } from "../services/queueService.js";
import { releaseSeats } from "../services/seatService.js";

export function startQueueWorker() {
  setInterval(async () => {
    const activeUsers = await redis.smembers("tatkal:active");

    for (const userId of activeUsers) {
      const exists = await redis.exists(`active:${userId}`);

      if (!exists) {
        console.log("⏱ Removing expired active user:", userId);
        await releaseSeats("TRAIN-123", userId);
        await redis.srem("tatkal:active", userId);
        await promoteNextUser()
      }
    }

  }, 2000); 
}
