import {
  GET_RECIPES,
  GET_DIETS,
  GET_RECIPE_NAME,
  GET_RECIPE_ID,
  CREATE_RECIPE,
  CHANGE_PAGE,
  FILTER,
  FILTER_DIET,
  SORT
} from "../actions/actions.js";
import {
  TITLE_ASCENDANT,
  TITLE_DESCENDANT,
  SCORE_ASCENDANT,
  SCORE_DESCENDANT,
  HEALTHY_SCORE_ASCENDANT,
  HEALTHY_SCORE_DESCENDANT
} from "../../constantes/sort";

import {
  quickSort,
  quickSortDesc,
  quickSortScore,
  quickSortScoreDesc,
  quickSortHealth,
  quickSortHealthDesc
} from "./quickSort.js";

const initialState = {
  recipes: [],
  filteredRecipes: [],
  recipeById: [],
  diets: [],
  error: false,
  cardsPP: 9,
  currentPage: 1
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filteredRecipes: action.payload,
        error: false
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload
      };

    case GET_RECIPE_NAME:
      if (action.payload.lenght === 0) {
        return {
          ...state,
          filteredRecipes: action.payload,
          error: true
        };
      } else {
        return {
          ...state,
          filteredRecipes: action.payload
        };
      }

    case GET_RECIPE_ID:
      return {
        ...state,
        recipeById: action.payload
      };

    case CREATE_RECIPE:
      return {
        ...state,
        filteredRecipes: action.payload
      };

    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case FILTER:
      let filteredRecipes =
        action.payload === "dataBase" ? state.recipes[1] : state.recipes[0];
      return {
        ...state,
        filteredRecipes: filteredRecipes
      };

    case FILTER_DIET:
      let filteredDiets = state.recipes?.flat().filter((e) => {
        return e.diets
          ?.split(", ")
          .find((elem) => elem.toLowerCase() === action.payload);
      });
      return {
        ...state,
        filteredRecipes: filteredDiets
      };
    case SORT:
      let orderedRecipes = [...state.filteredRecipes];
      if (action.payload === TITLE_ASCENDANT) {
        orderedRecipes = quickSort(orderedRecipes);
      } else if (action.payload === TITLE_DESCENDANT) {
        orderedRecipes = quickSortDesc(orderedRecipes);
      } else if (action.payload === SCORE_ASCENDANT) {
        orderedRecipes = quickSortScore(orderedRecipes);
      } else if (action.payload === SCORE_DESCENDANT) {
        orderedRecipes = quickSortScoreDesc(orderedRecipes);
      } else if (action.payload === HEALTHY_SCORE_ASCENDANT) {
        orderedRecipes = quickSortHealth(orderedRecipes);
      } else if (action.payload === HEALTHY_SCORE_DESCENDANT) {
        orderedRecipes = quickSortHealthDesc(orderedRecipes);
      }
      return {
        ...state,
        filteredRecipes: orderedRecipes
      };
    default:
      return state;
  }
}
