import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPE_NAME = "GET_RECIPE_NAME";
export const GET_RECIPE_ID = "GET_RECIPE_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FILTER = "FILTER"; 
export const FILTER_DIET = "FILTER_DIET"; 
export const SORT = "SORT"; 



export function getRecipes() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/recipe")
      .then((recipe) => dispatch({ type: "GET_RECIPES", payload: recipe.data }))
      .catch((err) => console.log(err));
  };
}

export function getDiets() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/api/typeOfDiet")
      .then((diet) => dispatch({ type: "GET_DIETS", payload: diet.data }))
      .catch((err) => console.log(err));
  };
}

export function getRecipeByName(name) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/api/recipe?name=${name}`)
      .then((recipe) =>
        dispatch({ type: "GET_RECIPE_NAME", payload: recipe.data })
      )
      .catch((err) => console.log(err));
  };
}

export function getRecipeById(id) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/api/recipe/${id}`)
      .then((recipe) =>
        dispatch({ type: "GET_RECIPE_ID", payload: recipe.data })
      )
      .catch((err) => console.log(err));
  };
}

export function createRecipe(payload) {
  return async function (dispatch) {
    try {
      const newRecipe = await axios({
        method: "post",
        url: "http://localhost:3001/api/recipe",
        data: {
          title: payload.title,
          summary: payload.summary,
          spoonacularScore: payload.spoonacularScore,
          healthScore: payload.healthScore,
          steps: payload.steps,
          diets: payload.diets,
          image: payload.image
        }
      });
      return dispatch({
        type: "CREATE_RECIPE",
        payload: newRecipe.data
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function changePage(page) {
  return {
    type: "CHANGE_PAGE",
    payload: page
  };
}

export function filter(filtro){
  return {
    type: "FILTER",
    payload: filtro
  };
}

export function filterByDiet(diet){
  return {
    type: "FILTER_DIET",
    payload: diet
  };
}

export function sort(order){
  return {
    type: "SORT",
    payload: order
  }
}
