import * as trainerDB from "../database/queries/trainerQueries.js";

export const getTrainer = async (req, res) => {
  const { trainerId } = req.params;
  const trainer = await trainerDB.getTrainer(trainerId);
  if (!trainer) {
    res.redirect("/");
    return;
  }
  const pokemon = await trainerDB.getTrainersPokemon(trainerId);
  res.render("trainer/trainer", { trainer, pokemon });
};

export const getNewTrainer = (req, res) => {
  res.render("trainer/newTrainer");
};

export const createTrainer = async (req, res) => {
  const trainer = req.body.trainer.toLowerCase();
  await trainerDB.createTrainer(trainer);
  res.redirect("/");
};

export const editTrainer = async (req, res) => {
  const { trainerId } = req.params;
  const trainer = await trainerDB.getTrainer(trainerId);
  res.render("trainer/editTrainer", {
    trainerId,
    trainer: trainer.trainer_name,
  });
};

export const updateTrainer = async (req, res) => {
  const { trainerId } = req.params;
  const newName = req.body.trainerName.toLowerCase();
  await trainerDB.updateTrainer(trainerId, newName);
  res.redirect("/");
};

export const deleteTrainer = async (req, res) => {
  const trainerId = req.params.trainerId;
  await trainerDB.deleteTrainer(trainerId);
  res.redirect("/");
};
