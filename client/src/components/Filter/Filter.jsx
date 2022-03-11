import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiets,
  getRecipes,
  changePage,
  filter,
  filterByDiet
} from "../../redux/actions/actions";
import estilos from "./Filter.module.css";

export const Filter = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const filteredRecipes = useSelector((state) => state.filteredRecipes?.flat());
  const cardsPP = useSelector((state) => state.cardsPP);
  const [temporal, setTemporal] = useState([]);
  const pageFiltered = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredRecipes.flat().length / cardsPP);
    i++
  ) {
    pageFiltered.push(i);
  }
  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes());
  }, [dispatch]);

  const handleSelect = (e) => {
    dispatch(filter(e.target.value));
    setTemporal(e.target.value);
    // console.log(e.target.value);
    if (temporal) {
      dispatch(changePage(pageFiltered[0]));
    }
  };

  const handleSelectDiet = (e) => {
    dispatch(filterByDiet(e.target.value));
    setTemporal(e.target.value);
    // if (temporal) {
    //   dispatch(changePage(pageFiltered[0]));
    // }
    // console.log(e.target.value);
    console.log("siltered recipes", filteredRecipes);
  };

  useEffect(()=>{
    if(temporal.length>0){
    dispatch(changePage(pageFiltered[0]));
    }
  }, [temporal])

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contSelect}>
        <select onChange={handleSelect} className={estilos.selectRecipe}>
          <option value="default" disabled selected>
            Filter by origin
          </option>
          <option value="dataBase">Recipies created</option>
          <option value="api">Recipes existing</option>
        </select>
      </div>
      <div className={estilos.contSelect}>
        <select
          id="types"
          onChange={handleSelectDiet}
          className={estilos.selectDiet}
        >
          <option value="default" disabled selected>
            Filter by diet
          </option>
          {diets?.map((e) => {
              return (
                <option key={e.id} value={e.name} name={e.name}>
                  {e.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};
