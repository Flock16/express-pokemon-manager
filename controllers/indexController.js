import * as trainerDB from "../database/queries/trainerQueries.js";
import * as categoryDB from "../database/queries/categroyQueries.js";

export const getHomepage = async (req, res) => {
  const types = await categoryDB.getTypes();
  const trainers = await trainerDB.getTrainers();
  res.render("homepage", { types, trainers });
};
