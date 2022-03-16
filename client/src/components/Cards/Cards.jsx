import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../../redux/actions/actions.js";
import estilos from "./Cards.module.css";
import { RecipeCard } from "../RecipeCard/RecipeCard.jsx";
import { Loading } from "../Loading/Loading"
import gif from "./img/gifNotFound.gif";


export const Cards = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const recipe = useSelector((state) => state.filteredRecipes?.flat());
  const currentPage = useSelector((state) => state.currentPage); //mi estado de redux que es 1
  const cardsPP = useSelector((state) => state.cardsPP); // mi estado de redux que es 9

  const indexOfLastItem = currentPage * cardsPP;
  const indexOfFirstItem = indexOfLastItem - cardsPP;
  const currentItems = recipe?.slice(indexOfFirstItem, indexOfLastItem); //divido las tarjetas qeu se van a mostrar a partir de sus indices

  useEffect(() => {
    if (!error) {
      dispatch(getRecipes());
    }
  }, [dispatch]);
  
  useEffect(() => {
    console.log("currentItems", currentItems)
  })

  let loading = true;
  if (recipe?.length !== 0) {
    loading = false;
  }

  return (
    <div className={estilos.contenedorTotal}>
      {loading ? (
       <Loading />
      ) : 
      currentItems[0] ?
        currentItems.map((e) => {
          return (
            <div>
              <div className={estilos.contenedorTarjeta}>
                {e && (
                  <Link to={`/api/recipe/${e.id}`} className={estilos.link}>
                    <RecipeCard
                    id={e.id}
                    image={e.image}
                    title={e.title}
                    dishType={e.dishType}
                    diets={e.diets}
                    score={e.spoonacularScore}
                    healthScore={e.healthScore}
                    />
                  </Link>
                )}
              </div>
            </div>
          );
        })
        : (
          <div className={estilos.noCoincidences}>
            <p className={estilos.p}>No coincidences found :( </p>
            <img className={estilos.gif} src={gif} alt="recipe not found" />
          </div>
        )}
    </div>
  );
};
