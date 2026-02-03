import express from "express"
import { selectSeats } from "../booking/booking.controller.js"
import { authenticate } from "../auth/auth.middleware.js"

const router=express.Router()

router.post("/select-seats", authenticate, selectSeats)

export default router