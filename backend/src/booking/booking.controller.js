import { lockSeats } from "../services/seatService.js";

export async function selectSeats(req, res) {
  const { trainId, seats } = req.body;
  const userId=req.user.id

  if (!trainId || !seats || !userId) {
    return res.status(400).json({
      message: "trainId, seats, and userId are required"
    });
  }

  const success = await lockSeats(trainId, seats, userId);

  if (!success) {
    return res.status(409).json({
      message: "One or more seats already locked"
    });
  }

  res.json({
    message: "Seats locked successfully. Proceed to payment."
  });
}
