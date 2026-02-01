import express from "express";
import queueRoute from './routes/queueRoute.js'

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

router.use("/queue", queueRoute)

export default router;
