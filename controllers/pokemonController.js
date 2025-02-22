import * as pokemonDB from "../database/queries/pokemonQueries.js";
import * as trainerDB from "../database/queries/trainerQueries.js";
import * as categoryDB from "../database/queries/categroyQueries.js";
import { body, validationResult } from "express-validator";

const validatePokemon = [body("pokemonName").trim()];

export const getPokemon = async (req, res) => {
  const { id } = req.params;
  let pokemon = await pokemonDB.getPokemon(id);
  if (!pokemon) {
    res.redirect("/pokemon");
    return;
  }
  const { pokemon_name, type_id, trainer_id } = pokemon;
  const trainer = await trainerDB.getTrainer(trainer_id);
  const type = await categoryDB.getType(type_id);
  res.render("pokemon/pokemon", {
    pokemon_name,
    trainer: trainer,
    type: type.type_name,
    id: id,
  });
};

export const getAllPokemon = async (req, res) => {
  const { rows } = await pokemonDB.getAllPokemon();
  res.render("pokemon/allPokemon", { pokemon: rows });
};

export const getNewPokemon = async (req, res) => {
  const trainers = await trainerDB.getTrainers();
  const types = await categoryDB.getTypes();
  res.render("pokemon/newPokemon", { trainers, types });
};

export const createNewPokemon = [
  validatePokemon,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.redirect("/");
      return;
    }
    const pokemon = req.body.pokemonName.toLowerCase();
    const type = req.body.pokemonType;
    const trainer = req.body.pokemonTrainer;

    if ((await pokemonDB.getPokemonFromName(pokemon)) === 0);
    {
      await pokemonDB.createNewPokemon(pokemon, type, trainer);
    }
    res.redirect("/");
  },
];

export const editPokemon = async (req, res) => {
  const id = req.params.id;
  const pokemon = await pokemonDB.getFullPokemon(id);
  const trainers = await trainerDB.getTrainers();
  const types = await categoryDB.getTypes();
  res.render("pokemon/editPokemon", { id, pokemon, types, trainers });
};

export const updatePokemon = async (req, res) => {
  const id = req.params.id;
  const pokemon = req.body.pokemonName.toLowerCase();
  const type = req.body.pokemonType;
  const trainer = req.body.pokemonTrainer;
  await pokemonDB.updatePokemon(pokemon, type, trainer, id);
  res.redirect("/pokemon");
};

export const deletePokemon = async (req, res) => {
  const id = req.params.id;
  await pokemonDB.deletePokemon(id);
  res.redirect("/pokemon");
};
