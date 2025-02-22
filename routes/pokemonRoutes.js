import { Router } from "express";
import {
  getPokemon,
  getNewPokemon,
  getAllPokemon,
  createNewPokemon,
  editPokemon,
  updatePokemon,
  deletePokemon,
} from "../controllers/pokemonController.js";

export const pokemonRouter = Router();

pokemonRouter.get("/new", getNewPokemon);
pokemonRouter.get("/:id/edit", editPokemon);
pokemonRouter.get("/:id", getPokemon);
pokemonRouter.get("/", getAllPokemon);
pokemonRouter.post("/", createNewPokemon);
pokemonRouter.put("/:id/edit", updatePokemon);
pokemonRouter.delete("/:id/delete", deletePokemon);

pokemonRouter.get("*", (req, res) => {
  res.render("notFound");
});
