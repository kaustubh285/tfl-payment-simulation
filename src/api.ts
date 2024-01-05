// src/api.ts

import express, { Request, Response } from "express";
import { User, simulatedEvent } from "./simulationEngine";
import { database_entry } from "./controllers/Gatekeeper";
import { waypointer } from "./controllers/Waypointer";
import RandomGenerator = require("random-id-generate");

const generator = new RandomGenerator();
const user_id_generator = generator.instance(10, ["lowercase", "numeric"]);
const user_payment_id_generator = generator.instance(5, [
  "uppercase",
  "numeric",
]);

const router = express.Router();
router.post("/event/user", async (req: Request, res: Response) => {
  const { user_card_details, eventType, location, zone, time } = req.body;
  let user = new User(
    user_id_generator(),
    user_card_details + user_payment_id_generator()
  );
  console.log(user.data.id, user.card);
  console.log(user.data);
  //   console.log(user.card, user.data.id);
  //   await simulatedEvent({ user, eventType, location, zone, time });
  res.status(200).json({ message: "Event simulated successfully" });
});

router.post("/event/end-of-day", async (req: Request, res: Response) => {
  await waypointer();
  res.status(200).json({ message: "End of day triggered successfully" });
});

export default router;
