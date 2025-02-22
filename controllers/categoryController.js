import * as categoryDB from "../database/queries/categroyQueries.js";

export const getCategory = async (req, res) => {
  const { categoryId } = req.params;
  const rows = await categoryDB.getCategory(categoryId);
  const type = await categoryDB.getType(categoryId);
  if (!type) {
    res.redirect("/");
    return;
  }
  res.render("category/category", { results: rows, type });
};

export const getNewCategory = (req, res) => {
  res.render("category/newCategory");
};

export const createCategory = async (req, res) => {
  let category = req.body.category.toLowerCase();
  await categoryDB.createCategory(category);
  res.redirect("/");
};

export const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  await categoryDB.deleteCategory(categoryId);
  res.redirect("/");
};
