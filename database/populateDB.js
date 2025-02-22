import pkg from "pg";
const { Client } = pkg;

const SQL = `
    CREATE TABLE IF NOT EXISTS trainer (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        trainer_name VARCHAR (255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS type (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        type_name VARCHAR (255) NOT NULL
        );
    
    CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        pokemon_name VARCHAR (255) NOT NULL,
        type_id INTEGER REFERENCES type (id),
        trainer_id INTEGER REFERENCES trainer (id) 
    );

    INSERT INTO type (type_name)
        VALUES 
            ('water'),
            ('fire'),
            ('rock'),
            ('grass'),
            ('electric');

    INSERT INTO trainer (trainer_name)
        VALUES
            ('ash'),
            ('brock'),
            ('red'),
            ('misty');

    INSERT INTO pokemon (pokemon_name, type_id, trainer_id)
        Values
            ('lapris', 1, 1),
            ('charmander', 2, 1),
            ('horsey', 1, 3),
            ('pikachu', 5, 1),
            ('geodude', 3, 2),
            ('Groundon', 3, null);
            `;

async function main() {
  console.log("Seeding...");
  const client = new Client({
    connectionString:
      "postgresql://benflockhart:buster@localhost:5432/pokemon_db",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
