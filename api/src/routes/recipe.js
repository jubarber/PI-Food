const { Router } = require("express");
const router = Router();
const { Recipe, TypeOfDiet } = require("../db.js");
const axios = require("axios");
const { api_key } = process.env;

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      //si me pasan name por query, busco en mi db Y LUEGO en la api
      const dbRecipeInfo = await Recipe.findAll({ include: TypeOfDiet }).then(
        (r) =>
          r.filter((e) =>
            e.dataValues.title.toLowerCase().includes(name.toLowerCase())
          )
      );
      // console.log("soy dbrecipeinfo", dbRecipeInfo);
      if (dbRecipeInfo.length !== 0) {
        var dbPromiseRecipe = dbRecipeInfo?.map((e) => {
          return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            steps: e.steps,
            diets: e.typeOfDiets
              ?.map((e) => e.name.charAt(0).toUpperCase() + e.name.slice(1))
              .join(", ")
          };
        });
      }
      // console.log("SOY DB PROMISE RECIPE", dbPromiseRecipe);

      const apiUrl = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${api_key}&number=100&addRecipeInformation=true`
      );
      // console.log('soy apiurl', apiUrl.data);
      if (apiUrl) {
        var apiPromiseRecipe = apiUrl.data.results.map((e) => {
          return {
            id: e.id,
            title: e.title,
            summary: e.summary,
            spoonacularScore: e.spoonacularScore,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: e.analyzedInstructions.map((el) =>
              el.steps.map((d) => d.step)
            ),
            diets: e.diets
              .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
              .join(", "),
            image: e.image
          };
        });
      }
      // console.log("SOY API PROMISE RECIPE", apiPromiseRecipe.steps);
      Promise.all([apiPromiseRecipe, dbPromiseRecipe]).then((r) => {
        const [apiPromiseRecipe, dbPromiseRecipe] = r;
        res.send(r);
      });
    } else {
      //SI NO ME PASAN NOMBRE X QUERY TRAIGO TODO DE MI BD Y DE LA API
      const apiUrl = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`
      );
      var apiPromiseRecipe = apiUrl.data.results.map((e) => {
        return {
          id: e.id,
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          dishTypes: e.dishTypes,
          steps: e.analyzedInstructions.map((el) =>
            el.steps.map((d) => `step ${d.number}: ${d.step}`)
          ),
          diets: e.diets
            .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
            .join(", "),
          image: e.image
        };
      });
      let dbRecipeInfo = await Recipe.findAll({ include: TypeOfDiet });
      var dbPromiseRecipe = dbRecipeInfo?.map((e) => {
        return {
          id: e.id,
          title: e.title,
          summary: e.summary,
          spoonacularScore: e.spoonacularScore,
          healthScore: e.healthScore,
          steps: e.steps,
          diets: e.typeOfDiets
            ?.map((e) => e.name.charAt(0).toUpperCase() + e.name.slice(1))
            .join(", ")
        };
      });
      Promise.all([apiPromiseRecipe, dbPromiseRecipe]).then((r) => {
        const [apiPromiseRecipe, dbPromiseRecipe] = r;
        res.send(r);
      });
    } //aca termina el else
  } catch (err) {
    next(err);
  }
});

router.get("/:recipeId", async (req, res, next) => {
  const { recipeId } = req.params;
  try {
    if (recipeId.includes("-")) {
      const recipeDb = await Recipe.findByPk(recipeId, { include: TypeOfDiet });
      const recipeFoundDb = {
        id: recipeDb.id,
        title: recipeDb.title,
        dishTypes: recipeDb.dishTypes,
        spoonacularScore: recipeDb.spoonacularScore,
        healthScore: recipeDb.healthScore,
        summary: recipeDb.summary,
        steps: recipeDb.steps,
        diets: recipeDb.typeOfDiets
            ?.map((e) => e.name.charAt(0).toUpperCase() + e.name.slice(1))
            .join(", ")
      };
      res.send(recipeFoundDb);
    } else {
      //si el id no contiene - , busco en la api
      const recipeApi = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${api_key}&number=100`
      );
      // console.log("SOY RECIPE API", recipeApi)

      let recipeFound = {
        id: recipeApi.data.id,
        title: recipeApi.data.title,
        summary: recipeApi.data.summary,
        spoonacularScore: recipeApi.data.spoonacularScore,
        healthScore: recipeApi.data.healthScore,
        dishTypes: recipeApi.data.dishTypes,
        steps: recipeApi.data.analyzedInstructions.map((el) =>
          el.steps.map((d) => d.step)
        ).flat(),
        diets: recipeApi.data.diets
          .map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1))
          .join(", "),
        image: recipeApi.data.image
      }
      res.send(recipeFound)
    }// aca termina el else
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, summary, spoonacularScore, healthScore, steps, diets } =
      req.body;
    let newRecipe = await Recipe.create({
      title,
      summary,
      spoonacularScore,
      healthScore,
      steps
    });
    await newRecipe.addTypeOfDiet(diets);
    res.json(newRecipe);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
