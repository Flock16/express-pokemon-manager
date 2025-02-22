import pool from "../pool.js";

export const getPokemon = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM pokemon WHERE id = ${id};`);
  return rows[0];
};

export const getPokemonFromName = async (name) => {
  const result = await pool.query(
    `SELECT * FROM pokemon WHERE pokemon_name = '${name}';`
  );
  return result.rowCount;
};

export const getAllPokemon = async () => {
  return await pool.query(`SELECT * FROM pokemon;`);
};

export const createNewPokemon = async (pokemon, type, trainer) => {
  if (!trainer) {
    await pool.query(
      `INSERT INTO pokemon (pokemon_name, type_id, trainer_id) VALUES ('${pokemon}', ${type}, null);`
    );
  } else {
    await pool.query(
      `INSERT INTO pokemon (pokemon_name, type_id, trainer_id) VALUES ('${pokemon}', ${type}, '${trainer}');`
    );
  }
  return;
};

export const getFullPokemon = async (id) => {
  const { rows } =
    await pool.query(`SELECT pokemon.id, pokemon.pokemon_name, type.type_name, trainer.trainer_name 
          FROM pokemon 
          INNER JOIN type
              ON pokemon.type_id = type.id 
          FULL OUTER JOIN trainer
              ON pokemon.trainer_id = trainer.id 
          WHERE pokemon.id = ${id};`);

  return rows[0];
};

export const updatePokemon = async (pokemon, type, trainer, id) => {
  if (!trainer) {
    await pool.query(
      `UPDATE pokemon SET pokemon_name = '${pokemon}', type_id = ${type}, trainer_id = null WHERE id = ${id};`
    );
  } else {
    await pool.query(`UPDATE pokemon SET pokemon_name = '${pokemon}', type_id = ${type}, trainer_id = ${trainer} WHERE 
          id = ${id};`);
  }
  return;
};

export const deletePokemon = async (id) => {
  await pool.query(`DELETE FROM pokemon WHERE id = ${id};`);
  return;
};
