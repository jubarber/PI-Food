import React from "react";
import estilos from './RecipeCard.module.css'

export const RecipeCard = (props) => {
  // console.log("SOY PROPS DE RECIPECARD", props)
  return (
    <div key={props.id} className={estilos.cuerpoTarjeta}>
      <img className={estilos.imagen} src={props.image} alt={props.name}/>
      <h3>{props.title}</h3>
      <p>{props.dishType}</p>
      <p>{props.diets}</p>
      {/* <p>score: {props.score}</p>
      <p>health Score: {props.healthScore}</p> */}
      <div className={estilos.contenedorVerMas}>
      <p className={estilos.verMas}>Click para ver más</p>
      </div>
    </div>
  );
};
