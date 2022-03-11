const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRouter = require("./recipe.js");
const typeOfDietRouter = require("./typeOfDiet.js");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipe", recipeRouter);
router.use("/typeOfDiet", typeOfDietRouter);

module.exports = router;