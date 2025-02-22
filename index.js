import express from "express";
import path from "path";
import methodOverride from "method-override";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { indexRouter } from "./routes/indexRoutes.js";
import { pokemonRouter } from "./routes/pokemonRoutes.js";
import { categoryRouter } from "./routes/categoryRoutes.js";
import { trainerRouter } from "./routes/trainerRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/pokemon", pokemonRouter);
app.use("/trainer", trainerRouter);
app.use("/category", categoryRouter);
app.use("/", indexRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
