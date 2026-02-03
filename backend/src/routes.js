import express from "express";
import queueRoute from './routes/queueRoute.js'
import bookingRoute from './routes/bookingRoute.js'
import authRoute from './routes/authRoutes.js'

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

router.use("/queue", queueRoute)
router.use("/booking", bookingRoute)
router.use("/auth", authRoute)

export default router;
