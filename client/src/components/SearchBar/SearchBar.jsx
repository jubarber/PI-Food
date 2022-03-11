import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions/actions";
import estilos from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipeByName(input));
    setInput([]);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input className={estilos.input}
          type="text"
          placeholder="Search recipe..."
          onChange={handleChange}
        />
        <button type="submit" className={estilos.btnBuscar}>
          Search
        </button>
      </div>
    </form>
  );
}
