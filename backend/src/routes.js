import express from "express";
import queueRoute from './routes/queueRoute.js'
import bookingRoute from './routes/bookingRoute.js'

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

router.use("/queue", queueRoute)
router.use("/booking", bookingRoute)

export default router;
