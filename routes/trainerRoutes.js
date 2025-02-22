import { Router } from "express";
import {
  getTrainer,
  getNewTrainer,
  createTrainer,
  editTrainer,
  updateTrainer,
  deleteTrainer,
} from "../controllers/trainerController.js";

export const trainerRouter = Router();

trainerRouter.get("/new", getNewTrainer);
trainerRouter.get("/:trainerId/edit", editTrainer);
trainerRouter.get("/:trainerId", getTrainer);
trainerRouter.put("/:trainerId/edit", updateTrainer);
trainerRouter.post("/", createTrainer);
trainerRouter.delete("/:trainerId/delete", deleteTrainer);

trainerRouter.get("*", (req, res) => {
  res.render("notFound");
});
