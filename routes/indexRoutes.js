import { Router } from "express";
import { getHomepage } from "../controllers/indexController.js";

export const indexRouter = Router();

indexRouter.get("/", getHomepage);
indexRouter.get("*", (req, res) => {
  res.render("notFound");
});
