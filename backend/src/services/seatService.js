import redis from "../config/redis.js";

export async function lockSeat(trainId, seatNo, userId){
    const seatKey=`seat:${trainId}:${seatNo}`;

    const locked=await redis.set(seatKey, userId, 'NX', 'EX', 120)

    if(!locked) return false
    await redis.sadd(`user:${userId}:seats`, seatNo)
    return true;
}

export async function lockSeats(trainId, seatNos, userId){
    for(const seatNo of seatNos){
        const locked=await lockSeat(trainId, seatNo, userId)
        if(!locked){
            await releaseSeats(trainId, userId)
            return false
        }
    }
    return true
}

export async function releaseSeats(trainId, userId){
  const seats = await redis.smembers(`user:${userId}:seats`);

  for (const seat of seats) {
    await redis.del(`seat:${trainId}:${seat}`);
  }

  await redis.del(`user:${userId}:seats`);
}