import { Router } from "express";
import {
  getCategory,
  getNewCategory,
  createCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

export const categoryRouter = Router();

categoryRouter.get("/new", getNewCategory);
categoryRouter.get("/:categoryId", getCategory);
categoryRouter.delete("/:categoryId/delete", deleteCategory);
categoryRouter.post("/", createCategory);

categoryRouter.get("*", (req, res) => {
  res.render("notFound");
});
