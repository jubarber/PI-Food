import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createRecipe, getDiets } from "../../redux/actions/actions";
import estilos from "./Form.module.css";

export function validate(input) {
  let error = {};

  if (!input.title) {
    error.title = "Please, enter recipe title";
  }
  if (!input.summary) {
    error.summary = "Please, enter recipe summary";
  }
  if (!input.score) {
    error.score = "Please, enter recipe score";
  }
  if (input.score < 0 || input.score > 100) {
    error.score = "Please, enter a valid score. (Must be between 0 and 100)";
  }
  if (!input.healthScore) {
    error.healthScore = "Please, enter recipe health score";
  }
  if (input.healthScore < 0 || input.healthScore > 100) {
    error.healthScore =
      "Please, enter a valid health score. (Must be between 0 and 100)";
  }
  if (!input.steps) {
    error.steps = "Please, enter recipe steps";
  }

  return error;
}

export default function Form() {
  const dispatch = useDispatch();
  const dietsState = useSelector((state) => state.diets);

  const [input, setInput] = useState({
    title: "",
    summary: "",
    score: "",
    healthScore: "",
    steps: "",
    diets: []
  });
  
  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);
  
  const [dietas, setDietas] = useState([])
  const handleSelectDiets = (e) => {
    e.preventDefault();
    dietsState?.map(d => d.id === parseInt(e.target.value) && setDietas([...dietas, d.name]))
    if (input.diets.includes(parseInt(e.target.value))) {
      alert("Diet's already been selected");
    } else {
      setInput({ ...input, diets: [...input.diets, parseInt(e.target.value)] });
    }
  };
  
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      dispatch(createRecipe(input));
      setInput({
        title: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        diets: []
      });
      window.location.href = "/home";
    } else {
      e.preventDefault();
      alert("Please complete all the fields");
    }
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value
      })
    );
  };

  function handleDelete(e) {
    console.log(e)
    let dietsFiltered = dietas.filter((el) => el !== e);
    setInput({
      ...input,
      diets: dietsFiltered
    });
    setDietas([dietsFiltered])
  }

  return (
    <div className={estilos.cuerpo}>
      <nav className={estilos.nav}>
        <Link to="/home" className={estilos.link}>
          Home
        </Link>
      </nav>
      <div className={estilos.form}>
        <div className={estilos.title}>Welcome!</div>
        <div className={estilos.subtitle}>Let's create your own recipe!</div>
        <form>
          <div className={estilos.inputContainer}>
            <input
              className={estilos.input}
              placeholder="Recipe title"
              type="text"
              name="title"
              value={input.title}
              onChange={handleChange}
            />

            {errors.title && <p className={estilos.danger}>{errors.title}</p>}

            <textarea
              className={estilos.input}
              placeholder="Recipe summary"
              type="text"
              name="summary"
              value={input.summary}
              onChange={handleChange}
            />

            {errors.summary && (
              <p className={estilos.danger}>{errors.summary}</p>
            )}

            <div className={estilos.inputGroup}>
              <input
                className={estilos.input}
                placeholder="Recipe score"
                type="number"
                name="score"
                value={input.score}
                onChange={handleChange}
              />
              <input
                className={estilos.input}
                placeholder="Recipe health score"
                type="number"
                name="healthScore"
                value={input.healthScore}
                onChange={handleChange}
              />
            </div>

            {errors.score && <p className={estilos.danger}>{errors.score}</p>}
            {errors.healthScore && (
              <p className={estilos.danger}>{errors.healthScore}</p>
            )}

            <textarea
              className={estilos.input}
              placeholder="Recipe steps"
              type="text"
              name="steps"
              value={input.steps}
              onChange={handleChange}
            />
            <select
              className={estilos.input}
              onChange={(e) => handleSelectDiets(e)}
            >
              <option label={"Select diet"} disabled selected></option>
              {dietsState?.map((diet) => {
                return (
                  <option
                    key={diet.id}
                    value={diet.id}
                    name={diet.name}
                  >
                    {diet.name}
                  </option>
                );
              })}
            </select>

            <div className={estilos.inputGroup}>
              {dietas?.map((d) => {
                return (
                  <div
                    key={d}
                    className={estilos.inputTemp}
                    onClick={() => handleDelete(d)}
                  >
                    {d}
                    <p className={estilos.texto}> Click to delete</p>
                  </div>
                );
              })}
            </div>
            <button className={estilos.button} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
