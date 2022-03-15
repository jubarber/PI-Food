import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"; //hook que te permite acceder como haces en el back con "req.params" al parametro que tiene la url en ese momento desde el front
import { getRecipeById } from "../../redux/actions/actions";
import estilos from './RecipeDetail.module.css'
import img from "./img/img2.jpg";


export const RecipeDetail = () => {
  
  const dispatch = useDispatch();
  const params = useParams();
  // console.log("DOY PARAMS ID", params.recipeId)
  const recipe = useSelector((state) => state.recipeById);
  console.log(recipe)
  
  useEffect(() => {
    dispatch(getRecipeById(params.recipeId));
  }, [params.recipeId]);
  
  let image;
  recipe.image ? (image = recipe.image) : (image = img);

  return (
    <div className={estilos.cuerpoPagina}>
      <nav className={estilos.nav}>
        <Link to="/home" className={estilos.link}>
          Home
        </Link>
      </nav>
      <div className={estilos.cuerpoTarjeta}>
      <img
        className={estilos.imagen}
        src={image}
        alt={recipe.title}
      />
      <h1>{recipe.title}</h1>
      <p>Score: {recipe.spoonacularScore}</p>
      <p>Healty Score: {recipe.healthScore}</p>
      <p>{recipe.dishType}</p>
      <p>{recipe.diets}</p>
      <p>Summary: {recipe.summary}</p>
      <p>Step by Step: {recipe.steps}</p>
    </div>
    </div>
  );
};
