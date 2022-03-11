const { Router } = require("express");
const router = Router();
const { TypeOfDiet } = require("../db.js");
// const axios = require("axios");
// const { api_key } = process.env;

router.get("/", async (req, res, next) => {
  try {
    const dietsArray = [
      // "vegetarian",
      "vegan",
      "lacto ovo vegetarian",
      "gluten free",
      "dairy free",
      "primal",
      "whole 30",
      "pescatarian",
      "paleolithic"
    ];

    dietsArray.forEach((e, index) => {
      e &&
        TypeOfDiet.findOrCreate({
          where: {
            name: e,
            id: index + 1
          }
        });
    });
    const diets = await TypeOfDiet.findAll({});
    res.send(diets);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
