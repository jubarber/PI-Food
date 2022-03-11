import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TITLE_ASCENDANT,
  TITLE_DESCENDANT,
  SCORE_ASCENDANT,
  SCORE_DESCENDANT,
  HEALTHY_SCORE_ASCENDANT,
  HEALTHY_SCORE_DESCENDANT
} from "../../constantes/sort";
import { changePage, sort } from "../../redux/actions/actions";
import estilos from "./Sort.module.css";

export const Sort = () => {
  const dispatch = useDispatch();
  const filteredRecipes = useSelector((state) => state.filteredRecipes);
  const cardsPP = useSelector((state) => state.cardsPP);
  const [temporal, setTemporal] = useState([]);
  const pageFiltered = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredRecipes?.flat().length / cardsPP);
    i++
  ) {
    pageFiltered.push(i);
  };

  function onSelectChange(e) {
    if (e.target.value !== "default") {
      dispatch(sort(e.target.value));
    }
    setTemporal(e.target.value);
    if (temporal) {
      dispatch(changePage(pageFiltered[0]));
    }
  };

  return (
    <select name="select" onChange={onSelectChange} className={estilos.select}>
      <option value="default" disabled selected>
        Order by:
      </option>
      <option value={TITLE_ASCENDANT}>Title ascendant</option>
      <option value={TITLE_DESCENDANT}>Title descendant</option>
      <option value={SCORE_ASCENDANT}>Score ascendant</option>
      <option value={SCORE_DESCENDANT}>Score descendant</option>
      <option value={HEALTHY_SCORE_ASCENDANT}>Healthy score ascendant</option>
      <option value={HEALTHY_SCORE_DESCENDANT}>Healthy score ascendant</option>
    </select>
  );
};
