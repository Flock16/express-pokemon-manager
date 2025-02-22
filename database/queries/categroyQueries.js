import pool from "../pool.js";

export const getTypes = async () => {
  const { rows } = await pool.query(`SELECT * FROM type;`);
  return rows;
};

export const getType = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM type WHERE id = ${id};`);
  const type = rows[0];
  return type;
};

export const getCategory = async (typeId) => {
  const { rows } = await pool.query(
    `SELECT * FROM pokemon WHERE type_id = ${typeId};`
  );
  return rows;
};

export const createCategory = async (category) => {
  await pool.query(`INSERT INTO type (type_name) VALUES ('${category}');`);
  return;
};

export const deleteCategory = async (id) => {
  await pool.query(`DELETE FROM pokemon WHERE type_id = ${id};`);
  await pool.query(`DELETE FROM type WHERE id = ${id};`);
  return;
};
