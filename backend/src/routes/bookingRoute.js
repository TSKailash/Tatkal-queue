import express from "express"
import { selectSeats } from "../booking/booking.controller.js"

const router=express.Router()

router.post("/select-seats", selectSeats)

export default router