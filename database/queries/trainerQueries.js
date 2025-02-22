import pool from "../pool.js";

export const getTrainers = async () => {
  const { rows } = await pool.query(`SELECT * From trainer;`);
  return rows;
};

export const getTrainer = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM trainer WHERE id = ${id};`);
  const trainer = rows[0];
  return trainer;
};

export const getTrainersPokemon = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM pokemon WHERE trainer_id = ${id};`
  );
  return rows;
};

export const createTrainer = async (trainer) => {
  await pool.query(`INSERT INTO trainer (trainer_name) VALUES ('${trainer}');`);
  return;
};

export const updateTrainer = async (trainerId, newName) => {
  await pool.query(
    `UPDATE trainer SET trainer_name = '${newName}' WHERE id = ${trainerId};`
  );
  return;
};

export const deleteTrainer = async (id) => {
  await pool.query(
    `UPDATE pokemon SET trainer_id = null WHERE trainer_id = ${id};`
  );
  await pool.query(`DELETE FROM trainer WHERE id = ${id};`);
  return;
};
