import redis from "../config/redis.js";
import axios from "axios";

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

const URL = "http://localhost:5000/api/queue/join";

async function test() {
  const requests = [];

  for (let i = 0; i < 10; i++) {
    requests.push(axios.post(URL));
  }

  const results = await Promise.all(requests);
  results.forEach((r, i) => {
    console.log(`User ${i + 1}:`, r.data);
  });
}

test();


redisTesting()