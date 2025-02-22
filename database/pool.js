import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString:
    "postgresql://benflockhart:buster@localhost:5432/pokemon_db",
});

export default pool;
